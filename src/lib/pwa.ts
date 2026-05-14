/**
 * Global type augmentation for the non-standard BeforeInstallPromptEvent.
 * This event is defined by the PWA install spec but not yet in the TS DOM lib.
 */
declare global {
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
    prompt(): Promise<void>;
  }

  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

// ─── Module-level singleton state ────────────────────────────────────────────

let deferredPrompt: BeforeInstallPromptEvent | null = null;

/** All components that want to react when the install prompt becomes available */
const installCallbacks: Set<(prompt: BeforeInstallPromptEvent) => void> = new Set();

/**
 * CRITICAL: Register the beforeinstallprompt listener at MODULE LOAD TIME.
 *
 * The browser fires `beforeinstallprompt` very early in the page lifecycle —
 * often before React hydrates and any useEffect runs. If we only add the
 * listener inside initializePWA() (called from useEffect), we miss the event
 * entirely and the install button never appears.
 *
 * By registering at module load time (when the JS bundle first executes),
 * we guarantee we capture the event no matter when it fires.
 */
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (event: BeforeInstallPromptEvent) => {
    // Prevent the browser's default mini-infobar so we control the UI
    event.preventDefault();
    deferredPrompt = event;

    // Notify any already-registered React components
    installCallbacks.forEach((cb) => {
      try { cb(event); } catch (e) { console.error("PWA install callback error:", e); }
    });
  });

  window.addEventListener("appinstalled", () => {
    console.log("[PWA] Installed successfully");
    deferredPrompt = null;
    // Notify all callbacks so buttons can hide themselves
    installCallbacks.forEach((cb) => {
      try { cb(null as unknown as BeforeInstallPromptEvent); } catch {}
    });
  });
}

// ─── Public API type ──────────────────────────────────────────────────────────

export type PwaHandler = {
  registerInstallPrompt: (callback: (prompt: BeforeInstallPromptEvent) => void) => void;
  canInstall: () => boolean;
  promptInstall: () => Promise<boolean>;
  unsubscribeInstallPrompt: (callback: (prompt: BeforeInstallPromptEvent) => void) => void;
};

// ─── Singleton handler object ─────────────────────────────────────────────────

const _handler: PwaHandler = {
  registerInstallPrompt(callback) {
    installCallbacks.add(callback);
    // If the prompt already fired BEFORE this component mounted, replay it now
    if (deferredPrompt) {
      try { callback(deferredPrompt); } catch (e) { console.error("PWA callback error:", e); }
    }
  },

  canInstall: () => !!deferredPrompt,

  async promptInstall() {
    if (!deferredPrompt) return false;
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("[PWA] Installation accepted");
        deferredPrompt = null;
        return true;
      }
      console.log("[PWA] Installation dismissed");
      return false;
    } catch (error) {
      console.error("[PWA] Error prompting install:", error);
      return false;
    }
  },

  unsubscribeInstallPrompt(callback) {
    installCallbacks.delete(callback);
  },
};

// ─── initializePWA ────────────────────────────────────────────────────────────

/**
 * Returns the singleton PWA handler.
 * The online/offline events are wired here (not at module level since they
 * are less time-sensitive than beforeinstallprompt).
 * Safe to call multiple times — idempotent.
 */
let _networkListenersAdded = false;

export function initializePWA(
  onUpdateAvailable?: () => void,
  onOfflineDetected?: () => void,
): PwaHandler {
  if (_networkListenersAdded) return _handler;
  _networkListenersAdded = true;

  void onUpdateAvailable; // reserved for future use

  if (typeof window !== "undefined") {
    window.addEventListener("online", () => {
      window.dispatchEvent(new CustomEvent("pwa:online"));
    });
    window.addEventListener("offline", () => {
      if (onOfflineDetected) onOfflineDetected();
      window.dispatchEvent(new CustomEvent("pwa:offline"));
    });
  }

  return _handler;
}

// ─── Standalone helpers ───────────────────────────────────────────────────────

/**
 * Returns true when the app is running as an installed PWA (standalone mode).
 */
export function isAppInstalled(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as { standalone?: boolean }).standalone === true
  );
}

/**
 * Returns the current online status.
 */
export function isOnline(): boolean {
  if (typeof navigator === "undefined") return true;
  return navigator.onLine;
}

/**
 * Subscribe to online/offline transitions. Returns an unsubscribe function.
 */
export function onNetworkStatusChange(
  callback: (online: boolean) => void,
): () => void {
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);
  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);
  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
}
