import { u } from '../lib/utils';

import nlHome from '../data/nl/home.json';
import nlOver from '../data/nl/over-mij.json';
import nlReis from '../data/nl/de-reis.json';
import nlSponsor from '../data/nl/sponsor-mij.json';
import nlUi from '../data/nl/ui.json';
import enHome from '../data/en/home.json';
import enOver from '../data/en/over-mij.json';
import enReis from '../data/en/de-reis.json';
import enSponsor from '../data/en/sponsor-mij.json';
import enUi from '../data/en/ui.json';

export const langs = ['nl', 'en'] as const;
export type Lang = (typeof langs)[number];

/** Locale voor datums en bedragen. */
export const locale: Record<Lang, string> = { nl: 'nl-NL', en: 'en-GB' };

const content = {
  nl: { home: nlHome, over: nlOver, reis: nlReis, sponsor: nlSponsor, ui: nlUi },
  en: { home: enHome, over: enOver, reis: enReis, sponsor: enSponsor, ui: enUi },
};

/** Alle teksten voor één taal (bewerkbaar via het CMS). */
export const t = (lang: Lang) => content[lang] as (typeof content)['nl'];

/** Paden per pagina en taal (zonder basispad). */
export const routes = {
  home: { nl: '/', en: '/en/' },
  over: { nl: '/over-mij/', en: '/en/about-me/' },
  reis: { nl: '/de-reis/', en: '/en/the-voyage/' },
  sponsor: { nl: '/sponsor-mij/', en: '/en/sponsor-me/' },
  nieuws: { nl: '/nieuws/', en: '/en/news/' },
} as const;
export type Page = keyof typeof routes;

/** Link naar een pagina in een taal, met basispad (en optioneel #anker). */
export const href = (lang: Lang, page: Page, hash = '') => u(routes[page][lang]) + hash;

/** Link naar een nieuwsbericht. */
export const postHref = (lang: Lang, id: string) => u(`${routes.nieuws[lang]}${id}/`);

/** Vult {naam}-plekken in een tekst in, bijv. fill('Dag {n}', { n: 3 }). */
export const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
