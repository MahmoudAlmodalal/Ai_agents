/**
 * Normalizes Arabic text by removing diacritics and unifying similar characters
 */
export function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    // Remove Arabic diacritics (tashkeel)
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // Normalize Alef variations (أ, إ, آ, ٱ -> ا)
    .replace(/[أإآٱ]/g, 'ا')
    // Normalize Taa Marbuta (ة -> ه)
    .replace(/ة/g, 'ه')
    // Normalize Yaa (ى -> ي)
    .replace(/ى/g, 'ي')
    // Remove extra whitespaces
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Strips HTML tags to extract searchable raw text
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extracts a contextual snippet around the matching keyword
 */
export function extractSnippet(text: string, query: string, maxLength = 160): string | undefined {
  if (!query || !text) return undefined;
  const normText = normalizeArabic(text);
  const normQuery = normalizeArabic(query);
  const index = normText.indexOf(normQuery);
  if (index === -1) return undefined;

  const start = Math.max(0, index - 50);
  const end = Math.min(text.length, index + normQuery.length + 90);
  let snippet = text.slice(start, end).trim();

  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';

  return snippet;
}
