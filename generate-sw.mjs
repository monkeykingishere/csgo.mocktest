/**
 * generate-sw.mjs
 *
 * Post-build script: generates sw.js + registerSW.js in dist/client/
 * using workbox-build, then injects the SW registration snippet into
 * dist/client/_shell.html.
 *
 * Run this after `vite build`:
 *   node generate-sw.mjs
 *
 * The `npm run build` script in package.json chains this automatically.
 */

import { generateSW } from "workbox-build";
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDir = path.join(__dirname, "dist", "client");
const shellHtmlPath = path.join(clientDir, "_shell.html");

// ── 1. Generate the service worker ──────────────────────────────────────────

const { count, filePaths, size } = await generateSW({
  // Workbox writes sw.js here
  swDest: path.join(clientDir, "sw.js"),

  // Glob all built assets relative to dist/client/
  globDirectory: clientDir,
  globPatterns: [
    "**/*.{js,css,html,svg,png,ico,webp,woff,woff2,ttf,eot}",
  ],

  // Fallback for SPA navigation — aligned with Vercel rewrite to _shell.html
  navigateFallback: "/_shell.html",

  // Don't intercept API calls or non-page navigations
  navigateFallbackDenylist: [
    /^\/api\//,
    /^\/__/,
    /^\/sitemap\.xml$/,
    /^\/robots\.txt$/,
  ],

  // Cache strategy for runtime requests
  runtimeCaching: [
    // Google Fonts CSS (stale-while-revalidate)
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "google-fonts-stylesheets",
        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    // Google Fonts files (cache-first, immutable)
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-webfonts",
        expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
  ],

  // Automatically activate new SW and claim clients
  skipWaiting: true,
  clientsClaim: true,

  // Clean up precache entries from old SW versions
  cleanupOutdatedCaches: true,

  // Inline the Workbox runtime to avoid extra network request
  inlineWorkboxRuntime: false,
});

console.log(
  `✓ Service worker generated: ${count} files precached (${(size / 1024).toFixed(1)} KB total)`,
);

if (filePaths.length > 0) {
  const maxShow = 10;
  const shown = filePaths.slice(0, maxShow).map((f) =>
    path.relative(clientDir, f)
  );
  if (filePaths.length > maxShow) {
    shown.push(`... and ${filePaths.length - maxShow} more`);
  }
  console.log("  Precached:", shown.join(", "));
}

// ── 2. Write registerSW.js ───────────────────────────────────────────────────

const registerSWContent = `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js',{scope:'/'}).catch(e=>console.error('SW registration failed:',e))})}\n`;
writeFileSync(path.join(clientDir, "registerSW.js"), registerSWContent, "utf-8");
console.log("✓ registerSW.js written");

// ── 3. Inject SW registration into _shell.html ───────────────────────────────

let shellHtml = readFileSync(shellHtmlPath, "utf-8");

const swSnippet = `<script>if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js',{scope:'/'}).catch(function(e){console.error('SW registration failed:',e)})})}</script>`;

// Only inject if not already present (idempotent)
if (!shellHtml.includes("/sw.js")) {
  // Inject just before </body>
  shellHtml = shellHtml.replace("</body>", `${swSnippet}</body>`);
  writeFileSync(shellHtmlPath, shellHtml, "utf-8");
  console.log("✓ SW registration injected into _shell.html");
} else {
  console.log("✓ SW registration already present in _shell.html");
}
