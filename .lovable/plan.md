
## Vision

A quiet, museum-grade showroom for Đức Ngân — Vietnamese traditional instruments presented like Apple product pages meet Aesop editorial. Warm walnut/bamboo palette, generous whitespace, cinematic scroll, no marketplace clutter.

Note on stack: the project runs on TanStack Start + Tailwind v4 (not Next.js). All the intended feel — smooth scroll, reveals, magnetic buttons, waveform audio, editorial layouts — is fully achievable here. I'll use Lenis + Framer Motion (already the standard here); GSAP ScrollTrigger only if a specific pin/mask needs it.

## Design System

- Palette (tokens in `src/styles.css`, oklch):
  - background `#F7F5F1`, surface `#FFFFFF`, text `#222`, border `#E8E1D8`
  - primary walnut `#8B5A2B`, secondary bamboo-gold `#C9A46A`, accent bronze `#B8894C`
  - dark walnut footer surface
- Typography via `<link>` in `__root.tsx` head:
  - Display: Cormorant Garamond (headings, large)
  - Body: Be Vietnam Pro
- Spacing: 8px scale, max-w 1400px, 12-col grid, radius 24px cards / 999px buttons, soft shadows only.
- Motion: Lenis smooth scroll, Framer Motion reveals (fade + translate + scale), 700–1200ms, ease `expo.out`. Magnetic buttons, cursor scale on interactives, scroll progress bar.
- Subtle rice-paper/wood-grain SVG noise as body backdrop.

## Routes (TanStack file-based, each with unique head())

```
src/routes/
  __root.tsx         → fonts, Lenis provider, Navbar, Footer, scroll progress
  index.tsx          → Home
  shop.tsx           → Shop grid + filters
  instruments.tsx    → Traditional Instruments (categories editorial)
  stories.tsx        → Stories index (renamed Blog)
  stories.$slug.tsx  → Story detail (editorial)
  craftsmanship.tsx  → Artisan story, process, video
  contact.tsx        → Contact + map + form
  product.$slug.tsx  → Product detail
```

## Global Chrome

- Navbar: transparent over hero → on scroll: white/blur, shrink height, small shadow, logo scales down. Items: Home, Shop, Traditional Instruments, Stories, Craftsmanship, Contact. Right: Search, Wishlist, Cart (badge). Underline-grow hover.
- Footer: dark walnut. Logo, nav, contact, embedded map placeholder, socials, newsletter input, fine print.
- Scroll progress bar, cursor follower (desktop only), skip-to-content link.

## Home Page Sections

1. **Hero** — split. Left: eyebrow "THE SOUL OF VIETNAM", large display heading "Timeless Traditions, Handcrafted for Generations", subcopy, CTAs "Explore Collection" / "Watch Craftsmanship". Right: hero instrument photo with scale 1.15→1, blur 8→0, opacity reveal. Floating audio player card (Đàn Tranh sample) with animated waveform. Bamboo shadow accent. "Scroll to explore" indicator.
2. **Explore Instruments** — 4 tall category cards (Đàn Tranh, Đàn Bầu, Đàn Tỳ Bà, Đàn Nguyệt). Image-first, title, short desc, arrow button that slides right on hover. Card lift + image zoom on hover.
3. **Featured Instruments** — 4 luxury product cards. Wishlist heart, image, name, price in đ, star rating. Hover: cart button fades up, soft overlay. Carousel arrows top-right.
4. **Craftsmanship Story** — split. Left: artisan portrait (parallax slow scale). Right: eyebrow "OUR STORY", "30+ Years of Craftsmanship and Dedication", line-by-line text reveal, artisan signature, 4 icon stats (Years / Handcrafted / Materials / Techniques).
5. **Cultural Story** — editorial magazine block introducing Vietnamese traditional music; mixed image + pull-quote layout, pinned heading mask reveal.
6. **Audio Experience** — full-width band: "Hear the Soul" with a large waveform and 3 sample chips. Emotional selling point.
7. **Stories preview** — 3 editorial cards linking to `/stories`.
8. **Testimonials** — minimal carousel: portrait, quote, name, role.
9. **Newsletter / Footer CTA**.

## Shop Page

- Editorial header, filter rail (Category, Material, Price, Sort), product grid (3-col desktop). Same luxury card. Quick view on hover.

## Traditional Instruments Page

- Long-form editorial: each instrument gets a full-bleed section with photography, history, sound sample, "View collection" link.

## Product Detail Page

- Sticky gallery (thumbnail rail + main image, fade transitions). Sticky info column: name, price, rating, short desc, quantity, Add to Cart / Wishlist. Tabs / stacked sections: Description, Specifications, Materials, Crafting Process, Sound Sample (waveform player), Reviews. Related products carousel.

## Stories (Blog)

- Index: editorial card grid with category chips. Detail: long-form article layout with drop cap, pull quotes, image figures.

## Craftsmanship Page

- Hero portrait, timeline of 30+ years, process steps (Select wood → Carve → Assemble → Lacquer → Tune), video placeholder, artisan quote.

## Contact Page

- Split: form (name, email, subject, message) + info panel (address, phone, hours, socials). Map embed placeholder.

## Interaction Details

- Magnetic buttons (pill), cursor scale on interactives.
- Scroll reveals: fade + translate 24px, stagger 80ms.
- Image hover: soft zoom (scale 1.05, 700ms) + subtle shine sweep.
- Page transitions: fade + slight y.
- Mobile: stacked, bottom sticky Add to Cart on product page, large tap targets, animations preserved but shorter.

## Data

Static TypeScript catalog (`src/data/instruments.ts`) with 8–10 instruments (name, slug, price in đ, category, materials, description, images, sample audio URL, rating). Stories in `src/data/stories.ts`. No backend this pass.

## Assets

- Use existing high-quality Unsplash/placeholder imagery for instruments and artisan portraits (warm, natural light). Waveform rendered as animated SVG (no real audio decoding required for v1; play toggles a visual state and an `<audio>` element pointed at a placeholder mp3).

## Accessibility & SEO

- Semantic landmarks, visible focus rings (bronze), WCAG AA contrast, keyboard nav, alt text.
- Per-route `head()` with unique title/description/og; og:image only on leaf pages with a real hero.
- Lazy-load below-fold images, `loading="lazy"`, responsive `srcset` where possible.

## Technical Notes

- Add fonts via `<link>` in `__root.tsx` (never `@import` URL in styles.css — Tailwind v4/Lightning CSS).
- Extend `src/styles.css` `@theme inline` with brand tokens (`--color-walnut`, `--color-bamboo`, `--color-bronze`, `--color-paper`, `--color-ink`, `--color-line`) and a `--shadow-soft` token.
- Install: `lenis`, `framer-motion` (verify), `lucide-react` (verify). Skip GSAP unless a pin/mask section needs it in a later pass.
- Lenis wired in a client-only provider mounted inside `__root.tsx` RootComponent.
- Cursor follower and magnetic buttons behind `useMediaQuery('(pointer: fine)')` guard.

## Out of Scope (this pass)

- Auth, cart persistence, checkout, payments.
- Real audio catalog / CMS.
- Search backend (UI only).

Say the word and I'll build it.
