/**
 * PWAInstallPrompt — cross-platform install UI
 *
 * Render this ONCE at the app root (e.g. in __root.tsx alongside OfflineDetector).
 * Do NOT render multiple instances — iOS banner and Android button are both inside.
 *
 * Android / Chrome / Edge:
 *   Renders a fixed bottom-right "Install App" button when beforeinstallprompt fires.
 *
 * iOS Safari / Chrome iOS (WebKit):
 *   Shows a dismissible bottom banner with "Add to Home Screen" instructions.
 *   (iOS never fires beforeinstallprompt — Apple restriction.)
 *
 * Already installed (standalone mode): renders nothing.
 */

import { useState, useEffect, useCallback } from "react";
import { initializePWA, isAppInstalled } from "../lib/pwa";
import { X, Download, Share } from "lucide-react";

// ── Platform detection ────────────────────────────────────────────────────────

function detectIOS(): boolean {
  if (typeof navigator === "undefined" || typeof window === "undefined") return false;
  // Standard iPhones/iPods
  if (/iPhone|iPod/.test(navigator.userAgent)) return true;
  // iPad on iOS ≤ 12: userAgent contains "iPad"
  if (/iPad/.test(navigator.userAgent)) return true;
  // iPad on iOS 13+: Apple switched to desktop UA ("Macintosh") but still has
  // touch support. Detect via platform string + touch points.
  if (
    navigator.platform === "MacIntel" &&
    navigator.maxTouchPoints > 1
  ) return true;
  return false;
}

// Ensure no Microsoft Edge Legacy or IE misidentification
function isIOSDevice(): boolean {
  return detectIOS() && !(window as { MSStream?: unknown }).MSStream;
}

const IOS_DISMISSED_KEY = "pwa-ios-prompt-dismissed";

// ── iOS banner ────────────────────────────────────────────────────────────────

function IOSBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      role="dialog"
      aria-label="Install CS:GO app"
      className="fixed bottom-4 left-4 right-4 z-[9999] nb-border bg-white shadow-2xl p-4 flex items-start gap-3"
      style={{ borderRadius: 0 }} // keep nb-design flat style
    >
      <img
        src="/icon-192x192.png"
        alt=""
        aria-hidden="true"
        className="w-12 h-12 flex-shrink-0 nb-border"
        style={{ imageRendering: "auto" }}
      />

      <div className="flex-1 min-w-0">
        <p className="font-black text-sm leading-tight">Install CS:GO</p>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          Tap{" "}
          <span className="inline-flex items-center gap-0.5 font-bold">
            <Share size={11} aria-hidden="true" />
            {" "}Share
          </span>
          {" "}then{" "}
          <span className="font-black">"Add to Home Screen"</span>
          {" "}to install.
        </p>
      </div>

      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        className="flex-shrink-0 p-1.5 hover:bg-gray-100 rounded transition-colors mt-0.5"
      >
        <X size={14} aria-hidden="true" />
      </button>

      {/* Arrow pointing to the share button location */}
      <div
        aria-hidden="true"
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white nb-border rotate-45"
        style={{ borderTop: "none", borderLeft: "none" }}
      />
    </div>
  );
}

// ── Android / Chrome install button ──────────────────────────────────────────

function AndroidButton({ onInstall }: { onInstall: () => void }) {
  return (
    <button
      id="pwa-install-btn"
      onClick={onInstall}
      aria-label="Install CS:GO as an app"
      title="Install CS:GO"
      className="fixed bottom-5 right-4 z-[9999] flex items-center gap-2 px-4 py-3 nb-border bg-[var(--brand-yellow)] hover:bg-yellow-400 text-black text-sm font-black shadow-lg transition-colors"
    >
      <Download size={16} aria-hidden="true" />
      Install App
    </button>
  );
}

// ── Main component (render ONCE at root) ─────────────────────────────────────

export function PWAInstallPrompt() {
  // Start false — set to true only after hydration to avoid SSR mismatch
  const [mounted, setMounted] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [showIOS, setShowIOS] = useState(false);

  const onPromptAvailable = useCallback(() => {
    setCanInstall(true);
  }, []);

  useEffect(() => {
    setMounted(true);

    // Already installed → show nothing
    if (isAppInstalled()) return;

    const handler = initializePWA();

    if (isIOSDevice()) {
      // iOS: show banner unless previously dismissed this session
      if (!sessionStorage.getItem(IOS_DISMISSED_KEY)) {
        const t = setTimeout(() => setShowIOS(true), 1500);
        return () => clearTimeout(t);
      }
    } else {
      // Android/Chrome/Edge: wait for the install prompt event
      handler.registerInstallPrompt(onPromptAvailable);

      const handleInstalled = () => {
        setCanInstall(false);
      };
      window.addEventListener("appinstalled", handleInstalled);

      return () => {
        window.removeEventListener("appinstalled", handleInstalled);
        handler.unsubscribeInstallPrompt(onPromptAvailable);
      };
    }
  }, [onPromptAvailable]);

  const handleAndroidInstall = async () => {
    const success = await initializePWA().promptInstall();
    if (success) setCanInstall(false);
  };

  const handleIOSDismiss = () => {
    setShowIOS(false);
    sessionStorage.setItem(IOS_DISMISSED_KEY, "1");
  };

  // Nothing to render until after hydration or if already installed
  if (!mounted || isAppInstalled()) return null;

  return (
    <>
      {canInstall && !isIOSDevice() && (
        <AndroidButton onInstall={handleAndroidInstall} />
      )}
      {showIOS && isIOSDevice() && (
        <IOSBanner onDismiss={handleIOSDismiss} />
      )}
    </>
  );
}
