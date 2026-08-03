# DoorDash Enhanced

![Version](https://img.shields.io/badge/version-2.8.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Chrome%20%7C%20Firefox%20%7C%20Edge-orange)
![Userscript](https://img.shields.io/badge/userscript-Tampermonkey%20%7C%20Violentmonkey-informational)

> A comprehensive userscript that transforms the DoorDash experience with dark mode, ad blocking, fee transparency, checkout automation, and polished UI enhancements — all togglable from a built-in settings panel.

<!-- Add a screenshot here: -->
<!-- ![Screenshot](screenshot.png) -->

---

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) in your browser
2. [**Click here to install DoorDash Enhanced**](https://github.com/SysAdminDoc/Doordash-Enhanced/raw/refs/heads/main/DoorDashEnhanced.user.js)
3. Confirm the installation when prompted

To access settings, click the gear icon in the DoorDash header bar or use the Tampermonkey/Violentmonkey menu command.

### Optional Chrome extension build

The same feature source can be built as an unpacked Chrome MV3 extension:

```bash
node scripts/build-extension.js
```

Then open `chrome://extensions`, enable **Developer mode**, and choose **Load unpacked** for the `extension` directory. The build uses local browser storage as its `GM_*` compatibility layer.

---

## Features

### Appearance

| Feature | Description | Default |
|---------|-------------|---------|
| Dark Mode | Full dark theme using DoorDash's own Prism design token overrides — covers all pages including checkout, Mapbox maps, and the sidebar | **On** |
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

### Utilities

| Feature | Description | Default |
|---------|-------------|---------|
| Running Price Calculator | Displays an estimated running total while browsing a store menu | **On** |
| Sticky Cart Button | Keeps the cart button visible while scrolling | **On** |
| Menu Actions | Settings, dark mode, search, cart, home, and orders are available from the header buttons and userscript-manager menu | **On** |
| Search History | Remembers previous searches and provides autocomplete suggestions | **On** |
| Order History Log | Locally remembers visible Orders-page entries and exports CSV/JSON with a spending summary | **On** |

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

- **Prism Design Tokens** — Dark mode overrides DoorDash's own CSS custom properties (`--usage-color-*`, `--comp-color-*`) rather than brute-forcing colors, so it stays consistent with their design system
- **SPA-Aware** — Hooks into `history.pushState` / `replaceState` / `popstate` to re-apply features on DoorDash's client-side navigation
- **MutationObserver** — Each feature that needs DOM watching uses a shared `safeObserver` pattern with `childList: true, subtree: true`
- **Text-Based Sponsored Detection** — Uses `TreeWalker` to find literal "Sponsored" text nodes, then walks up the DOM to find card boundaries. No fragile class-hash selectors that break when DoorDash rebuilds
- **GM_getValue / GM_setValue** — All settings persist across sessions via the userscript manager's storage API

---

## Configuration

All features are togglable from the built-in settings panel:

- **Gear icon** — Click the gear icon injected into the DoorDash header bar
- **Userscript-manager menu** — Open settings or run navigation actions from the Tampermonkey/Violentmonkey menu

Settings are organized into groups: Appearance, Ad Blocking, Transparency, Checkout, Utilities, and UI Cleanup. Each feature can be independently enabled or disabled with instant apply/remove — no page reload required.

The settings panel can be displayed in English, Spanish, French, or Canadian English using the **Language** selector under Appearance. New or site-specific strings fall back to English.

The **Default Tip** feature uses a dropdown selector:
- **Off** — No tip automation
- **Remember Last** — Stores the last tip you selected and auto-picks it next time
- **Fixed Amount** — Shows a `$ [____]` input where you set a specific dollar amount

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
