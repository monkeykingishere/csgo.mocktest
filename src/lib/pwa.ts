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

let initialized = false;
let deferredPrompt: BeforeInstallPromptEvent | null = null;

/** All components that want to react when the install prompt becomes available */
const installCallbacks: Set<(prompt: BeforeInstallPromptEvent) => void> = new Set();

/**
 * The public API returned by initializePWA. Callers can hold a reference to
 * check install eligibility and trigger the install dialog.
 */
export type PwaHandler = {
  registerInstallPrompt: (callback: (prompt: BeforeInstallPromptEvent) => void) => void;
  canInstall: () => boolean;
  promptInstall: () => Promise<boolean>;
  unsubscribeInstallPrompt: (callback: (prompt: BeforeInstallPromptEvent) => void) => void;
};

// ─── Private singleton handler ────────────────────────────────────────────────

const _handler: PwaHandler = {
  registerInstallPrompt(callback) {
    installCallbacks.add(callback);
    // If the prompt already fired before this component mounted, call immediately
    if (deferredPrompt) {
      try {
        callback(deferredPrompt);
      } catch (e) {
        console.error("Error in install prompt callback:", e);
      }
    }
  },

  canInstall: () => !!deferredPrompt,

  async promptInstall() {
    if (!deferredPrompt) return false;
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("PWA installation accepted");
        deferredPrompt = null;
        return true;
      }
      console.log("PWA installation dismissed");
      return false;
    } catch (error) {
      console.error("Error prompting for app installation:", error);
      return false;
    }
  },

  unsubscribeInstallPrompt(callback) {
    installCallbacks.delete(callback);
  },
};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Initialize PWA install-prompt and network-status tracking.
 *
 * This function is idempotent — calling it multiple times is safe.
 * The first call wires up all DOM event listeners; subsequent calls are no-ops.
 *
 * NOTE: Service worker registration is handled entirely by vite-plugin-pwa's
 * injectRegister:"auto" mechanism (registerSW.js). Do NOT register the SW here
 * to avoid double-registration and dev-mode interference.
 */
export function initializePWA(
  onUpdateAvailable?: () => void,
  onOfflineDetected?: () => void,
): PwaHandler {
  if (initialized) return _handler;
  initialized = true;

  // Suppress unused-parameter warning; exposed for future use.
  void onUpdateAvailable;

  // Capture the install prompt so we can trigger it on demand
  window.addEventListener("beforeinstallprompt", (event: BeforeInstallPromptEvent) => {
    event.preventDefault();
    deferredPrompt = event;

    installCallbacks.forEach((cb) => {
      try {
        cb(event);
      } catch (e) {
        console.error("Error in install prompt callback:", e);
      }
    });
  });

  // Clear the prompt once the user has installed the app
  window.addEventListener("appinstalled", () => {
    console.log("PWA installed successfully");
    deferredPrompt = null;
  });

  // Online / offline events
  window.addEventListener("online", () => {
    console.log("Connection restored");
    window.dispatchEvent(new CustomEvent("pwa:online"));
  });

  window.addEventListener("offline", () => {
    console.log("Connection lost");
    if (onOfflineDetected) onOfflineDetected();
    window.dispatchEvent(new CustomEvent("pwa:offline"));
  });

  return _handler;
}

// ─── Standalone helpers ───────────────────────────────────────────────────────

/**
 * Returns true when the app is running as an installed PWA (standalone mode).
 */
export function isAppInstalled(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as { standalone?: boolean }).standalone === true
  );
}

/**
 * Returns the current online status.
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Subscribe to online/offline transitions.
 * Returns an unsubscribe function.
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
