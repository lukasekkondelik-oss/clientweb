# Romana Reality — prodejní prototyp webu

Prodejní prototyp nového webu pro realitní makléřku Romanu Trefnou (Romana
Reality). Postaveno na Next.js (App Router), TypeScriptu, Tailwind CSS,
React Hook Form + Zod a Framer Motion.

## Důležité upozornění k obsahu

Weby `romanareality.cz` a `artem-saykin.cz` nebyly v prostředí, kde tento
prototyp vznikal, dostupné (blokováno síťovou politikou sandboxu). Web proto
obsahuje **pouze ověřená fakta zadaná přímo klientkou/zadavatelem** (jméno,
kontakty, 21 let praxe, výčet služeb, 3 příklady nemovitostí, 1 doslovná
reference) a jinak **jasně označené placeholdery**. Před produkčním
spuštěním je nutné projít sekci [Co je nutné ověřit před spuštěním](#co-je-nutné-ověřit-před-produkčním-spuštěním)
níže.

## Spuštění projektu

```bash
npm install
npm run dev
```

Web poběží na [http://localhost:3000](http://localhost:3000).

Zkopírujte `.env.example` do `.env.local` a upravte hodnoty podle potřeby:

```bash
cp .env.example .env.local
```

## Build

```bash
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # produkční build (Next.js/Turbopack)
npm run start       # spuštění produkčního buildu lokálně
```

## Nasazení na Vercel

1. Repozitář importujte na [vercel.com/new](https://vercel.com/new).
2. Framework preset „Next.js“ se zvolí automaticky.
3. V nastavení projektu (Environment Variables) vyplňte proměnné podle
   `.env.example` (viz níže).
4. Spusťte deploy. Vercel automaticky spustí `npm run build`.

## Environment proměnné

Viz `.env.example`. Přehled:

| Proměnná | Účel |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Základní URL webu – používá se pro canonical URL, Open Graph a `sitemap.xml`/`robots.txt`. |
| `NEXT_PUBLIC_CALCOM_URL` | URL Cal.com rezervačního odkazu. Když je prázdná, sekce rezervace zobrazí profesionální demo stav místo nefunkčního iframe. |
| `NEXT_PUBLIC_DEMO_MODE` | `true`/`false` – zapíná demo panel pro prezentaci klientce (viz níže). |
| `RAYNET_WEBHOOK_URL` | Výchozí fallback webhook (např. n8n), pokud nejsou nastaveny specifické webhooky níže. |
| `VALUATION_WEBHOOK_URL` / `CONTACT_WEBHOOK_URL` / `VIEWING_WEBHOOK_URL` | Specifické webhooky pro jednotlivé typy leadů. |

Všechny webhook proměnné jsou čteny **pouze na serveru** (v API route
handlerech) – nikdy se nedostanou do frontend JS bundlu. Raynet API klíč
nikdy nepatří do tohoto projektu, pouze do n8n/Raynetu na druhé straně
webhooku.

## Jak upravit obsah

Veškerý obsah je oddělený od komponent v adresáři `data/`:

- `data/contact.ts` — jméno, telefon, e-mail, region, sociální sítě.
- `data/agent.ts` — ověřená fakta o Romaně (roky praxe, výčet služeb, úvodní text).
- `data/services.ts` — nabízené služby.
- `data/process.ts` — 8 kroků průběhu prodeje.
- `data/trustReasons.ts` — hlavní důvody důvěry.
- `data/faq.ts` — časté dotazy.
- `data/testimonials.ts` — reference (viz níže).
- `data/properties.ts` — nabídka nemovitostí (viz níže).
- `data/navigation.ts` — položky hlavní navigace a patičky.

Po úpravě dat není potřeba měnit žádné komponenty.

### Úprava nabídky nemovitostí

Upravte pole `properties` v `data/properties.ts`. Každá položka odpovídá
typu `Property` (`types/property.ts`). Pole `isDemoData: true` označuje
položky, jejichž cena/parametry/popis jsou v prototypu pouze ukázkové (v UI
se zobrazí badge „Ukázková data“) — před spuštěním je nahraďte ověřenými
údaji a nastavte `isDemoData: false`. Datová struktura je připravená i na
budoucí napojení na externí zdroj/API (stačí nahradit `data/properties.ts`
funkcí, která data načte).

### Úprava referencí

Upravte pole `testimonials` v `data/testimonials.ts`. `verified: true`
znamená doslovnou citaci z ověřeného zdroje, `verified: false` označuje
ukázkovou referenci pro účely prototypu (v textu prefix „[Ukázková
reference – nahradit reálnou]“) — před spuštěním nahraďte reálnými
referencemi klientky.

## Fotografie a placeholdery

Reálné fotografie Romany ani nemovitostí nebyly v prostředí, kde prototyp
vznikal, dostupné. Všechna místa pro fotografie používají komponentu
`components/ui/ImagePlaceholder.tsx` — kultivovaný grafický placeholder,
nikdy ne vymyšlený/AI portrét. Místa k nahrazení jsou označena i komentářem
v kódu (`TODO: nahradit reálnou fotografií`), typicky v `data/agent.ts`
(`agent.photo`) a `data/properties.ts` (`images[].alt` + `isPlaceholder`).

Až budou k dispozici reálné fotografie:

1. Vložte soubory do `public/images/...`.
2. V příslušné sekci nahraďte `<ImagePlaceholder ... />` komponentou
   `<Image src="/images/soubor.jpg" alt="…" fill />` z `next/image`.

## Cal.com rezervace

Komponenta `components/sections/CalEmbed.tsx` čte proměnnou
`NEXT_PUBLIC_CALCOM_URL`:

- Když je prázdná, zobrazí profesionální demo stav („Online rezervace bude
  dostupná po spuštění webu“) s CTA na telefonní kontakt.
- Jakmile proměnnou vyplníte (např. `https://cal.com/romana-trefna/konzultace`),
  komponenta automaticky zobrazí funkční iframe embed – žádná úprava kódu
  sekce není potřeba.

## Formuláře a leady

Tři formuláře (`ValuationWizard`, `ContactForm`, `ViewingForm`) odesílají
data přes sjednocenou integrační vrstvu `lib/leads.ts`
(`submitValuationLead`, `submitContactLead`, `submitViewingLead`) na tři
mock API endpointy:

- `POST /api/leads/valuation`
- `POST /api/leads/contact`
- `POST /api/leads/viewing`

Každý endpoint (`app/api/leads/*/route.ts`):

- validuje vstup pomocí Zod,
- vrací odpovídající HTTP status (200 úspěch, 422 neplatná data, 429 příliš
  mnoho požadavků, 400 nevalidní JSON),
- obsahuje základní anti-spam ochranu (honeypot pole `company` na
  frontendu + jednoduchý rate limiting podle IP na serveru),
- předá lead přes `lib/leads-server.ts` (`forwardLead`) na webhook podle
  příslušné env proměnné — pokud není nastavená, lead se pouze zaloguje do
  konzole serveru (bezpečný no-op, nic se neztrácí, jen se nikam neposílá).

### Struktura leadu pro Raynet

Formulář ocenění (`ValuationWizard`) sestavuje payload přesně podle
struktury zadané pro Raynet (viz `types/lead.ts` →
`ValuationLeadPayload`), včetně UTM parametrů zachycených z URL
(`lib/utm.ts`) a `pageUrl`/`createdAt`.

### Budoucí napojení na Raynet (přes n8n)

Architektura počítá s tímto tokem:

```
Formulář na webu → POST /api/leads/* (validace, anti-spam)
                  → webhook (RAYNET_WEBHOOK_URL / *_WEBHOOK_URL)
                  → n8n scénář
                  → vytvoření leadu/klienta v Raynetu
                  → vytvoření aktivity v Raynetu
                  → upozornění Romaně
                  → automatický potvrzovací e-mail zájemci
                  → případný follow-up
```

V tomto prototypu není žádný reálný webhook nastaven ani zavolán. Pro
napojení stačí vyplnit příslušnou `*_WEBHOOK_URL` proměnnou – API routy už
odesílání zvládají bez úprav kódu. Raynet API klíč patří výhradně na stranu
n8n scénáře, nikdy do tohoto webu.

## Demo režim

Nastavením `NEXT_PUBLIC_DEMO_MODE=true` se v pravém dolním/levém rohu webu
zobrazí malý panel „Demo režim“, který umožňuje bez reálného odeslání dat
vyvolat success/error stav formuláře ocenění (a navazujících formulářů) pro
účely prezentace klientce. Panel se **nikdy nezobrazí**, pokud je proměnná
nenastavená nebo `false` — na produkčním webu ho tedy stačí vynechat z
env proměnných.

Ostatní stavy zmíněné v zadání (mobilní menu, detail nemovitosti, reference,
sticky mobilní CTA, stav nabídky „V nabídce“/„Prodáno“) jsou přístupné běžným
procházením webu bez nutnosti speciálního režimu.

## Co je nutné ověřit před produkčním spuštěním

- [ ] Nahradit všechny `ImagePlaceholder` reálnými fotografiemi (Romana, nemovitosti).
- [ ] V `data/properties.ts` nahradit položky s `isDemoData: true` ověřenými údaji (cena, plocha, stav, popis) nebo napojit na reálný zdroj dat.
- [ ] V `data/testimonials.ts` nahradit položky s `verified: false` reálnými referencemi.
- [ ] Doplnit jméno autora a typ zakázky u reference `chladna-hlava` (byla dodána bez těchto údajů).
- [ ] Doplnit IČO a fakturační/identifikační údaje v `data/contact.ts` a v patičce.
- [ ] Nechat právníkem/pověřencem GDPR zkontrolovat text `/zasady-ochrany-osobnich-udaju`.
- [ ] Vyplnit `NEXT_PUBLIC_CALCOM_URL` a otestovat rezervační tok.
- [ ] Vyplnit produkční webhook URL a ověřit end-to-end tok do Raynetu (přes n8n).
- [ ] Vyplnit `NEXT_PUBLIC_SITE_URL` a vygenerovat/ověřit reálný favicon a OG obrázek podle finální vizuální identity.
- [ ] Nastavit `NEXT_PUBLIC_DEMO_MODE=false` (nebo proměnnou vynechat) pro produkční provoz.
- [ ] Doplnit odkazy na sociální sítě v `data/contact.ts`, pokud existují.

## Architektura projektu

```
app/                  stránky (App Router), API routy, sitemap/robots
components/
  layout/              hlavička, patička, mobilní menu, sticky CTA
  sections/             sekce jednotlivých stránek (Hero, FAQ, ...)
  forms/                formuláře (wizard ocenění, kontakt, prohlídka, cookies)
  ui/                    znovupoužitelné UI prvky (Button, Card, ...)
lib/                   validace (Zod), integrace leadů, SEO, UTM, utils
data/                  veškerý textový a datový obsah webu
types/                 sdílené TypeScript typy
```
