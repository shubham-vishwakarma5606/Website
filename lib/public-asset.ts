/**
 * Prefixes a public asset path with the Pages base path ("/Website")
 * when built for GitHub Pages; a no-op for root hosting.
 */
export function withBase(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
