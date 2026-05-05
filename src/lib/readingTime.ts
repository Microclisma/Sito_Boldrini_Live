export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const numWords = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(numWords / wordsPerMinute));
}
