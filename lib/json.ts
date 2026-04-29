export function parseJsonObject<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return fallback;

    try {
      return JSON.parse(match[0]) as T;
    } catch {
      return fallback;
    }
  }
}
