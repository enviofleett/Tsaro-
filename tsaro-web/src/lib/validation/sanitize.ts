import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(html: string | undefined | null): string {
  if (!html) return '';
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'span', 'div',
      'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'className', 'title', 'alt'],
    FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'object', 'embed', 'link'],
    FORBID_ATTR: ['style', 'on*', 'action', 'formaction'],
    ALLOW_DATA_ATTR: false
  });
}
