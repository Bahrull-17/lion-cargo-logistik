export const STORAGE_BUCKET = "article-images";

const PUBLIC_PATH_PREFIX = `/storage/v1/object/public/${STORAGE_BUCKET}/`;

function supabaseHost(): string | null {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  try {
    return new URL(base).host;
  } catch {
    return null;
  }
}

/** URL publik gambar di bucket kita -> path file di Storage; null bila gambar dari sumber lain. */
export function storagePathFromUrl(url: string | null): string | null {
  if (!url) return null;
  const host = supabaseHost();
  if (!host) return null;

  try {
    const parsed = new URL(url);
    if (parsed.host !== host || !parsed.pathname.startsWith(PUBLIC_PATH_PREFIX)) return null;
    const path = decodeURIComponent(parsed.pathname.slice(PUBLIC_PATH_PREFIX.length));
    return path === "" ? null : path;
  } catch {
    return null;
  }
}

/** Gambar sampul hanya boleh dari bucket kita atau Unsplash (sesuai remotePatterns di next.config). */
export function isAllowedCoverUrl(url: string): boolean {
  if (storagePathFromUrl(url)) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.host === "images.unsplash.com";
  } catch {
    return false;
  }
}
