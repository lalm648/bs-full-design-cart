# Blue Salon — Design System

> Qatar's first and foremost luxury department store, since 1981.

Blue Salon (stylised **bluesalon**) is the flagship luxury retail concept of **AbuIssa Holding**. Founded in 1981, it is Qatar's premier department store, representing 500+ international and niche luxury brands across **Women, Men, Kids, Beauty, Luggage, Gourmet, Home & Linen,** and **Gift**. It operates a flagship store in Al Sadd, Doha, 100+ retail outlets, several concept stores (Highland, Mosafer, Gold Gourmet, Arabesq), and the e-commerce platform **bluesalon.com** (a Shopify storefront), plus a shopping mobile app.

This design system equips designers and agents to produce on-brand interfaces and marketing assets for Blue Salon's two primary digital surfaces:

1. **Website** — `bluesalon.com`, a luxury multi-brand e-commerce storefront (prices in QAR).
2. **Mobile app** — the Blue Salon shopping app (brushstroke "b" app icon).

---

## Sources

No production codebase or Figma file was supplied. This system was built from:
- **Brand assets provided:** `blue-salon-logo-horizontal-01 (2).svg` (horizontal logo + wordmark, navy `#003976`), `bs-app-icon-transparent.png` (1024² brushstroke "b" app mark).
- **Brand colour palette provided** by the user (see Visual Foundations → Colour).
- **Public reference:** [bluesalon.com](https://www.bluesalon.com/), [abuissa.com/retails/bluesalon](https://www.abuissa.com/retails/bluesalon/).

> ⚠️ If the licensed brand typefaces, a Figma library, or the storefront codebase exist, share them via the Import menu and this system will be re-grounded against them. See **Caveats** at the bottom.

---

## CONTENT FUNDAMENTALS — voice & copy

Blue Salon's voice is **refined, confident, and understated** — the tone of a knowledgeable luxury concierge, never a hype-driven discount retailer.

- **Casing:** Editorial. Eyebrows, navigation, and category labels are set in **UPPERCASE with wide letter-spacing** (`WOMEN`, `NEW ARRIVALS`, `SHOP THE EDIT`). Headlines use Title Case or sentence case in the serif display. Body copy is sentence case.
- **Person:** Customer-facing copy addresses the shopper as **"you"** and speaks for the house as **"we"** ("We now offer our loyal customers an enhanced shopping experience"). Warm but composed.
- **Vocabulary:** *curated, exclusive, edit, collection, discover, the latest, must-have, designer, niche, house.* Avoid "cheap", "deal", "blowout". Discounts are framed as *Sale*, *Exclusive offer*, or *Private sale* — never "% OFF!!" shouting.
- **Currency:** Always `QAR` prefix with thousands separators and two decimals — `QAR 5,780.00`. Sale prices show the original struck through beside the reduced price.
- **CTAs:** Short, plain, transactional — `Add to cart`, `Add to wishlist`, `Quick view`, `Shop now`, `Discover`, `View all`, `Check out`. Sentence case, no exclamation marks.
- **Emoji:** **Never.** Not in product copy, marketing, or UI. The brand expresses warmth through imagery and typography, not emoji.
- **Examples (real, from the storefront):**
  - "Qatar's leading luxury retail concept with a coveted range of international and own brands."
  - "Split your payment into 4 installments."
  - "Free shipping on order QAR 499."
  - "Trending Now", "Top searches", "Recently Viewed".
- **Vibe:** Quiet luxury. Spacious, photographic, calm. The product is the hero; the chrome recedes.

---

## VISUAL FOUNDATIONS

### Colour
Blue is the brand — the name *is* the palette. A single blue ladder runs from the deep logo navy to a bright Gulf cyan, grounded by warm ivory paper and cool ink text. (`tokens/colors.css`)

- **Primary navy `#003976`** (`--blue-800`) — the logo colour; primary buttons, headers, footers, the dominant brand tone.
- **Royal `#0061a5`**, **Secondaries `#0077cb` / `#0093ca` / `#00a2d0`** — a cohesive blue scale for links, accents, gradients-of-blue, and the bright cyan used for interactive highlights.
- **Neutrals** — warm **ivory `#faf8f4`** as the page ground (never stark white for large fields), pure white for cards/sheets, and a cool **ink charcoal `#0e1722`** for headings. Hairline borders in light cool greys.
- **Champagne gold `#c2a25e`** — a *restrained* luxury accent: thin rules, monogram detailing, premium-tier badges. Use sparingly; it is seasoning, not a primary.
- **Semantic** — success green, warning amber, danger/sale red (`#c0392f` for sale pricing).

### Typography
- **Brand typeface — Qatar** (client-supplied): a humanist sans carrying both **Latin and Arabic**, used across the entire system. Weights 300 / 400 / 500 / 700 (`assets/fonts/`, declared in `tokens/fonts.css`).
- **Display** — Qatar **Light (300)** at large sizes with tight leading: hero headlines, editorial titles, section headers, large prices. The light weight + scale is what reads as quiet luxury.
- **UI / Body** — Qatar Regular/Medium: navigation, labels, body copy, buttons, controls. Eyebrows and nav use uppercase + wide tracking (`--ls-wider` / `--ls-widest`).
- Minimum sizes: 24px+ on slides, 12px floor in print, 11px eyebrow labels in UI.

### Spacing & layout
- 4px base grid (`tokens/spacing.css`). **Generous whitespace is non-negotiable** — luxury reads as air. Section padding is large (`--space-12`, 96px).
- Centred container max `1320px`, 24px gutters. Product grids are clean and aligned; imagery dominates, text is sparse beneath.

### Backgrounds & imagery
- **No decorative gradients, no patterns, no textures.** Backgrounds are flat ivory or white, or **full-bleed editorial photography**.
- Imagery is **warm, bright, aspirational** lifestyle and product photography — clean studio shots on white/neutral for PLP product cards; cinematic lifestyle for hero banners. Never grainy, never heavily filtered.
- Product cards sit on white; the page sits on ivory — the subtle contrast frames the merchandise.

### Corners, borders, elevation
- **Near-square corners.** Radii are small (2–6px); buttons and cards are crisp and editorial, not bubbly/pill-rounded (pills reserved for chips/tags only). (`tokens/elevation.css`)
- **Hairline borders** (1px cool grey) define product cards and inputs more than shadows do.
- **Shadows** are soft, low-spread, navy-tinted — used only on overlays, dropdowns, hover-lift on product cards. Default cards are border-defined and flat.

### Motion & states
- **Easing:** `--ease-standard` (gentle ease-out). Calm, never bouncy for chrome; a subtle `--ease-emphasis` overshoot only for playful moments (add-to-cart).
- **Fades & lifts:** images cross-fade to a secondary shot on hover; cards lift 2–4px with a soft shadow. No spin, no flashy entrances.
- **Hover:** primary buttons darken navy→deep-navy; links gain a 3px-offset underline; product images swap.
- **Press:** subtle scale-down (0.98) + deeper colour. Never a hard colour invert.
- **Focus:** 3px cyan focus ring (`--shadow-focus`) for accessibility.

---

## ICONOGRAPHY

Blue Salon's storefront uses a **thin, single-weight line-icon set** (search, account, wishlist heart, cart bag, location pin, chevrons, close, filter, compare). The aesthetic is minimal hairline strokes that echo the typographic lightness.

- **In this system we use [Lucide](https://lucide.dev)** (`stroke-width: 1.5`) via CDN as the closest match to the storefront's thin line icons. *(Substitution — the production storefront ships its own SVG/icon-font set; swap for the licensed set when available.)* Load with `<script src="https://unpkg.com/lucide@latest"></script>` then `lucide.createIcons()`, or use inline `<svg>` from the Lucide set.
- **Wishlist** is a heart outline (filled when active); **cart** is a shopping-bag glyph; **account** is a person outline. These three are the storefront's signature top-bar trio.
- **No emoji, ever.** No coloured/3D icon styles. Icons inherit `currentColor` and sit at 18–24px in UI.
- **The brushstroke "b" mark** (`assets/app-icon.png`) is the app icon and a standalone brand stamp — a hand-painted lowercase *b* in navy. Use it as a favicon/app-tile/loading mark, not as an inline UI icon.

---

## INDEX — what's in this system

**Root**
- `styles.css` — global entry point (import this one file). Imports-only.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill front-matter for portable use.

**`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `elevation.css`, `base.css`.

**`assets/`** — `logo-horizontal.svg` (navy), `logo-horizontal-white.svg` (reversed), `app-icon.png` (brushstroke "b").

**`guidelines/`** — foundation specimen cards (Type, Colours, Spacing, Brand) shown in the Design System tab.

**`components/core/`** — reusable React primitives: `Button`, `IconButton`, `Input`, `Select`, `Badge`, `Tag`, `Breadcrumb`, `Rating`, `QuantityStepper`, `PriceTag`, `ProductCard`. Each has a `.jsx`, `.d.ts`, `.prompt.md`; one card HTML per directory.

**`ui_kits/website/`** — e-commerce storefront recreation (home, listing, product, cart).

**`ui_kits/app/`** — mobile shopping-app recreation (home, product, bag).

---

## CAVEATS
- **Typeface is the real brand font** (Qatar, client-supplied) — Latin + Arabic, used system-wide. ✓
- **Icons are substitutions** (Lucide ≈ the storefront's thin line set).
- **Gold accent** is an editorial inference for luxury tier — confirm it belongs in the brand.
- No codebase/Figma was available, so the homepage UI kit is grounded in the live storefront + brand context, not source components.
