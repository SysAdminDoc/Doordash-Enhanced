# DoorDash Enhanced

![Version](https://img.shields.io/badge/version-2.12.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Chrome%20%7C%20Firefox%20%7C%20Edge-orange)
![Userscript](https://img.shields.io/badge/userscript-Tampermonkey%20%7C%20Violentmonkey-informational)

> A comprehensive userscript that transforms the DoorDash experience with dark mode, ad blocking, fee transparency, checkout automation, and polished UI enhancements — all togglable from a built-in settings panel.

The Prism-token dark theme also covers the DoorDash Dasher web view when the userscript is enabled there.

<!-- Add a screenshot here: -->
<!-- ![Screenshot](screenshot.png) -->

---

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) in your browser
2. [**Click here to install DoorDash Enhanced**](https://github.com/SysAdminDoc/Doordash-Enhanced/raw/refs/heads/main/DoorDashEnhanced.user.js)
3. Confirm the installation when prompted

To access settings, click the gear icon in the DoorDash header bar or use the Tampermonkey/Violentmonkey menu command.

### Or install as a Chrome extension (no userscript manager needed)

The repo ships a ready-to-load unpacked MV3 extension in [`extension/`](extension/) — there is nothing to build:

1. Clone or download this repo
2. Open `chrome://extensions` and turn on **Developer mode** (top right)
3. Click **Load unpacked** and select the `extension` folder
4. Open DoorDash — if a tab was already open, reload it once

Works in any Chromium browser: Chrome, Edge, Brave, Opera, Vivaldi.

Click the toolbar icon for the control panel. The userscript exposes its features through the userscript-manager menu, which an extension does not have, so the popup lists those same commands — Open Settings, Toggle Dark Mode, per-feature toggles, and the navigation shortcuts — and runs them in the page. The in-page gear icon opens the full settings panel either way.

Settings are mirrored into `chrome.storage.local`, so they survive clearing site data and follow you across the regional DoorDash domains — configure on `doordash.com` and `doordash.ca` picks it up on its first load. Reads still come from the page's own `localStorage` so the theme lands before first paint instead of flashing light on every navigation; the mirror is the authoritative copy and `localStorage` converges on it.

If you change the userscript, regenerate the extension so the two stay in sync:

```bash
node scripts/build-extension.js          # regenerate
node scripts/build-extension.js --check  # fail if stale (what CI runs)
```

`manifest.json`, `popup.html`, `popup.js`, and `content.js` are all generated from `DoorDashEnhanced.user.js`; only the icons are checked in as source. The manifest's match list is derived from the userscript's `@match` directives, so the extension cannot quietly miss an origin the userscript supports.

> Chrome will not accept an unpacked extension as a `.crx` without signing, and this project ships unsigned — **Load unpacked** is the supported path.

---

## Features

### Appearance

| Feature | Description | Default |
|---------|-------------|---------|
| Dark Mode | Full dark theme generated from DoorDash's own Prism design tokens — covers all pages including checkout, Mapbox maps, and the sidebar. Five palettes: Midnight (default), Mocha, Frappé, Macchiato, and Latte (light) | **On** |
| Wide Layout | Stretches content to use the full browser width | **On** |
| Checkout Page Styling | Glassmorphism on checkout sections, animated Place Order button with shimmer, hover effects on line items, and staggered entrance animations | **On** |
| Store Page Polish | Compact spacing for convenience/retail store pages, rounded card corners, hover lift on item cards, image zoom, sidebar dark mode text fixes, and amber-glow rating badges | **On** |
| Visual Flair & Animations | Animated "Top Dasher" badges with shimmer, staggered store card entrances, bouncy button hovers, cart ring pulse, notification bell wiggle, and more | **On** |

### Ad Blocking

| Feature | Description | Default |
|---------|-------------|---------|
| Block DashPass Promos | Hides DashPass upsell banners and promotions across all pages | **On** |
| Block Popups & Overlays | Auto-closes promotional modals, sheets, and overlay dialogs | **On** |
| Hide Sponsored Listings | Removes sponsored store cards on the homepage, sponsored items in retail stores, and entire "Sponsored" carousels — uses a TreeWalker text-node approach that doesn't rely on fragile CSS class hashes | **On** |

Users who only need cosmetic blocking can subscribe to the standalone [DoorDash Enhanced filter list](https://github.com/SysAdminDoc/Doordash-Enhanced/raw/refs/heads/main/filters/doordash-enhanced.txt) in uBlock Origin or AdGuard.

### Transparency

| Feature | Description | Default |
|---------|-------------|---------|
| Fee Highlighter | Color-codes fees on the checkout page (green for subtotal, red for fees, blue for delivery) so you can instantly see the cost breakdown | **On** |
| Auto-Expand Fee Details | Automatically expands collapsed fee breakdowns on the checkout page | **On** |
| Price per Portion | Estimates a per-person price for group-order items that show serving counts | **On** |

### Checkout

| Feature | Description | Default |
|---------|-------------|---------|
| Default Tip | Three modes: **Off**, **Remember Last** (saves your tip choice and auto-selects it next checkout), or **Fixed Amount** (enter a dollar amount that's always applied). If the amount matches a preset button it clicks it; otherwise it fills the "Other" custom input | **Off** |
| Local Promo Code Helper | Stores user-supplied comma-separated codes and tries them only after you click the checkout helper button; no affiliate or coupon service is contacted | **Off** |

### Utilities

| Feature | Description | Default |
|---------|-------------|---------|
| Running Price Calculator | Displays an estimated running total while browsing a store menu | **On** |
| Sticky Cart Button | Keeps the cart button visible while scrolling | **On** |
| Menu Actions | Settings, dark mode, search, cart, home, and orders are available from the header buttons and userscript-manager menu | **On** |
| Search History | Remembers previous searches and provides autocomplete suggestions | **On** |
| Order History Log | Locally remembers visible Orders-page entries and exports CSV/JSON with a spending summary | **On** |

The optional **Settings Sync URL** control accepts a user-owned raw `gist.githubusercontent.com` JSON URL and pulls settings only when configured or when you click **Pull**. There is no default endpoint and no token is stored by the script.

### UI Cleanup

| Feature | Description | Default |
|---------|-------------|---------|
| Hide Hero Carousel | Removes the large promotional carousel at the top of the homepage | **On** |
| Clean Footer | Strips down the cluttered footer | **On** |
| Hide Turnstile Banners | Hides Cloudflare turnstile verification banners when not actively needed | **On** |
| Hide Electronics | Removes the Electronics category from the sidebar navigation | **On** |

---

## How It Works

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Tampermonkey    │────>│  DoorDash        │────>│  Settings Panel  │
│                  │     │  Enhanced IIFE   │     │                  │
│  Injects script  │     │                  │     │  Toggle features │
│  on page load    │     │  19 features     │     │  per-feature     │
└──────────────────┘     │  MutationObserver│     │  GM_setValue     │
                         │  SPA nav handler │     └──────────────────┘
                         └──────────────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
              ┌─────▼─────┐ ┌────▼────┐ ┌──────▼──────┐
              │  CSS-Only  │ │ Observer│ │  Hybrid     │
              │  Features  │ │ Features│ │  Features   │
              │            │ │         │ │             │
              │ Dark Mode  │ │ Sponsor │ │ Tip Default │
              │ Wide Layout│ │ Blocking│ │ Fee Highlite│
              │ Flair CSS  │ │ Popups  │ │ Price Calc  │
              └────────────┘ └─────────┘ └─────────────┘
```

**Key design decisions:**

- **Prism Design Tokens** — DoorDash's styling flows through a three-layer token graph: `--base-color-*` raw ramps feed `--usage-color-*` semantics, which feed `--comp-color-*` per-component values. Measured against the page captures in this repo, their stylesheets carry 1,009 `var()`-driven color declarations against 12 literal ones, so the theme is generated by re-pointing tokens rather than by fighting element rules. One palette definition produces the whole sheet.

  Three things the graph does not hand you for free, all handled explicitly in `themeCSS()`:

  1. **`--base-color-white` is overloaded.** Seven surface tokens point at it — but so do fourteen *foreground* tokens, including the primary-button label and icon. Darkening it themes the page and simultaneously paints dark text onto the red CTA, so white stays white and the seven surfaces are re-pointed by name.
  2. **Fifty tokens hardcode hex** instead of referencing a ramp (borders, scrims, translucent fills, elevation, gradients). A ramp change cannot reach them.
  3. **Every "subdued" semantic background is a near-white pastel** taken from steps 0–20 of a color ramp, so success/warning/DashPass chips stay bright unless those steps are re-tinted.

- **Structural selectors over class hashes** — where DoorDash uses a literal color with no token behind it (the footer, the store hero slab, the carousel hover veil), the override is anchored to a `data-testid` rather than to the styled-components hash beside it, because those hashes are regenerated on every deploy
- **SPA-Aware** — Hooks into `history.pushState` / `replaceState` / `popstate` to re-apply features on DoorDash's client-side navigation
- **MutationObserver** — Each feature that needs DOM watching uses a shared `safeObserver` pattern with `childList: true, subtree: true`
- **Text-Based Sponsored Detection** — Uses `TreeWalker` to find literal "Sponsored" text nodes, then walks up the DOM to find card boundaries. No fragile class-hash selectors that break when DoorDash rebuilds
- **GM_getValue / GM_setValue** — All settings persist across sessions via the userscript manager's storage API

---

## Configuration

All features are togglable from the built-in settings panel:

- **Gear icon** — Click the gear icon injected into the DoorDash header bar
- **Userscript-manager menu** — Open settings, toggle individual boolean features, or run navigation actions from the Tampermonkey/Violentmonkey menu

Settings are organized into groups: Appearance, Ad Blocking, Transparency, Checkout, Utilities, and UI Cleanup. Each feature can be independently enabled or disabled with instant apply/remove — no page reload required.

The settings panel can be displayed in English, Spanish, French, or Canadian English using the **Language** selector under Appearance. New or site-specific strings fall back to English.

The **Default Tip** feature uses a dropdown selector:
- **Off** — No tip automation
- **Remember Last** — Stores the last tip you selected and auto-picks it next time
- **Fixed Amount** — Shows a `$ [____]` input where you set a specific dollar amount

The **Local Promo Code Helper** accepts comma-separated codes such as `SAVE10, WELCOME`. On checkout, click **Try codes** to submit them one at a time and report the first accepted code.

**Reset All Settings** is available at the bottom of the panel to restore defaults.

---

## Menu Actions

| Entry point | Action |
|------------|--------|
| Gear icon | Open/close settings panel |
| Userscript-manager menu | Open settings, toggle dark mode, focus search, open cart, go home, or open orders |

---

## FAQ / Troubleshooting

**Q: The page disappears or looks broken after enabling the script.**
DoorDash uses React hydration which can conflict with early DOM manipulation. The script runs at `document-idle` and avoids modifying React-managed attributes to prevent hydration mismatches (React errors #418/#423). If you see issues, try disabling individual features to isolate the conflict.

**Q: Sponsored listings still appear.**
The sponsored blocker runs on a 1.5-second interval to catch dynamically loaded content. If cards appear briefly before hiding, this is expected — the TreeWalker needs the DOM to render before it can find the "Sponsored" text nodes. Scrolling down to trigger lazy-loaded content will trigger a fresh sweep.

**Q: Dark mode doesn't cover a specific element.**
DoorDash frequently ships new components. Open an issue with a screenshot and the element's CSS selector (right-click → Inspect), and it can be added to the Prism token overrides.

**Q: The Default Tip isn't applying on checkout.**
The tip picker must be visible on the page for the script to interact with it. If DoorDash changes the tip UI structure, the "Other" custom input filling may need selector updates. The script uses React-compatible `nativeInputValueSetter` to set values.

---

## Contributing

Issues, bug reports, and pull requests are welcome. When reporting a bug, please include:

- Browser and version
- Userscript manager and version
- Console errors (F12 → Console tab, filter for `[DD Enhanced]`)
- Which feature(s) were enabled
- Screenshot if it's a visual issue

---

## License

[MIT](LICENSE) — Do whatever you want with it.
