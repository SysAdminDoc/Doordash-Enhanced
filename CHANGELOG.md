# Changelog

All notable changes to Doordash-Enhanced will be documented in this file.

## [v2.11.0] - 2026-08-07

- Added: The unpacked Chrome MV3 extension is committed under `extension/`, so it can be loaded straight from a clone with no build step.
- Added: A toolbar popup. The userscript registers its entire control surface through `GM_registerMenuCommand`, which a browser extension has no menu to surface — the shim stubbed it out, silently dropping all 31 commands. They are now recorded and listed in the popup, which invokes them back in the page.
- Added: Extension icons at 16/32/48/128, derived from the userscript's own `@icon`.
- Changed: `scripts/build-extension.js` now generates `manifest.json`, `popup.html`, and `popup.js` alongside `content.js`, and `--check` fails if any of them is stale. The manifest's match list is parsed from the userscript's `@match` directives rather than maintained separately, so the two cannot drift.

## [v2.10.1] - 2026-08-07

- Fixed: Order-date metadata in the store reorder carousel is no longer unreadable. DoorDash sets that text with a literal `rgb(118,118,118)` instead of a Prism token, so no theme sheet can reach it — and the only CSS handle is a styled-components hash that is regenerated on every deploy. It is now matched on its rendered color inside that one container and re-pointed at the subdued-text token. All three captured pages measure zero WCAG AA failures on every palette, including Latte, where DoorDash's own light theme ships ten.

## [v2.10.0] - 2026-08-06

- Added: A single theme engine that generates every palette from one token map, replacing the separate dark-mode and Catppuccin sheets that previously raced each other in the style bundle.
- Added: "Midnight", a contrast-tuned default dark palette, alongside the existing Mocha, Frappé, Macchiato, and Latte options.
- Fixed: Primary-action labels and icons no longer render dark on the red CTA. `--base-color-white` backs seven surface tokens but also fourteen foreground tokens, so darkening it wholesale flipped "Place order" from white to near-black and dropped it below WCAG AA.
- Fixed: Fifty usage/comp tokens that hardcode hex rather than referencing a ramp are now themed — panel borders, scrims, translucent and media overlays, the side-navigation and date-picker gradients that faded to white, and all eleven elevation tokens, whose light-theme grey shadow was invisible on a dark page.
- Fixed: Subdued semantic backgrounds are re-tinted. Success, warning, DashPass, deal, and highlight chips draw their fill from steps 0-20 of a color ramp, which are near-white pastels, and previously stayed bright on a dark page while their text stayed dark.
- Fixed: Toast, tooltip, chat, and selected-control surfaces keep white inverse text legible by staying contrasting rather than inverting to near-white.
- Fixed: Footer text, the store hero and closing-soon slabs, and the carousel hover veil are now themed. These are literal colors in DoorDash's stylesheets with no token to re-point, so they are anchored to `data-testid` rather than to the styled-components hashes beside them.
- Fixed: The script's own toolbar and dashboard now follow the selected palette's lightness instead of the dark-mode flag, which painted white-on-white labels when Latte was active.
- Changed: Latte's upper ramp is two stops darker than stock Catppuccin, because subdued text sits on its tinted canvas rather than on white.
- Removed: Seventeen lines of dead inline-style selectors and a `--base-color-black` override, verified against the captured pages to match nothing.

## [v2.9.0] - 2026-08-03

- Added: Idle-safe, idempotent feature lifecycle management with route-aware lazy mounting and a shared CSS bundle.
- Added: Local Orders-page history, CSV/JSON export, spending summary, group-order portion pricing, local promo-code trials, four-language settings localization, Dasher dark mode, per-feature menu toggles, and a standalone cosmetic filter list.
- Added: A dependency-free metadata validator, CI workflow, and generated Chrome MV3 companion build.

## [v2.8.0] - 2026-08-03

- Added: Catppuccin theme picker, card density controls, delivery-fee filtering, settings export/import, and regional site matching.
- Added: Per-restaurant tip memory, unit-price and allergen annotations, fee baselines, price-increase detection, reorder access, sticky checkout summary, and fee-drop indicators.
- Added: Local Orders-page history with one-tap CSV/JSON export and a spending summary dashboard.
- Added: Per-portion price estimates for group-order items with serving counts.
- Added: English, Spanish, French, and Canadian English settings-panel localization with an in-panel language selector.
- Added: An MV3 companion-extension build generated from the userscript with a local `GM_*` compatibility shim.
- Added: Dasher web-view matching and scoped dark-surface overrides for the delivery-driver interface.
- Added: Individual boolean-feature toggles to the Tampermonkey/Violentmonkey menu.
- Added: A standalone uBlock Origin/AdGuard cosmetic filter list for DoorDash promotions and sponsored surfaces.
- Added: A user-triggered local promo-code helper that tries comma-separated codes without affiliate services.
- Changed: Settings sync now documents the opt-in raw-Gist pull boundary and keeps the default endpoint empty.
- Changed: Removed Alt keyboard shortcuts, added Trusted Types coverage, isolated the settings panel in Shadow DOM, and hardened SPA feature lifecycle cleanup.
- Changed: Page-bound features now lazy-mount on matching routes and CSS-only styles share one idle-safe bundle.

## [v2.6.1] - 2026-04-13

- Changed: Update README.md
- Changed: Update DoorDashEnhanced.user.js
- Added: Add files via upload
- Rename DoorDash Enhanced-2.2.0.user.js to DoorDashEnhanced.user.js
- Create DoorDash Enhanced-2.2.0.user.js
