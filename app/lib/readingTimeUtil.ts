// utils/readingTimeUtil.ts

export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200; // Average reading speed
  const words = text.split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return `${readingTime} min read`;
}
