/**
 * PWAInstallPrompt
 *
 * Handles the full cross-platform install flow:
 * - Android / Chrome / Edge: captures `beforeinstallprompt`, renders an "Install App" button
 * - iOS Safari: shows a dismissible banner explaining "Add to Home Screen" (Safari never fires
 *   `beforeinstallprompt`)
 * - Already installed (standalone): renders nothing
 */

import { useState, useEffect, useCallback } from "react";
import { initializePWA, isAppInstalled } from "../lib/pwa";
import { X, Download, Share } from "lucide-react";

// ── Helpers ──────────────────────────────────────────────────────────────────

function isIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as { MSStream?: unknown }).MSStream;
}

function isInStandaloneMode(): boolean {
  if (typeof window === "undefined") return false;
  return isAppInstalled();
}

// ── iOS Banner ────────────────────────────────────────────────────────────────

function IOSInstallBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      role="dialog"
      aria-label="Install CS:GO app on iOS"
      className="fixed bottom-4 left-4 right-4 z-50 nb-border bg-white shadow-xl rounded-xl p-4 flex items-start gap-3 animate-in slide-in-from-bottom-4"
    >
      {/* App icon */}
      <img
        src="/icon-192x192.png"
        alt="CS:GO app icon"
        className="w-12 h-12 rounded-xl nb-border flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <p className="font-black text-sm">Install CS:GO</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
          Tap{" "}
          <span className="inline-flex items-center gap-0.5 font-bold text-[var(--brand-blue)]">
            <Share size={11} className="inline" aria-hidden="true" />
            &nbsp;Share
          </span>{" "}
          then{" "}
          <strong className="font-bold">"Add to Home Screen"</strong> to install.
        </p>
      </div>

      <button
        onClick={onDismiss}
        aria-label="Dismiss install prompt"
        className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

// ── Android / Chrome Install Button ──────────────────────────────────────────

function AndroidInstallButton() {
  const [canInstall, setCanInstall] = useState(false);

  const onPromptAvailable = useCallback(() => {
    setCanInstall(true);
  }, []);

  useEffect(() => {
    const handler = initializePWA();
    handler.registerInstallPrompt(onPromptAvailable);

    const handleInstalled = () => setCanInstall(false);
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleInstalled);
      handler.unsubscribeInstallPrompt(onPromptAvailable);
    };
  }, [onPromptAvailable]);

  const handleClick = async () => {
    const success = await initializePWA().promptInstall();
    if (success) setCanInstall(false);
  };

  if (!canInstall) return null;

  return (
    <button
      id="pwa-install-btn"
      onClick={handleClick}
      aria-label="Install CS:GO as a desktop or mobile app"
      title="Install CS:GO app"
      className="flex items-center gap-1.5 px-3 py-1.5 nb-border bg-white hover:bg-gray-50 text-black text-sm font-bold transition-colors"
    >
      <Download size={14} aria-hidden="true" />
      <span className="hidden sm:inline">Install App</span>
      <span className="sm:hidden">Install</span>
    </button>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

const IOS_DISMISSED_KEY = "pwa-ios-dismissed";

export function PWAInstallPrompt() {
  const [mounted, setMounted] = useState(false);
  const [showIOSBanner, setShowIOSBanner] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Only show iOS banner if:
    // 1. User is on iOS Safari
    // 2. App is NOT already installed as PWA
    // 3. User hasn't dismissed the banner before
    if (
      isIOS() &&
      !isInStandaloneMode() &&
      !sessionStorage.getItem(IOS_DISMISSED_KEY)
    ) {
      // Small delay so it doesn't feel abrupt on page load
      const t = setTimeout(() => setShowIOSBanner(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  const dismissIOS = () => {
    setShowIOSBanner(false);
    sessionStorage.setItem(IOS_DISMISSED_KEY, "1");
  };

  if (!mounted || isInStandaloneMode()) return null;

  return (
    <>
      {/* Android/Chrome: renders a button inline (in header via this component) */}
      {!isIOS() && <AndroidInstallButton />}

      {/* iOS Safari: bottom banner with Add-to-Home-Screen instructions */}
      {showIOSBanner && <IOSInstallBanner onDismiss={dismissIOS} />}
    </>
  );
}
