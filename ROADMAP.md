# DoorDash Enhanced Roadmap

Userscript that adds dark mode, ad blocking, fee transparency, checkout automation, and UI polish to DoorDash. Tracks work beyond v2.6.1.

## Planned Features

### Stability / Core
- Remove all `Alt+...` keyboard shortcuts per project rules (Alt+P, Alt+S, Alt+C, Alt+H, Alt+O, Alt+Shift+D) and replace with gear-icon + Tampermonkey menu entry points
- Trusted Types policy (`trustedTypes.createPolicy('doordash-enhanced', ...)`) for all `innerHTML` / `insertAdjacentHTML` paths in case DoorDash ships CSP
- Shadow DOM isolation for the settings panel so future DoorDash CSS resets can't leak into it
- React hydration safety audit: guard every DOM write with `requestIdleCallback` + attribute check to avoid `#418/#423`
- Idempotent feature mount/unmount — toggling a feature should not leave orphan observers or CSS rules

### Features
- Restaurant tipping memory per-restaurant (not just last used global)
- Price-per-ounce / per-100g calculator on retail store items
- Allergen filter: supply a comma-separated allergen list, script greys items whose name/description matches
- Delivery-fee baseline: after N orders, surface "current fee vs your median" so spikes are obvious
- Price-increase detector: compare current item prices to last-viewed prices for the same restaurant, highlight increases
- One-click "reorder last" surfaced as a sticky button on the home page
- "Hide restaurants outside $N delivery fee" slider
- Keyboard-free tip picker that snaps to the nearest preset when the `Other` value is entered

### UI / Theming
- Theme picker (Catppuccin Mocha default, Frappé, Macchiato, Latte as light option)
- Restaurant card density slider (comfortable / compact / dense)
- Optional minimalist mode (hide badges, hide images in list view)
- Real sticky order summary on checkout that respects fee/collapse expansion
- Animated fee-drop indicator when DoorDash reduces a visible fee mid-session

### Persistence / Sync
- Export/import settings as JSON from the settings panel
- Optional cloud-sync via a user-configurable Gist URL (opt-in, no default endpoint)
- Per-site (dash.com test env, doordash.ca, doordash.com.au) variant handling

### Performance
- Replace 1.5s sponsored-blocker interval with a single MutationObserver that batches via `requestIdleCallback`
- Debounce `pushState`/`popstate` handlers to 50 ms to avoid double-mount on SPA nav
- Feature lazy-load: CSS-only features inject a single `<style>` at startup, JS features mount only when their entry matcher fires

### Packaging
- `@updateURL` / `@downloadURL` headers pinned to the GitHub raw URL
- Ship un-minified (per userscript rules) with consistent code style via Prettier
- GitHub Action that validates `@version` matches `README` badge and `CHANGELOG.md` top entry on every PR

## Competitive Research

- **Refined DoorDash (various clones on GreasyFork)** — Smaller feature scope, mostly ad blocking; DoorDash Enhanced is already ahead. Keep watching for DoorDash class-hash changes and mirror any selector updates.
- **uBlock Origin / AdGuard filter lists** — Community filter rules may duplicate the ad-blocking features; publish a DoorDash Enhanced filter list so extension users can get ad blocking without the userscript and vice versa.
- **Honey / Rakuten** — Coupon injection extensions; DoorDash Enhanced should add a similar "promo code trier" feature while staying local (no affiliate links).
- **Refined Twitter / Refined GitHub** — Gold-standard SPA enhancement userscripts; steal their router + feature lifecycle patterns for cleaner mount/unmount.

## Nice-to-Haves

- Running order log: one-tap "export my orders as CSV" by walking the Orders page
- Markup warning: compare restaurant menu prices against the restaurant's own site (when known) and flag 30%+ markups
- Dark mode for the DoorDash delivery-driver (Dasher) view
- Price-per-portion estimator on group ordering
- Companion Chrome MV3 extension build using the same feature registry and GM_* shim
- Localization (EN / ES / FR / CA-EN) for settings panel strings

## Open-Source Research (Round 2)

### Related OSS Projects
- **pxue/better-eats** — https://github.com/pxue/better-eats — Uber Eats userscript; custom filters reference for a sibling project (same problem on a different delivery site).
- **BiteStats** (Chrome extension) — https://github.com/topics/doordash — DoorDash + Grubhub spending dashboard with date-range filter and dark mode; closest peer for "fee transparency + dark mode."
- **acst52/EatsMatch** — https://github.com/acst52/EatsMatch — Multi-service price comparator across UberEats/DoorDash; source of inspiration for in-cart comparison.
- **iamadamdev/bypass-paywalls-chrome** — https://github.com/iamadamdev/bypass-paywalls-chrome — Reference for per-site override userscript/extension architecture shipped as both formats.
- **tycrek/degoogle-alternatives-inspired listings** — https://github.com/topics/tampermonkey — Topic index for Tampermonkey ecosystem patterns (storage, menu commands, GM APIs).
- **OmniGrub** (DoorDash rating overlay) — https://github.com/topics/doordash — Injects Foursquare/Yelp ratings into DoorDash pages via DOM manipulation; reference for third-party data overlay pattern.
- **DoorDash careers blog, "Launching Dark Mode While Building a Scalable Design System"** — https://careersatdoordash.com/blog/launching-dark-mode-while-building-a-scalable-design-system/ — DoorDash's own Prism-token dark-mode system; cite their tokens to stay stable across redesigns.

### Features to Borrow
- Spending dashboard overlay (total spend / avg tip / order count / top restaurants) accessible from the settings panel — borrow from `BiteStats`.
- Multi-service price/item comparator: when a user searches for "Chipotle" on DoorDash, optionally query GrubHub/UberEats price for the same item via open endpoints — borrow from `EatsMatch`.
- Restaurant rating overlay from an external source (OSM/Yelp/Foursquare open endpoints) injected next to the DoorDash star rating — borrow from `OmniGrub`.
- Use DoorDash's own Prism design tokens as the dark-mode source of truth so redesigns don't break theming — borrow from the DoorDash engineering blog.
- Companion Chrome extension build that ships the same feature set as the userscript, for users who don't want Tampermonkey — borrow from `bypass-paywalls-chrome`'s dual-distribution model.
- Per-feature menu toggles via `GM.registerMenuCommand` in addition to the in-page settings panel — borrow from common Tampermonkey patterns across the GH topic index.
- Export order history to CSV/JSON from the in-page overlay — borrow from `BiteStats` analytics UX.
- Ad/anti-adblock bypass baseline patterns — borrow from the "Ultimate AdBlocking+AdBypassing Guide" gist (simonwep's BlockAdBlock blocker).

### Patterns & Architectures Worth Studying
- DoorDash's Prism design-token system: `--dd-color-background-primary` etc. DoorDash-Enhanced should prefer token overrides over class-name overrides because tokens are stable even when DoorDash rewrites the component tree (they did this in 2022).
- `BiteStats` DOM-scrape → IndexedDB → chart-render pipeline for historical analysis. IndexedDB-per-origin is the only way to build order-history features inside a userscript without violating DoorDash TOS about server-side scraping.
- `bypass-paywalls-chrome`'s site-config JSON (enabled-per-domain, feature-per-site) is the maintainable shape for scaling this project if it expands to cover GrubHub/UberEats/Instacart.
