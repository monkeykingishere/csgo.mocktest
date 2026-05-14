import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// Note: vite-plugin-pwa is intentionally excluded here.
// It conflicts with TanStack Start's multi-environment build pipeline and
// prevents sw.js from being generated. Instead, a dedicated post-build script
// (generate-sw.mjs) uses workbox-build directly to produce sw.js in
// dist/client/ after vite build completes. See `package.json` build script.

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
  ],
});
