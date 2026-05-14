import { Workbox } from "workbox-window";

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let installPromptShown = false;

/**
 * Initialize PWA functionality:
 * - Register service worker
 * - Handle install prompts
 * - Track update availability
 */
export function initializePWA(
  onUpdateAvailable?: () => void,
  onOfflineDetected?: () => void
): {
  registerInstallPrompt: (callback: (prompt: BeforeInstallPromptEvent) => void) => void;
  canInstall: () => boolean;
  promptInstall: () => Promise<boolean>;
  unsubscribeInstallPrompt: () => void;
} {
  const callbacks: Set<(prompt: BeforeInstallPromptEvent) => void> = new Set();

  // Only register service worker in production
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    const wb = new Workbox("/sw.js");

    // Listen for updates
    wb.addEventListener("controlling", () => {
      if (onUpdateAvailable) {
        onUpdateAvailable();
      }
    });

    // Register the service worker
    wb.register().catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
  }

  // Handle beforeinstallprompt event
  window.addEventListener("beforeinstallprompt", (event: BeforeInstallPromptEvent) => {
    event.preventDefault();
    deferredPrompt = event;
    installPromptShown = false;

    // Notify all registered callbacks
    callbacks.forEach((callback) => {
      try {
        callback(event);
      } catch (error) {
        console.error("Error in install prompt callback:", error);
      }
    });
  });

  // Handle app installation
  window.addEventListener("appinstalled", () => {
    console.log("PWA installed successfully");
    deferredPrompt = null;
    installPromptShown = false;
  });

  // Handle online/offline status
  window.addEventListener("online", () => {
    console.log("Connection restored");
    window.dispatchEvent(new CustomEvent("pwa:online"));
  });

  window.addEventListener("offline", () => {
    console.log("Connection lost");
    if (onOfflineDetected) {
      onOfflineDetected();
    }
    window.dispatchEvent(new CustomEvent("pwa:offline"));
  });

  return {
    registerInstallPrompt: (callback: (prompt: BeforeInstallPromptEvent) => void) => {
      callbacks.add(callback);
      // If prompt is already available, call immediately
      if (deferredPrompt && !installPromptShown) {
        callback(deferredPrompt);
      }
    },

    canInstall: () => !!deferredPrompt && !installPromptShown,

    promptInstall: async () => {
      if (!deferredPrompt) {
        return false;
      }

      try {
        deferredPrompt.prompt();
        installPromptShown = true;
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === "accepted") {
          console.log("PWA installation accepted");
          return true;
        } else {
          console.log("PWA installation dismissed");
          return false;
        }
      } catch (error) {
        console.error("Error prompting for app installation:", error);
        return false;
      }
    },

    unsubscribeInstallPrompt: () => {
      callbacks.clear();
      deferredPrompt = null;
      installPromptShown = false;
    },
  };
}

/**
 * Check if app is running in standalone mode (installed as PWA)
 */
export function isAppInstalled(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true
  );
}

/**
 * Get network status
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Listen to online/offline events
 */
export function onNetworkStatusChange(
  callback: (isOnline: boolean) => void
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
