import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tanstackStart({
      server: {
        entry: "src/server.ts",
      },
      spa: {
        enabled: true,
      },
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    VitePWA({
      manifest: {
        name: "CS:GO — NIMCET Mock Tests",
        short_name: "CS:GO Mocks",
        description: "Realistic NIMCET mock tests with detailed analysis.",
        theme_color: "#FCCB02",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait-primary",
      },
      workbox: {
        globPatterns: [
          "**/*.{js,css,html,svg,png,ico,webp,woff,woff2,ttf,eot}",
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
        navigateFallback: "/",
        skipWaiting: true,
      },
      injectRegister: "auto",
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
    }),
  ],
});
