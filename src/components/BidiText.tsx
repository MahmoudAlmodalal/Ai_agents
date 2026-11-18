import React from 'react';

/**
 * Normalizes text to prevent Arabic conjunction ("و") collision with adjacent Latin words.
 * Handles both "GitHubو Git" -> "GitHub و Git" and "وGitHub" -> "و GitHub".
 */
export function formatBidiString(text: string): string {
  if (!text) return text;
  // 1. Latin letter/digit followed immediately by Arabic waw (e.g. "GitHubو Git")
  let res = text.replace(/([A-Za-z0-9])و(?=[\s\p{L}])/gu, '$1 و ');
  // 2. Arabic waw immediately before a Latin word (e.g. "وGitHub", "وNot Run", "وPortfolio")
  res = res.replace(/(^|[\s\p{P}])و([A-Za-z])/gu, '$1و $2');
  // 3. Collapse multiple spaces created by adjacent rules
  res = res.replace(/  +/g, ' ');
  return res;
}

const LATIN_PHRASE_REGEX =
  /([A-Za-z0-9#+]+(?:[-/.][A-Za-z0-9#+]+)*(?:\s+[A-Za-z0-9#+]+(?:[-/.][A-Za-z0-9#+]+)*)*)/g;

export interface BidiPart {
  type: 'ar' | 'en';
  text: string;
}

/**
 * Splits text into Arabic and Latin segments for directional isolation.
 */
export function splitBidi(text: string): BidiPart[] {
  if (!text) return [];
  const formatted = formatBidiString(text);
  const parts: BidiPart[] = [];
  let lastIdx = 0;

  for (const match of formatted.matchAll(LATIN_PHRASE_REGEX)) {
    const start = match.index!;
    const end = start + match[0].length;
    // Isolate only segments containing at least one Latin letter
    if (/[A-Za-z]/.test(match[0])) {
      if (start > lastIdx) {
        parts.push({ type: 'ar', text: formatted.slice(lastIdx, start) });
      }
      parts.push({ type: 'en', text: match[0] });
      lastIdx = end;
    }
  }

  if (lastIdx < formatted.length) {
    parts.push({ type: 'ar', text: formatted.slice(lastIdx) });
  }

  return parts;
}

export interface BidiTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

/**
 * Directionally-isolated text component:
 * - Separates Arabic "و" attached to English terms.
 * - Wraps Latin terms/phrases in `<bdi dir="ltr">` so RTL punctuation and ellipsis do not reorder them.
 */
export const BidiText: React.FC<BidiTextProps> = ({ text, className = '', as: Component }) => {
  if (!text) return null;
  const parts = splitBidi(text);

  const content = parts.map((part, index) => {
    if (part.type === 'en') {
      return (
        <bdi key={index} dir="ltr" className="[word-break:normal] [overflow-wrap:break-word]">
          {part.text}
        </bdi>
      );
    }
    return <React.Fragment key={index}>{part.text}</React.Fragment>;
  });

  if (Component) {
    return <Component className={className}>{content}</Component>;
  }

  return className ? <span className={className}>{content}</span> : <>{content}</>;
};
