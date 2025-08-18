export function normalizeCategories(input?: string | string[]) {
  if (!input) return [] as string[];
  const arr = Array.isArray(input) ? input : input.split(",");
  const cleaned = arr
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.toLowerCase()) // normalize case
    .filter((v, i, a) => a.indexOf(v) === i); // dedupe
  return cleaned;
}
