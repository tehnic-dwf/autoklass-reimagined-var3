// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { fileURLToPath } from "node:url";

import { defineConfig } from "@lovable.dev/vite-tanstack-config";

import { vehicles } from "./src/data/vehicles.ts";

const fetchEntry = fileURLToPath(
  new URL(
    "./node_modules/@lovable.dev/vite-tanstack-config/runtime/fetch-entry.mjs",
    import.meta.url,
  ),
);

/**
 * GH_PAGES=1 comută build-ul pe modul static pentru GitHub Pages
 * (repo autoklass-reimagined-var2). În Lovable rămâne build-ul
 * normal cu SSR, deci preview-ul nu e afectat.
 */
const isGithubPages = process.env["GH_PAGES"] === "1";
const base = isGithubPages ? "/autoklass-reimagined-var2/" : "/";

const staticPages = [
  "/",
  "/autoturisme",
  "/service/programare",
  "/service/dosar-daune",
  "/verificare-masini-rulate",
  "/comparatie",

  ...vehicles.map((vehicle) => `/autoturisme/${vehicle.slug}`),
].map((path) => ({
  // prerender-ul cere rutele prin base, deci le prefixăm explicit
  path: `${base.replace(/\/$/, "")}${path}`.replace(/^$/, "/"),
}));

export default defineConfig({
  vite: { base },
  ...(isGithubPages
    ? {
        // Lovable sandboxul forțează cloudflare-module pentru orice preset din config;
        // folosim variabila de mediu LOVABLE_NITRO_PRESET=lovable-fetch-bundle ca build-ul
        // de server să ruleze în Node/Preview pentru prerender, iar clientul rămâne static.
        nitro: {
          // În afara sandboxului (GitHub Actions) presetul intern Lovable nu se aplică,
          // deci replicăm aceeași configurație: bundle care exportă `fetch`, scris în
          // dist/server/server.js, ca prerender-ul TanStack să-l poată importa.
          preset: undefined,
          defaultPreset: undefined,
          entry: fetchEntry,
          serveStatic: false,
          noExternals: true,
          inlineDynamicImports: true,
          output: {
            dir: "dist",
            serverDir: "dist/server",
            publicDir: "dist/client",
          },
          rollupConfig: {
            output: {
              entryFileNames: "server.js",
            },
          },
        } as any,
        tanstackStart: {
          server: { entry: "server" },
          prerender: { enabled: true, crawlLinks: false },
          pages: staticPages,
        },
      }
    : {
        // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
        // nitro/vite builds from this
        tanstackStart: { server: { entry: "server" } },
      }),
});
