import { useState, useEffect, useCallback } from "react";
import { initializePWA, isAppInstalled } from "../lib/pwa";

export function InstallAppButton() {
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  // Stable callback ref so we can unsubscribe the exact same function reference
  const onPromptAvailable = useCallback(() => {
    setCanInstall(true);
  }, []);

  useEffect(() => {
    setIsInstalled(isAppInstalled());

    // initializePWA is idempotent — safe to call here; returns the singleton handler
    const handler = initializePWA();
    handler.registerInstallPrompt(onPromptAvailable);

    const handleAppInstalled = () => {
      setCanInstall(false);
      setIsInstalled(true);
    };
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleAppInstalled);
      handler.unsubscribeInstallPrompt(onPromptAvailable);
    };
  }, [onPromptAvailable]);

  const handleClick = async () => {
    const handler = initializePWA();
    const success = await handler.promptInstall();
    if (success) {
      setCanInstall(false);
      setIsInstalled(true);
    }
  };

  // Render nothing if already installed or the install prompt is unavailable
  if (isInstalled || !canInstall) {
    return null;
  }

  return (
    <button
      id="pwa-install-btn"
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-yellow)] hover:bg-yellow-400 text-black font-bold rounded-lg transition-colors nb-border"
      title="Install CS:GO as an app"
      aria-label="Install CS:GO as a desktop or mobile app"
    >
      {/* Download icon */}
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      <span className="hidden sm:inline">Install App</span>
      <span className="sm:hidden">Install</span>
    </button>
  );
}
