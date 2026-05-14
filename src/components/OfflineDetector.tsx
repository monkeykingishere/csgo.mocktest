import { useState, useEffect } from "react";

export function OfflineDetector() {
  // Start optimistically online — useEffect syncs to actual status after hydration.
  // This prevents the offline banner from appearing in SSR/prerendered HTML.
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Sync immediately on mount in case the user is already offline
    setIsOffline(!navigator.onLine);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-amber-50 border-t-2 border-amber-400 p-3 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <svg
          className="w-5 h-5 text-amber-600 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-semibold text-amber-900">You're offline</p>
          <p className="text-xs text-amber-800 mt-0.5">
            Some features may not be available. Your progress will sync when reconnected.
          </p>
        </div>
      </div>
    </div>
  );
}
