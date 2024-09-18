// utils/readingTimeUtil.ts

export function calculateReadingTime(text: string | undefined): string {
  if (!text) {
    return '0 min read'; // Handle cases where text is undefined or empty
  }

  const wordsPerMinute = 200; // Average reading speed
  const words = text.split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return `${readingTime} min read`;
}