import { useState, useEffect } from "react";
import { initializePWA, isAppInstalled } from "../lib/pwa";

export function InstallAppButton() {
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [pwaHandler, setPwaHandler] = useState<ReturnType<typeof initializePWA> | null>(null);

  useEffect(() => {
    setIsInstalled(isAppInstalled());
    const handler = initializePWA();
    setPwaHandler(handler);

    handler.registerInstallPrompt(() => {
      setCanInstall(handler.canInstall());
    });

    const handleInstall = () => {
      setCanInstall(false);
      setIsInstalled(true);
    };

    window.addEventListener("appinstalled", handleInstall);

    return () => {
      window.removeEventListener("appinstalled", handleInstall);
      handler.unsubscribeInstallPrompt();
    };
  }, []);

  const handleClick = async () => {
    if (pwaHandler) {
      const success = await pwaHandler.promptInstall();
      if (success) {
        setCanInstall(false);
      }
    }
  };

  // Don't render if already installed or can't install
  if (isInstalled || !canInstall) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-yellow)] hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors"
      title="Install CS:GO as an app"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
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
