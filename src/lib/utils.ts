import { getCollection } from 'astro:content';

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
