import raw from '../data/site.json';

/**
 * Instellingen die voor beide talen gelden. Pages CMS laat lege velden weg
 * bij het opslaan, dus alles behalve de basisgegevens kan ontbreken.
 */
export interface Site {
  naam: string;
  schip: string;
  organisatie?: string;
  organisatieUrl?: string;
  schipVolgenUrl?: string;
  gofundmeUrl?: string;
  vertrekdatum?: string;
  terugkomstdatum?: string;
  doelbedrag?: number;
  opgehaald?: number;
  iban?: string;
  tenaamstelling?: string;
  omschrijving?: string;
  email?: string;
  instagram?: string;
}

export const site: Site = { naam: 'Marit', schip: 'Thalassa', ...(raw as Partial<Site>) };
