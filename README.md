# Marit at Sea

Fundraisingwebsite voor Marits zeilreis van zes maanden op de Thalassa.

- **Astro** (statische site), met zelfgehoste fonts (Kaushan Script + Nunito)
- **Pages CMS** ([app.pagescms.org](https://app.pagescms.org)) als WYSIWYG-beheeromgeving;
  configuratie staat in [`.pages.yml`](.pages.yml)
- **GitHub Pages** voor hosting; elke push naar `main` publiceert automatisch
  ([workflow](.github/workflows/deploy.yml))

Handleiding voor Marit: [HANDLEIDING.md](HANDLEIDING.md)

## Lokaal draaien

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # bouwt naar dist/
```

Lokaal bouwen zoals op github.io (met basispad):

```sh
rm -rf .astro dist
BASE_PATH=/maritatasea npm run build
BASE_PATH=/maritatasea npm run preview   # http://localhost:4321/maritatasea/
```

## Waar staat wat?

| Pad | Inhoud |
| --- | --- |
| `src/content/nieuws/*.md` | Nieuwsberichten (frontmatter + HTML-body) |
| `src/data/home.json` | Homepagina: Mijn droom, cijfers, Waarom wil ik mee |
| `src/data/over-mij.json` | Pagina Over mij (+ samenvatting op home) |
| `src/data/de-reis.json` | Pagina De reis met onderdelen (+ samenvattingen op home) |
| `src/data/sponsor-mij.json` | Pagina Sponsor mij: GoFundMe, Club van 100, zakelijk |
| `src/data/club-van-100.json` | Namen van de leden van de Club van 100 |
| `src/data/site.json` | Instellingen: doelbedrag, opgehaald, GoFundMe-link, IBAN (optioneel) |
| `src/data/sponsors.json` | Sponsorlogo's |
| `public/media/` | Uploads via het CMS |
| `public/images/` | Vaste afbeeldingen (logo, Thalassa-tekening, borrelplank) |
| `_bootstrap_assets/` | Originele bronbestanden (logo's, XCF, teksten). Foto's met GPS-data staan in `.gitignore` |

## Eenmalig online zetten

1. **GitHub-repo**: push deze map naar een nieuwe repository, bijv. `marit-at-sea`.
2. **GitHub Pages**: Settings → Pages → *Source: GitHub Actions*. Na de eerste
   push staat de site op `https://<gebruiker>.github.io/marit-at-sea/`.
3. **Domein**: koppel `www.maritatsea.nl` onder Settings → Pages → *Custom domain*
   en zet bij je domeinprovider een `CNAME`-record `www` → `<gebruiker>.github.io`
   (plus de A-records van GitHub voor het kale domein). Vink *Enforce HTTPS* aan.
   > Het basispad (`/maritatasea` op github.io, of niets bij een eigen domein) wordt
   > in de workflow automatisch bepaald via `actions/configure-pages`. Je hoeft niets aan te passen.
4. **Pages CMS**: log in op [app.pagescms.org](https://app.pagescms.org) met GitHub,
   installeer de Pages CMS GitHub-app op de repo en open hem.
5. **Marit uitnodigen**: in Pages CMS → *Settings* → *Collaborators*, haar
   e-mailadres toevoegen. Ze logt dan in via een e-maillink, zonder GitHub-account.

Alternatief voor hosting: Netlify of Cloudflare Pages (build command `npm run build`,
output `dist`). Ook dan publiceert elke CMS-wijziging automatisch.

## Nog invullen vóór livegang

In het CMS onder **Sponsorteller & instellingen** (of in `src/data/site.json`):

- [ ] Link naar de GoFundMe
- [ ] Al opgehaald bedrag
- [ ] E-mailadres (wordt getoond bij zakelijke sponsoring) en eventueel Instagram
- [ ] Eventueel IBAN voor direct overmaken (leeg = blok verborgen)
- [ ] Website van ForKandle Solutions bij de sponsor
