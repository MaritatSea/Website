import { getCollection } from 'astro:content';

/** Basispad van de site: '' bij een eigen domein, '/repo' op github.io. */
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Zet het basispad voor een intern pad (bijv. '/media/foto.jpg'). */
export const u = (path?: string | null) =>
  path && path.startsWith('/') && !path.startsWith('//') && !path.startsWith(base + '/')
    ? base + path
    : (path ?? '');

/** Idem voor alle src/href-links in HTML uit de editor. */
export const fixHtml = (html?: string | null) =>
  base ? (html ?? '').replace(/\b(src|href)="\/(?!\/)/g, `$1="${base}/`) : (html ?? '');

export const formatDate = (d: Date) =>
  d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

export const formatEuro = (n: number) =>
  new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);

/** Platte tekst uit (HTML-)inhoud, ingekort tot ongeveer `len` tekens. */
export function excerpt(html: string, len = 160) {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_>`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > len ? text.slice(0, len).replace(/\s\S*$/, '') + '…' : text;
}

/** Gepubliceerde nieuwsberichten, nieuwste eerst. */
export async function getNews() {
  const posts = await getCollection('nieuws', ({ data }) => !data.concept);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
