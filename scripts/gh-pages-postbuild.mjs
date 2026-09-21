/**
 * Postbuild pentru GitHub Pages:
 *  1. găsește folderul static generat de build (nitro preset "static");
 *  2. copiază index.html → 404.html (fallback pentru deep-link-uri și refresh);
 *  3. se asigură că există .nojekyll (altfel Jekyll ignoră /assets cu underscore);
 *  4. copiază totul în ./docs-nu, ci lasă output-ul în loc și doar îl raportează.
 */
import { existsSync, copyFileSync, writeFileSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const candidates = [".output/public", "dist/client", ".vercel/output/static", "dist"];

const outDir = candidates
  .map((dir) => resolve(process.cwd(), dir))
  .find((dir) => existsSync(join(dir, "index.html")));

if (!outDir) {
  console.error(
    "[gh-pages] Nu am găsit index.html în niciunul din: " +
      candidates.join(", ") +
      ". Verifică output-ul build-ului.",
  );
  process.exit(1);
}

// A successful bundler exit can still contain an aborted React render.
// Reject blank static pages before they reach Pages.
const requiredPages = [
  "",
  "autoturisme",
  "contact",
  "autoturisme/mercedes-benz-glc-200-4matic-vu149616",
  "service/tarife",
  "service/programare",
  "comparatie",
];
for (const page of requiredPages) {
  const file = join(outDir, page, "index.html");
  const html = existsSync(file) ? readFileSync(file, "utf8") : "";
  if (!html.includes("<h1") || html.includes("<!--$!-->")) {
    throw new Error(`[gh-pages] Incomplete static render: ${page || "/"}`);
  }
}

copyFileSync(join(outDir, "index.html"), join(outDir, "404.html"));
writeFileSync(join(outDir, ".nojekyll"), "");

const files = readdirSync(outDir);
console.log(`[gh-pages] Output static: ${outDir}`);
console.log(`[gh-pages] 404.html + .nojekyll scrise. ${files.length} intrări la rădăcină.`);
console.log(`[gh-pages] PUBLISH_DIR=${outDir}`);
