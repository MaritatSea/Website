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

/** Optionele externe link netjes maken: 'www.bedrijf.nl' -> 'https://www.bedrijf.nl'. Leeg blijft leeg. */
export const extUrl = (url?: string | null) => {
  const s = (url ?? '').trim();
  if (!s) return '';
  return /^(https?:|mailto:)/i.test(s) ? s : `https://${s.replace(/^\/+/, '')}`;
};

/** 'Club van 100' -> 'club-van-100' (voor ankerlinks). */
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Leest een datum(-tijd) uit het CMS ('2027-10-23' of '2027-10-23T12:00')
 * als Nederlandse tijd, ongeacht de tijdzone van de computer of bezoeker.
 */
export function amsterdamDate(value?: string | null): Date | null {
  if (!value) return null;
  const s = String(value).trim();
  if (/[zZ]|[+-]\d{2}:?\d{2}$/.test(s)) return new Date(s); // heeft al een tijdzone
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/);
  if (!m) return null;
  const [y, mo, d, h = '0', mi = '0'] = m.slice(1);
  const guess = Date.UTC(+y, +mo - 1, +d, +h, +mi);
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Amsterdam',
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
      .formatToParts(new Date(guess))
      .map((p) => [p.type, p.value]),
  );
  const shown = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
  return new Date(guess - (shown - guess));
}

const loc = (lang: 'nl' | 'en' = 'nl') => (lang === 'en' ? 'en-GB' : 'nl-NL');

export const formatDate = (d: Date, lang: 'nl' | 'en' = 'nl') =>
  d.toLocaleDateString(loc(lang), { day: 'numeric', month: 'long', year: 'numeric' });

export const formatEuro = (n: number, lang: 'nl' | 'en' = 'nl') =>
  new Intl.NumberFormat(loc(lang), {
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

/** Gepubliceerde nieuwsberichten in een taal, nieuwste eerst. */
export async function getNews(lang: 'nl' | 'en' = 'nl') {
  const posts = await getCollection(lang === 'en' ? 'news' : 'nieuws', ({ data }) => !data.concept);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
