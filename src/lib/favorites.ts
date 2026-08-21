import { useCallback, useEffect, useState } from "react";

/**
 * Favorite + comparație, salvate local în browser.
 * Prototip static (GitHub Pages) — nu există backend, deci totul stă în
 * localStorage. Citirea se face după hidratare, ca să nu apară mismatch SSR.
 */
const STORAGE_KEY = "autoklass:favorites";
const EVENT = "autoklass:favorites-changed";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

function write(slugs: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  window.dispatchEvent(new Event(EVENT));
}

export function useFavorites() {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSlugs(read());
    setReady(true);

    const sync = () => setSlugs(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((slug: string) => {
    const current = read();
    write(current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);
  }, []);

  const remove = useCallback((slug: string) => {
    write(read().filter((item) => item !== slug));
  }, []);

  const clear = useCallback(() => write([]), []);

  return { slugs, ready, toggle, remove, clear, has: (slug: string) => slugs.includes(slug) };
}
