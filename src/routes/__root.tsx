import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import { initializePWA } from "../lib/pwa";
import { OfflineDetector } from "../components/OfflineDetector";
import { PWAInstallPrompt } from "../components/PWAInstallPrompt";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="nb-card max-w-md p-8 text-center">
        <h1 className="text-7xl font-black">404</h1>
        <h2 className="mt-4 text-xl font-bold uppercase">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page doesn't exist.</p>
        <div className="mt-6">
          <Link to="/" className="nb-interactive inline-block bg-[var(--brand-yellow)] px-4 py-2 font-bold uppercase">Go home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="nb-card max-w-md p-8 text-center">
        <h1 className="text-xl font-black uppercase">Something broke</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="nb-interactive bg-[var(--brand-yellow)] px-4 py-2 font-bold uppercase">Try again</button>
          <a href="/" className="nb-interactive bg-white px-4 py-2 font-bold uppercase">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CS:GO — NIMCET Mock Tests" },
      { name: "description", content: "Realistic NIMCET mock tests with detailed analysis. Practice Maths, Logical Reasoning, Computer Awareness, and English." },
      { name: "author", content: "CS:GO" },
      { name: "theme-color", content: "#FCCB02" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "CS:GO Mocks" },
      { name: "msapplication-TileColor", content: "#FCCB02" },
      { name: "msapplication-TileImage", content: "/icon-144x144.png" },
      { name: "msapplication-config", content: "/browserconfig.xml" },
      { property: "og:title", content: "CS:GO — NIMCET Mock Tests" },
      { property: "og:description", content: "Realistic NIMCET mock tests with detailed analysis." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/icon-512x512.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/icon-512x512.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/icon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/icon-32x32.png" },
      { rel: "icon", type: "image/svg+xml", href: "/cslogo.svg" },
      { rel: "apple-touch-icon", href: "/icon-180x180.png" },
      { rel: "mask-icon", href: "/cslogo.svg", color: "#FCCB02" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    initializePWA(
      () => {
        console.log("PWA update available");
      },
      () => {
        console.log("Offline mode detected");
      }
    );
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <OfflineDetector />
      <PWAInstallPrompt />
    </QueryClientProvider>
  );
}
