# Changelog

All notable changes to Doordash-Enhanced will be documented in this file.

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
