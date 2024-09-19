export function calculateReadingTime(text: string | undefined): number {
  if (!text) {
    return 0; // Return 0 if the content is undefined or empty
  }

  const wordsPerMinute = 200; // Average reading speed
  const words = text.split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute); // Round up to the nearest minute
  return readingTime; // Return the integer value
}