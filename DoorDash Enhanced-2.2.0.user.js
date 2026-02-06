// ==UserScript==
// @name         DoorDash Enhanced
// @namespace    https://github.com/SysAdminDoc
// @version      2.2.0
// @description  Comprehensive DoorDash enhancer: dark mode, ad/promo blocking, fee transparency, UI cleanup, keyboard shortcuts, and more.
// @author       SysAdminDoc
// @match        https://www.doordash.com/*
// @match        https://doordash.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @run-at       document-idle
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    var SCRIPT_ID = 'dd-enhanced';
    var VERSION   = '2.2.0';

    var DEFAULT_SETTINGS = {
        darkMode:            true,
        blockDashPassPromos: true,
        blockPopups:         true,
        blockSponsoredCards: true,
        feeHighlighter:      true,
        hideHeroCarousel:    false,
        cleanFooter:         true,
        quickSearch:         true,
        priceCalculator:     true,
        wideLayout:          false,
        stickyCart:          true,
        keyboardShortcuts:   true,
        autoExpandFees:      true,
        hideTurnstile:       true,
        visualFlair:         true,
    };

    function getSetting(key) { return GM_getValue(SCRIPT_ID + '_' + key, DEFAULT_SETTINGS[key]); }
    function setSetting(key, val) { GM_setValue(SCRIPT_ID + '_' + key, val); }

    // =====================================================================
    //  FEATURES
    // =====================================================================
    var features = [

        // -- DARK MODE ----------------------------------------------------
        {
            key: 'darkMode',
            name: 'Dark Mode',
            group: 'Appearance',
            desc: 'Full dark theme via Prism variable overrides',
            styleId: SCRIPT_ID + '-dark',
            init: function() { injectStyle(this.styleId, darkModeCSS()); },
            destroy: function() { removeStyle(this.styleId); }
        },

        // -- WIDE LAYOUT --------------------------------------------------
        {
            key: 'wideLayout',
            name: 'Wide Layout',
            group: 'Appearance',
            desc: 'Use full browser width for content',
            styleId: SCRIPT_ID + '-wide',
            init: function() {
                injectStyle(this.styleId,
                    '[data-testid="ThemingWrapper"] > div > div { max-width: 100% !important; padding-left: 24px !important; padding-right: 24px !important; }'
                );
            },
            destroy: function() { removeStyle(this.styleId); }
        },

        // -- BLOCK DASHPASS PROMOS ----------------------------------------
        {
            key: 'blockDashPassPromos',
            name: 'Block DashPass Promos',
            group: 'Ad Blocking',
            desc: 'Hide DashPass upsell banners and promotions',
            styleId: SCRIPT_ID + '-dashpass',
            init: function() {
                injectStyle(this.styleId, [
                    '[data-testid*="dashpass" i],',
                    '[data-testid*="DashPass" i],',
                    '[data-testid="homepage-banner-button"],',
                    '[data-testid="homepage-banner-link"],',
                    '[aria-label*="DashPass" i],',
                    'a[href*="dashpass"],',
                    'a[href*="/consumer/membership"] {',
                    '  display: none !important;',
                    '}',
                ].join('\n'));
                this._obs = safeObserver(function(node) {
                    var text = node.textContent || '';
                    if (text.length < 5 || text.length > 250) return;
                    if (node.querySelector && node.querySelector('[data-testid="card.store"], [data-anchor-id="StoreCard"]')) return;
                    if (node.querySelectorAll && node.querySelectorAll('a[href]').length > 6) return;
                    if (/(try dashpass|get dashpass|join dashpass|dashpass free|free.{0,10}delivery.{0,10}30 days|upgrade to dashpass)/i.test(text)) {
                        node.style.setProperty('display', 'none', 'important');
                    }
                });
            },
            destroy: function() { removeStyle(this.styleId); if (this._obs) this._obs.disconnect(); }
        },

        // -- BLOCK POPUPS -------------------------------------------------
        {
            key: 'blockPopups',
            name: 'Block Popups & Overlays',
            group: 'Ad Blocking',
            desc: 'Auto-close promotional modals and sheets',
            init: function() {
                this._obs = safeObserver(function(node) {
                    if (!node.matches || !node.matches('[data-testid="LAYER-MANAGER-MODAL"], [data-testid="LAYER-MANAGER-SHEET"]')) return;
                    var inner = node.querySelector('[data-testid="overlay-content"]');
                    if (!inner) return;
                    var text = inner.textContent || '';
                    if (text.length < 500 && /(dashpass|free delivery|sign up|promo|get \$|% off your|exclusive offer|limited.time)/i.test(text)) {
                        var btn = node.querySelector('button[aria-label="Close"], button[aria-label="close"], [data-testid*="close" i]');
                        if (btn) btn.click(); else node.style.setProperty('display', 'none', 'important');
                    }
                });
            },
            destroy: function() { if (this._obs) this._obs.disconnect(); }
        },

        // -- BLOCK SPONSORED ----------------------------------------------
        {
            key: 'blockSponsoredCards',
            name: 'Hide Sponsored Listings',
            group: 'Ad Blocking',
            desc: 'Remove sponsored/promoted store cards from feeds',
            init: function() {
                this._obs = safeObserver(function(node) {
                    var cards = [];
                    if (node.matches && node.matches('[data-testid="card.store"], [data-anchor-id="StoreCard"]')) cards.push(node);
                    else if (node.querySelectorAll) {
                        node.querySelectorAll('[data-testid="card.store"], [data-anchor-id="StoreCard"]').forEach(function(c) { cards.push(c); });
                    }
                    cards.forEach(function(card) {
                        if (/\bsponsored\b/i.test(card.textContent || ''))
                            card.style.setProperty('display', 'none', 'important');
                    });
                });
            },
            destroy: function() { if (this._obs) this._obs.disconnect(); }
        },

        // -- FEE HIGHLIGHTER (checkout/cart only) -------------------------
        {
            key: 'feeHighlighter',
            name: 'Fee Highlighter',
            group: 'Transparency',
            desc: 'Color-code fees on checkout page',
            styleId: SCRIPT_ID + '-fees',
            init: function() {
                injectStyle(this.styleId, feeHighlighterCSS());
                this._obs = safeObserver(function() { annotateFees(); });
                annotateFees();
            },
            destroy: function() {
                removeStyle(this.styleId);
                if (this._obs) this._obs.disconnect();
                document.querySelectorAll('.' + SCRIPT_ID + '-fee-tag').forEach(function(t) { t.remove(); });
                document.querySelectorAll('[data-' + SCRIPT_ID + '-tagged]').forEach(function(el) { el.removeAttribute('data-' + SCRIPT_ID + '-tagged'); });
            }
        },

        // -- AUTO-EXPAND FEES ---------------------------------------------
        {
            key: 'autoExpandFees',
            name: 'Auto-Expand Fee Details',
            group: 'Transparency',
            desc: 'Automatically expand fee breakdowns on checkout',
            init: function() {
                this._obs = safeObserver(function(node) {
                    if (!isCheckoutPage()) return;
                    var buttons = node.querySelectorAll ? node.querySelectorAll('button') : [];
                    buttons.forEach(function(btn) {
                        if (/fees.*estimated.*tax|estimated.*tax.*fees/i.test(btn.textContent || '') &&
                            btn.getAttribute('aria-expanded') === 'false') btn.click();
                    });
                });
            },
            destroy: function() { if (this._obs) this._obs.disconnect(); }
        },

        // -- PRICE CALCULATOR ---------------------------------------------
        {
            key: 'priceCalculator',
            name: 'Running Price Calculator',
            group: 'Utilities',
            desc: 'Show estimated total while browsing a store menu',
            init: function() {
                this._loop = setInterval(function() {
                    if (!isStorePage()) { var el = document.getElementById(SCRIPT_ID + '-calc'); if (el) el.remove(); return; }
                    updatePriceCalc();
                }, 2000);
            },
            onNavigate: function() { if (!isStorePage()) { var el = document.getElementById(SCRIPT_ID + '-calc'); if (el) el.remove(); } },
            destroy: function() { clearInterval(this._loop); var el = document.getElementById(SCRIPT_ID + '-calc'); if (el) el.remove(); }
        },

        // -- HIDE HERO CAROUSEL -------------------------------------------
        {
            key: 'hideHeroCarousel',
            name: 'Hide Hero Carousel',
            group: 'UI Cleanup',
            desc: 'Remove the promotional carousel at the top of homepage',
            styleId: SCRIPT_ID + '-hero',
            init: function() {
                injectStyle(this.styleId,
                    '[data-testid="horizontal-linear-content-wrapper"], [data-testid="HeroImageContainer"] { display: none !important; }'
                );
            },
            destroy: function() { removeStyle(this.styleId); }
        },

        // -- CLEAN FOOTER -------------------------------------------------
        {
            key: 'cleanFooter',
            name: 'Clean Footer',
            group: 'UI Cleanup',
            desc: 'Simplify the cluttered footer',
            styleId: SCRIPT_ID + '-footer',
            init: function() {
                injectStyle(this.styleId,
                    '[data-testid="Footer"], footer, [role="contentinfo"] { max-height: 200px !important; overflow: hidden !important; }'
                );
            },
            destroy: function() { removeStyle(this.styleId); }
        },

        // -- HIDE TURNSTILE -----------------------------------------------
        {
            key: 'hideTurnstile',
            name: 'Hide Turnstile Banners',
            group: 'UI Cleanup',
            desc: 'Hide Cloudflare turnstile banners when not needed',
            styleId: SCRIPT_ID + '-turnstile',
            init: function() {
                injectStyle(this.styleId, [
                    '[data-testid="turnstile/banner"]:not(:has(iframe)),',
                    '[data-testid="turnstile/overlay"]:not(:has(iframe)),',
                    '[data-testid="turnstile/widget"]:not(:has(iframe)) { display: none !important; }',
                ].join('\n'));
            },
            destroy: function() { removeStyle(this.styleId); }
        },

        // -- STICKY CART --------------------------------------------------
        {
            key: 'stickyCart',
            name: 'Sticky Cart Button',
            group: 'Utilities',
            desc: 'Keep the cart button visible while scrolling',
            styleId: SCRIPT_ID + '-sticky',
            init: function() {
                injectStyle(this.styleId,
                    '[data-testid="OrderCartIconButton"] { position: sticky !important; top: 80px !important; z-index: 1000 !important; }'
                );
            },
            destroy: function() { removeStyle(this.styleId); }
        },

        // -- KEYBOARD SHORTCUTS -------------------------------------------
        {
            key: 'keyboardShortcuts',
            name: 'Keyboard Shortcuts',
            group: 'Utilities',
            desc: 'Alt+S: search, Alt+C: cart, Alt+H: home, Alt+O: orders, Alt+P: settings',
            init: function() {
                this._handler = function(e) {
                    if (!e.altKey || e.target.matches('input, textarea, select')) return;
                    var k = e.key.toLowerCase();
                    if (k === 's') { e.preventDefault(); var el = document.querySelector('[data-anchor-id="HeaderSearchInputField"]'); if (el) el.focus(); }
                    else if (k === 'c') { e.preventDefault(); var el2 = document.querySelector('[data-testid="OrderCartIconButton"], a[href*="/cart"]'); if (el2) el2.click(); }
                    else if (k === 'h') { e.preventDefault(); window.location.href = '/home'; }
                    else if (k === 'o') { e.preventDefault(); window.location.href = '/orders'; }
                    else if (k === 'p') { e.preventDefault(); toggleSettingsPanel(); }
                };
                document.addEventListener('keydown', this._handler);
            },
            destroy: function() { document.removeEventListener('keydown', this._handler); }
        },

        // -- SEARCH HISTORY -----------------------------------------------
        {
            key: 'quickSearch',
            name: 'Search History',
            group: 'Utilities',
            desc: 'Remember and suggest previous searches',
            init: function() {
                this._obs = safeObserver(function(node) {
                    var input = (node.matches && node.matches('[data-anchor-id="HeaderSearchInputField"]')) ? node :
                                (node.querySelector ? node.querySelector('[data-anchor-id="HeaderSearchInputField"]') : null);
                    if (input && !input.dataset.ddEnhanced) {
                        input.dataset.ddEnhanced = 'true';
                        input.addEventListener('focus', function() {
                            var h = JSON.parse(GM_getValue(SCRIPT_ID + '_search_history', '[]'));
                            if (h.length > 0) showSearchHistory(input, h);
                        });
                        input.addEventListener('keydown', function(e) {
                            if (e.key === 'Enter' && input.value.trim()) {
                                var h = JSON.parse(GM_getValue(SCRIPT_ID + '_search_history', '[]'));
                                var val = input.value.trim();
                                GM_setValue(SCRIPT_ID + '_search_history', JSON.stringify([val].concat(h.filter(function(x) { return x !== val; })).slice(0, 10)));
                            }
                        });
                    }
                });
            },
            destroy: function() { if (this._obs) this._obs.disconnect(); var el = document.getElementById(SCRIPT_ID + '-search-history'); if (el) el.remove(); }
        },

        // -- VISUAL FLAIR -------------------------------------------------
        {
            key: 'visualFlair',
            name: 'Visual Flair & Animations',
            group: 'Appearance',
            desc: 'Animated badges, card hovers, sparkles, and micro-interactions',
            styleId: SCRIPT_ID + '-flair',
            init: function() {
                injectStyle(this.styleId, visualFlairCSS());
                this._obs = safeObserver(function(node) { applyFlairAttributes(node); });
                applyFlairAttributes(document.body);
            },
            destroy: function() { removeStyle(this.styleId); if (this._obs) this._obs.disconnect(); }
        },
    ];


    // =====================================================================
    //  DARK MODE CSS - Override DoorDash Prism Design Token Variables
    // =====================================================================
    function darkModeCSS() {
        return [
        '.prism-theme.prism-theme,',
        '[data-testid="ThemingWrapper"][data-testid="ThemingWrapper"] {',
        '  --base-color-white:      #111118ff !important;',
        '  --base-color-neutral-0:  #1a1a22ff !important;',
        '  --base-color-neutral-5:  #1e1e28ff !important;',
        '  --base-color-neutral-10: #2a2a35ff !important;',
        '  --base-color-neutral-20: #3a3a45ff !important;',
        '  --base-color-neutral-30: #4a4a55ff !important;',
        '  --base-color-neutral-40: #5a5a65ff !important;',
        '  --base-color-neutral-50: #7a7a85ff !important;',
        '  --base-color-neutral-60: #8a8a95ff !important;',
        '  --base-color-neutral-70: #9a9aa5ff !important;',
        '  --base-color-neutral-80: #b0b0bbff !important;',
        '  --base-color-neutral-90: #c8c8d0ff !important;',
        '  --base-color-neutral-95: #d8d8e0ff !important;',
        '  --base-color-neutral-100: #e8e8f0ff !important;',
        '  --base-color-black:      #ffffffff !important;',
        '  --usage-color-border-default: #2a2a35ff !important;',
        '  --usage-color-border-focused: #e8e8f0a8 !important;',
        '  color-scheme: dark !important;',
        '}',
        'html, body { background-color: #111118 !important; color: #e8e8f0 !important; }',
        'div[style*="background-color: rgb(255, 255, 255)"],',
        'div[style*="background-color: white"],',
        'div[style*="background: white"],',
        'div[style*="background: rgb(255, 255, 255)"] { background-color: #111118 !important; }',
        'div[style*="background-color: rgb(247"],',
        'div[style*="background-color: rgb(248"],',
        'div[style*="background-color: rgb(249"],',
        'div[style*="background-color: rgb(250"],',
        'div[style*="background-color: rgb(251"],',
        'div[style*="background-color: rgb(252"],',
        'div[style*="background-color: rgb(253"],',
        'div[style*="background-color: rgb(254"],',
        'div[style*="background-color: rgb(241"],',
        'div[style*="background-color: rgb(242"],',
        'div[style*="background-color: rgb(243"],',
        'div[style*="background-color: rgb(244"],',
        'div[style*="background-color: rgb(245"] { background-color: #1a1a22 !important; }',
        '::-webkit-scrollbar { width: 10px; height: 10px; }',
        '::-webkit-scrollbar-track { background: #111118; }',
        '::-webkit-scrollbar-thumb { background: #3a3a45; border-radius: 5px; }',
        '::-webkit-scrollbar-thumb:hover { background: #4a4a55; }',
        'img { border-radius: 8px; }',
        '.mapboxgl-map { filter: invert(1) hue-rotate(180deg) brightness(1.1) contrast(0.9) !important; }',
        '.mapboxgl-marker, .mapboxgl-ctrl, .mapboxgl-ctrl-logo, .mapboxgl-popup,',
        '[data-testid="MarkerContainer"], [data-testid="ZoomControl"] {',
        '  filter: invert(1) hue-rotate(180deg) !important;',
        '}',
        ].join('\n');
    }


    // =====================================================================
    //  FEE HIGHLIGHTER
    // =====================================================================
    function feeHighlighterCSS() {
        var s = SCRIPT_ID;
        return [
        '.' + s + '-fee-tag { display:inline-block; font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px; margin-left:6px; vertical-align:middle; letter-spacing:0.3px; }',
        '.' + s + '-fee-tag.platform  { background:rgba(255,80,40,0.15); color:#ff5028; border:1px solid rgba(255,80,40,0.3); }',
        '.' + s + '-fee-tag.delivery  { background:rgba(255,180,0,0.15); color:#e6a200; border:1px solid rgba(255,180,0,0.3); }',
        '.' + s + '-fee-tag.regulatory{ background:rgba(100,100,255,0.15); color:#8888ff; border:1px solid rgba(100,100,255,0.3); }',
        '.' + s + '-fee-tag.tax       { background:rgba(100,200,100,0.15); color:#60c060; border:1px solid rgba(100,200,100,0.3); }',
        ].join('\n');
    }

    var FEE_PATTERNS = [
        { regex: /service\s*fee/i,       type: 'platform',   label: 'PLATFORM FEE' },
        { regex: /delivery\s*fee/i,      type: 'delivery',   label: 'DELIVERY' },
        { regex: /small\s*order\s*fee/i, type: 'platform',   label: 'SMALL ORDER' },
        { regex: /regulatory.*fee/i,     type: 'regulatory', label: 'NOT A TAX' },
        { regex: /chicago\s*fee/i,       type: 'regulatory', label: 'NOT A TAX' },
        { regex: /expanded\s*range/i,    type: 'delivery',   label: 'DISTANCE FEE' },
        { regex: /priority.*fee/i,       type: 'delivery',   label: 'PRIORITY FEE' },
        { regex: /express.*fee/i,        type: 'delivery',   label: 'EXPRESS FEE' },
    ];

    function annotateFees() {
        var lineItems = document.querySelector('[data-testid="LineItems"]');
        if (!lineItems) return;
        lineItems.querySelectorAll('[data-testid]').forEach(function(el) {
            if (el.getAttribute('data-' + SCRIPT_ID + '-tagged')) return;
            var testId = el.getAttribute('data-testid') || '';
            var text = el.textContent || '';
            if (text.length > 300) return;
            for (var i = 0; i < FEE_PATTERNS.length; i++) {
                var p = FEE_PATTERNS[i];
                if (p.regex.test(text) || p.regex.test(testId)) {
                    el.setAttribute('data-' + SCRIPT_ID + '-tagged', 'true');
                    var labelEl = el.querySelector('span') || el;
                    if (!labelEl.querySelector('.' + SCRIPT_ID + '-fee-tag')) {
                        var tag = document.createElement('span');
                        tag.className = SCRIPT_ID + '-fee-tag ' + p.type;
                        tag.textContent = p.label;
                        labelEl.appendChild(tag);
                    }
                    break;
                }
            }
        });
    }


    // =====================================================================
    //  VISUAL FLAIR - Animations & Micro-interactions
    // =====================================================================
    function visualFlairCSS() {
        return [

        // --- KEYFRAME ANIMATIONS ---
        '@keyframes dd-shimmer {',
        '  0% { background-position: -200% center; }',
        '  100% { background-position: 200% center; }',
        '}',
        '@keyframes dd-glow-pulse {',
        '  0%, 100% { box-shadow: 0 0 4px rgba(0,184,148,0.3), 0 0 0px rgba(0,184,148,0); }',
        '  50% { box-shadow: 0 0 8px rgba(0,184,148,0.5), 0 0 20px rgba(0,184,148,0.15); }',
        '}',
        '@keyframes dd-badge-entrance {',
        '  0% { opacity: 0; transform: scale(0.6) translateY(4px); }',
        '  50% { transform: scale(1.08) translateY(-1px); }',
        '  100% { opacity: 1; transform: scale(1) translateY(0); }',
        '}',
        '@keyframes dd-card-entrance {',
        '  from { opacity: 0; transform: translateY(16px); }',
        '  to   { opacity: 1; transform: translateY(0); }',
        '}',
        '@keyframes dd-sparkle {',
        '  0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }',
        '  50% { opacity: 1; transform: scale(1) rotate(180deg); }',
        '}',
        '@keyframes dd-float {',
        '  0%, 100% { transform: translateY(0); }',
        '  50% { transform: translateY(-3px); }',
        '}',
        '@keyframes dd-ring-pulse {',
        '  0% { box-shadow: 0 0 0 0 rgba(255,48,8,0.4); }',
        '  70% { box-shadow: 0 0 0 8px rgba(255,48,8,0); }',
        '  100% { box-shadow: 0 0 0 0 rgba(255,48,8,0); }',
        '}',

        // --- BADGE SHIMMER (Top Dasher, On Time, etc) ---
        '[class*="TagWrapper-sc-"] {',
        '  position: relative;',
        '  animation: dd-badge-entrance 0.5s ease-out both, dd-glow-pulse 3s ease-in-out infinite 1s;',
        '  transition: transform 0.2s ease, box-shadow 0.2s ease;',
        '  overflow: hidden;',
        '}',
        '[class*="TagWrapper-sc-"]::after {',
        '  content: "";',
        '  position: absolute; inset: 0;',
        '  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.2) 60%, transparent 100%);',
        '  background-size: 200% 100%;',
        '  animation: dd-shimmer 3s ease-in-out infinite;',
        '  pointer-events: none;',
        '  border-radius: inherit;',
        '}',
        '[class*="TagWrapper-sc-"]:hover {',
        '  transform: scale(1.08);',
        '  box-shadow: 0 0 12px rgba(0,184,148,0.5), 0 2px 8px rgba(0,0,0,0.2);',
        '}',

        // --- STORE CARDS - Lift & Glow on Hover ---
        '[data-anchor-id="StoreCard"],',
        '[data-testid="card.store"] {',
        '  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),',
        '              box-shadow 0.3s ease !important;',
        '  animation: dd-card-entrance 0.4s ease-out both;',
        '}',
        '[data-anchor-id="StoreCard"]:hover,',
        '[data-testid="card.store"]:hover {',
        '  transform: translateY(-6px) scale(1.02) !important;',
        '  box-shadow: 0 12px 32px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1) !important;',
        '  z-index: 10 !important;',
        '}',

        // --- STORE CARD IMAGE - Subtle Zoom ---
        '[data-anchor-id="StoreCard"] img,',
        '[data-testid="card.store"] img {',
        '  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;',
        '}',
        '[data-anchor-id="StoreCard"]:hover img,',
        '[data-testid="card.store"]:hover img {',
        '  transform: scale(1.06) !important;',
        '}',

        // --- STAGGERED CARD ENTRANCE (applied via JS) ---
        '[data-dd-flair-stagger] { animation-delay: var(--dd-stagger, 0ms); }',

        // --- MENU ITEM CARDS ---
        '[data-testid="GenericItemCard"] {',
        '  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease !important;',
        '  border-radius: 12px;',
        '}',
        '[data-testid="GenericItemCard"]:hover {',
        '  transform: translateX(4px) !important;',
        '  background: var(--usage-color-background-hovered, rgba(0,0,0,0.03)) !important;',
        '}',

        // --- PRICE TEXT GLOW ON HOVER ---
        '[data-testid="GenericItemCard"]:hover [class*="sc-62d4eb3a-10"] {',
        '  text-shadow: 0 0 8px rgba(255,48,8,0.4);',
        '  transition: text-shadow 0.3s ease;',
        '}',

        // --- BUTTONS - Micro Bounce ---
        '[class*="ButtonRoot-sc-"] {',
        '  transition: transform 0.15s ease, box-shadow 0.2s ease !important;',
        '}',
        '[class*="ButtonRoot-sc-"]:hover {',
        '  transform: translateY(-1px) !important;',
        '}',
        '[class*="ButtonRoot-sc-"]:active {',
        '  transform: translateY(1px) scale(0.97) !important;',
        '}',

        // --- CART BUTTON - Pulse Ring ---
        '[data-testid="OrderCartIconButton"] {',
        '  animation: dd-ring-pulse 2.5s ease-in-out infinite;',
        '  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease !important;',
        '}',
        '[data-testid="OrderCartIconButton"]:hover {',
        '  transform: scale(1.08) !important;',
        '  animation: none;',
        '}',

        // --- DASHER PROFILE - Float ---
        '[data-testid="DasherPreferredProfileDetails"] {',
        '  animation: dd-float 4s ease-in-out infinite;',
        '}',

        // --- RATING STARS/VALUES ---
        '[data-testid="DasherPreferredProfileDetails"] [class*="Text-sc-"]:first-child {',
        '  position: relative;',
        '}',

        // --- DELIVERY SECTION - Subtle entrance ---
        '[data-testid="DeliverySection"],',
        '[data-testid="OrderStatusSection"] {',
        '  animation: dd-card-entrance 0.5s ease-out both;',
        '}',

        // --- HERO CAROUSEL ITEMS ---
        '[data-testid="horizontal-linear-content-wrapper"] > * {',
        '  transition: transform 0.3s ease !important;',
        '}',
        '[data-testid="horizontal-linear-content-wrapper"] > *:hover {',
        '  transform: scale(1.04) !important;',
        '}',

        // --- NOTIFICATION BELL - Wiggle on Hover ---
        '[data-testid="HeaderNotificationBellIcon"]:hover svg {',
        '  animation: dd-wiggle 0.5s ease;',
        '}',
        '@keyframes dd-wiggle {',
        '  0%, 100% { transform: rotate(0deg); }',
        '  20% { transform: rotate(12deg); }',
        '  40% { transform: rotate(-10deg); }',
        '  60% { transform: rotate(6deg); }',
        '  80% { transform: rotate(-4deg); }',
        '}',

        // --- SEARCH INPUT - Glow Focus ---
        '[data-anchor-id="HeaderSearchInputField"]:focus {',
        '  box-shadow: 0 0 0 3px rgba(255,48,8,0.2), 0 0 16px rgba(255,48,8,0.1) !important;',
        '  transition: box-shadow 0.3s ease !important;',
        '}',

        // --- SMOOTH SCROLL ---
        'html { scroll-behavior: smooth; }',

        // --- OUR INJECTED HEADER BUTTONS ---
        '#' + SCRIPT_ID + '-hdr-btns button:hover svg {',
        '  transform: rotate(20deg);',
        '  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);',
        '}',
        '#' + SCRIPT_ID + '-btn-dark:hover svg {',
        '  transform: rotate(-20deg) scale(1.1);',
        '}',

        // --- FOOTER LINKS ---
        'footer a, [data-testid="Footer"] a {',
        '  transition: color 0.2s ease, transform 0.2s ease !important;',
        '  display: inline-block;',
        '}',
        'footer a:hover, [data-testid="Footer"] a:hover {',
        '  transform: translateY(-1px) !important;',
        '}',

        ].join('\n');
    }

    function applyFlairAttributes(root) {
        if (!root || !root.querySelectorAll) return;
        // Stagger store card entrances
        var cards = root.querySelectorAll('[data-anchor-id="StoreCard"]:not([data-dd-flair-stagger]), [data-testid="card.store"]:not([data-dd-flair-stagger])');
        cards.forEach(function(card, i) {
            card.setAttribute('data-dd-flair-stagger', 'true');
            card.style.setProperty('--dd-stagger', (i * 60) + 'ms');
        });
        // Stagger menu items
        var items = root.querySelectorAll('[data-testid="GenericItemCard"]:not([data-dd-flair-stagger])');
        items.forEach(function(item, i) {
            item.setAttribute('data-dd-flair-stagger', 'true');
            item.style.setProperty('--dd-stagger', (i * 40) + 'ms');
        });
    }


    // =====================================================================
    //  SEARCH HISTORY
    // =====================================================================
    function showSearchHistory(inputEl, history) {
        var old = document.getElementById(SCRIPT_ID + '-search-history');
        if (old) old.remove();
        var isDark = getSetting('darkMode');
        var bg = isDark ? '#222230' : '#fff';
        var fg = isDark ? '#e0e0e8' : '#333';
        var hoverBg = isDark ? '#2a2a35' : '#f0f0f0';
        var bdr = isDark ? '#3a3a45' : '#ddd';

        var dropdown = document.createElement('div');
        dropdown.id = SCRIPT_ID + '-search-history';
        Object.assign(dropdown.style, {
            position: 'absolute', top: (inputEl.offsetHeight + 4) + 'px', left: '0', right: '0',
            background: bg, border: '1px solid ' + bdr, borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)', zIndex: '99999', maxHeight: '300px', overflowY: 'auto',
        });
        var title = document.createElement('div');
        title.textContent = 'Recent Searches';
        Object.assign(title.style, { padding: '8px 12px', fontSize: '11px', color: '#888', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' });
        dropdown.appendChild(title);
        history.forEach(function(term) {
            var item = document.createElement('div');
            item.textContent = term;
            Object.assign(item.style, { padding: '8px 12px', cursor: 'pointer', fontSize: '14px', color: fg, transition: 'background 0.15s' });
            item.onmouseenter = function() { item.style.background = hoverBg; };
            item.onmouseleave = function() { item.style.background = 'transparent'; };
            item.onclick = function() { inputEl.value = term; inputEl.dispatchEvent(new Event('input', { bubbles: true })); dropdown.remove(); };
            dropdown.appendChild(item);
        });
        var wrapper = inputEl.closest('[data-testid="SearchInput"]') || inputEl.parentElement;
        if (wrapper) { wrapper.style.position = 'relative'; wrapper.appendChild(dropdown); }
        setTimeout(function() {
            document.addEventListener('click', function handler(e) {
                if (!dropdown.contains(e.target) && e.target !== inputEl) { dropdown.remove(); document.removeEventListener('click', handler); }
            });
        }, 100);
    }


    // =====================================================================
    //  PRICE CALCULATOR
    // =====================================================================
    function updatePriceCalc() {
        var subtotal = 0, itemCount = 0;
        var subtotalEl = document.querySelector('[data-testid="Subtotal"]');
        if (subtotalEl) {
            var m = (subtotalEl.textContent || '').match(/\$(\d+\.?\d*)/);
            if (m) { subtotal = parseFloat(m[1]); itemCount = 1; }
        }
        if (itemCount === 0) {
            document.querySelectorAll('[data-testid="GenericItemCard"]').forEach(function(card) {
                var pm = (card.textContent || '').match(/\$(\d+\.?\d*)/);
                if (pm) { subtotal += parseFloat(pm[1]); itemCount++; }
            });
        }
        var calc = document.getElementById(SCRIPT_ID + '-calc');
        if (itemCount === 0) { if (calc) calc.remove(); return; }

        var sf = subtotal * 0.15, df = 3.99, tx = subtotal * 0.10, total = subtotal + sf + df + tx;
        var isDark = getSetting('darkMode');
        var bgC = isDark ? '#1c1c25' : '#fff', fgC = isDark ? '#e0e0e8' : '#333';
        var bc = isDark ? '#2a2a35' : '#e0e0e0', fb = isDark ? 'rgba(255,80,40,0.08)' : 'rgba(255,80,40,0.05)';
        if (!calc) {
            calc = document.createElement('div');
            calc.id = SCRIPT_ID + '-calc';
            Object.assign(calc.style, {
                position: 'fixed', bottom: '80px', right: '20px', zIndex: '99998',
                background: bgC, borderRadius: '12px', padding: '16px', border: '1px solid ' + bc,
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)', minWidth: '220px', fontSize: '13px', color: fgC,
            });
            document.body.appendChild(calc);
        }
        calc.innerHTML =
            '<div style="font-weight:700;font-size:14px;margin-bottom:8px">Estimated Total</div>' +
            '<div style="display:flex;justify-content:space-between;padding:4px 0"><span>Subtotal</span><span>$' + subtotal.toFixed(2) + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;padding:4px 0;color:#ff5028;background:' + fb + ';margin:0 -16px;padding:4px 16px"><span>~Service Fee (15%)</span><span>$' + sf.toFixed(2) + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;padding:4px 0;color:#e6a200"><span>~Delivery</span><span>$' + df.toFixed(2) + '</span></div>' +
            '<div style="display:flex;justify-content:space-between;padding:4px 0"><span>~Tax (10%)</span><span>$' + tx.toFixed(2) + '</span></div>' +
            '<div style="height:1px;background:' + bc + ';margin:8px 0"></div>' +
            '<div style="display:flex;justify-content:space-between;padding:4px 0;font-weight:700;font-size:15px"><span>Grand Total</span><span>$' + total.toFixed(2) + '</span></div>' +
            '<div style="font-size:10px;color:#888;margin-top:8px;text-align:center">Estimates only. Actual fees may vary.</div>';
    }


    // =====================================================================
    //  UTILITIES
    // =====================================================================
    function injectStyle(id, css) {
        removeStyle(id);
        var el = document.createElement('style');
        el.id = id;
        el.textContent = css;
        (document.head || document.documentElement).appendChild(el);
    }
    function removeStyle(id) { var el = document.getElementById(id); if (el) el.remove(); }
    function isStorePage() { return /\/store\//.test(location.pathname); }
    function isCheckoutPage() { return /\/checkout/i.test(location.pathname) || !!document.querySelector('[data-testid="LineItems"]'); }

    function safeObserver(callback) {
        var obs = new MutationObserver(function(mutations) {
            for (var i = 0; i < mutations.length; i++) {
                var added = mutations[i].addedNodes;
                for (var j = 0; j < added.length; j++) {
                    if (added[j].nodeType !== 1) continue;
                    try { callback(added[j]); } catch(e) { /* silent */ }
                }
            }
        });
        if (document.readyState === 'complete') {
            setTimeout(function() { if (document.body) obs.observe(document.body, { childList: true, subtree: true }); }, 200);
        } else {
            window.addEventListener('load', function() {
                setTimeout(function() { if (document.body) obs.observe(document.body, { childList: true, subtree: true }); }, 1000);
            });
        }
        return obs;
    }


    // =====================================================================
    //  SPA NAVIGATION
    // =====================================================================
    function setupSPAHandler() {
        var origPush = history.pushState;
        var origReplace = history.replaceState;
        history.pushState = function() { origPush.apply(this, arguments); window.dispatchEvent(new Event('dd-nav')); };
        history.replaceState = function() { origReplace.apply(this, arguments); window.dispatchEvent(new Event('dd-nav')); };
        window.addEventListener('popstate', function() { window.dispatchEvent(new Event('dd-nav')); });
        window.addEventListener('dd-nav', function() {
            setTimeout(function() {
                features.forEach(function(f) { if (getSetting(f.key) && f.onNavigate) f.onNavigate(); });
                if (getSetting('feeHighlighter')) annotateFees();
            }, 500);
        });
    }


    // =====================================================================
    //  HEADER BUTTONS (injected into the top bar next to notifications)
    //
    //  DoorDash header DOM (store/checkout pages):
    //    <header data-testid="Header">
    //      <div class="...">                              <- flex row
    //        <div>  hamburger  </div>
    //        <div>  logo       </div>
    //        ...address / search...
    //        <div>                                         <- bell wrapper
    //          <div data-testid="NotificationBell">
    //            <button data-testid="HeaderNotificationBellIcon">
    //        </div>
    //        <div style="display:inline-flex">             <- cart wrapper
    //          <button data-testid="OrderCartIconButton">
    //        </div>
    //      </div>
    //    </header>
    //
    //  Homepage has NO <header data-testid="Header"> and no bell,
    //  so we fall back to a fixed top-right pill.
    // =====================================================================

    var MOON_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
    var GEAR_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>';

    function initHeaderButtons() {
        placeHeaderButtons();
        // Re-inject after SPA navigation (React re-renders header)
        window.addEventListener('dd-nav', function() { setTimeout(placeHeaderButtons, 600); });
        // Watch for header appearing after initial React render
        safeObserver(function(node) {
            var existing = document.getElementById(SCRIPT_ID + '-hdr-btns');
            if (existing && document.contains(existing)) return;
            if ((node.matches && node.matches('[data-testid="Header"], header')) ||
                (node.querySelector && node.querySelector('[data-testid="Header"], [data-testid="NotificationBell"]'))) {
                placeHeaderButtons();
            }
        });
    }

    function placeHeaderButtons() {
        var existing = document.getElementById(SCRIPT_ID + '-hdr-btns');
        if (existing && document.contains(existing)) return;
        if (existing) existing.remove();

        var container = document.createElement('div');
        container.id = SCRIPT_ID + '-hdr-btns';

        var darkBtn = document.createElement('button');
        darkBtn.title = 'Toggle Dark Mode';
        darkBtn.setAttribute('aria-label', 'Toggle Dark Mode');
        darkBtn.innerHTML = MOON_SVG;
        darkBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var cur = getSetting('darkMode');
            setSetting('darkMode', !cur);
            var f = features.find(function(feat) { return feat.key === 'darkMode'; });
            if (cur) f.destroy(); else f.init();
        });

        var settingsBtn = document.createElement('button');
        settingsBtn.title = 'Settings (Alt+P)';
        settingsBtn.setAttribute('aria-label', 'DoorDash Enhanced Settings');
        settingsBtn.innerHTML = GEAR_SVG;
        settingsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSettingsPanel();
        });

        container.appendChild(darkBtn);
        container.appendChild(settingsBtn);

        // Strategy 1: Insert before the NotificationBell wrapper div
        var bellEl = document.querySelector('[data-testid="NotificationBell"]');
        if (bellEl && bellEl.parentElement && bellEl.parentElement.parentElement) {
            bellEl.parentElement.parentElement.insertBefore(container, bellEl.parentElement);
            return;
        }

        // Strategy 2: Insert before the cart button wrapper
        var cartEl = document.querySelector('[data-testid="OrderCartIconButton"]');
        if (cartEl) {
            var cartWrapper = cartEl.closest('div[style*="inline-flex"]') || cartEl.parentElement;
            if (cartWrapper && cartWrapper.parentElement) {
                cartWrapper.parentElement.insertBefore(container, cartWrapper);
                return;
            }
        }

        // Strategy 3: Append to the header row
        var header = document.querySelector('[data-testid="Header"]') || document.querySelector('header');
        if (header) {
            var headerRow = header.querySelector(':scope > div') || header;
            headerRow.appendChild(container);
            return;
        }

        // Strategy 4: Fixed top-right fallback (homepage)
        container.classList.add(SCRIPT_ID + '-fixed-fallback');
        document.body.appendChild(container);
    }


    // =====================================================================
    //  SETTINGS PANEL
    // =====================================================================
    function toggleSettingsPanel() {
        var existing = document.getElementById(SCRIPT_ID + '-settings');
        if (existing) { existing.remove(); var bd = document.getElementById(SCRIPT_ID + '-backdrop'); if (bd) bd.remove(); return; }

        var isDark = getSetting('darkMode');
        var bg = isDark ? '#1a1a25' : '#fff';
        var fg = isDark ? '#e0e0e8' : '#333';
        var borderC = isDark ? '#2a2a35' : '#e0e0e0';
        var groupBg = isDark ? '#141420' : '#f8f8f8';
        var rowHov = isDark ? '#222230' : '#f0f0f0';

        var panel = document.createElement('div');
        panel.id = SCRIPT_ID + '-settings';
        Object.assign(panel.style, {
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            background: bg, color: fg, borderRadius: '16px', zIndex: '100000',
            width: '440px', maxHeight: '80vh', overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)', border: '1px solid ' + borderC,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        });

        var hdr = document.createElement('div');
        Object.assign(hdr.style, { padding: '20px 24px', borderBottom: '1px solid ' + borderC, display: 'flex', justifyContent: 'space-between', alignItems: 'center' });
        hdr.innerHTML = '<div><div style="font-size:18px;font-weight:700">DoorDash Enhanced</div><div style="font-size:12px;color:#888;margin-top:2px">v' + VERSION + '</div></div>';
        var closeBtn = document.createElement('button');
        Object.assign(closeBtn.style, { background: 'transparent', border: 'none', color: fg, cursor: 'pointer', fontSize: '24px', padding: '4px 8px', lineHeight: '1' });
        closeBtn.textContent = '\u00D7';
        closeBtn.addEventListener('click', function() { panel.remove(); var bd2 = document.getElementById(SCRIPT_ID + '-backdrop'); if (bd2) bd2.remove(); });
        hdr.appendChild(closeBtn);
        panel.appendChild(hdr);

        var groups = {};
        features.forEach(function(f) { if (!groups[f.group]) groups[f.group] = []; groups[f.group].push(f); });

        var content = document.createElement('div');
        content.style.padding = '16px 24px';

        Object.keys(groups).forEach(function(groupName) {
            var items = groups[groupName];
            var groupEl = document.createElement('div');
            groupEl.style.marginBottom = '16px';
            var titleEl = document.createElement('div');
            Object.assign(titleEl.style, { fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', marginBottom: '8px' });
            titleEl.textContent = groupName;
            groupEl.appendChild(titleEl);

            var box = document.createElement('div');
            Object.assign(box.style, { background: groupBg, borderRadius: '10px', border: '1px solid ' + borderC, overflow: 'hidden' });

            items.forEach(function(f, idx) {
                var row = document.createElement('div');
                Object.assign(row.style, {
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 14px', cursor: 'pointer',
                    borderBottom: idx < items.length - 1 ? '1px solid ' + borderC : 'none',
                    transition: 'background 0.15s',
                });
                row.onmouseenter = function() { row.style.background = rowHov; };
                row.onmouseleave = function() { row.style.background = 'transparent'; };

                var label = document.createElement('div');
                label.style.flex = '1';
                label.innerHTML = '<div style="font-size:14px;font-weight:500">' + f.name + '</div><div style="font-size:11px;color:#888;margin-top:2px">' + f.desc + '</div>';

                var toggle = document.createElement('div');
                toggle.style.cssText = 'flex-shrink:0;margin-left:12px';
                function renderToggle(on) {
                    toggle.innerHTML = '<div style="width:44px;height:24px;border-radius:12px;background:' + (on ? '#ff3008' : '#555') + ';position:relative;transition:background 0.2s">' +
                        '<div style="width:20px;height:20px;border-radius:50%;background:#fff;position:absolute;top:2px;left:' + (on ? '22px' : '2px') + ';transition:left 0.2s;box-shadow:0 1px 3px rgba(0,0,0,0.3)"></div></div>';
                }
                renderToggle(getSetting(f.key));
                row.addEventListener('click', function() {
                    var cur = getSetting(f.key);
                    setSetting(f.key, !cur);
                    renderToggle(!cur);
                    try { if (!cur) f.init(); else f.destroy(); } catch(e) { console.error('[DD Enhanced] ' + f.key + ':', e); }
                });
                row.appendChild(label);
                row.appendChild(toggle);
                box.appendChild(row);
            });
            groupEl.appendChild(box);
            content.appendChild(groupEl);
        });

        var resetBtn = document.createElement('button');
        Object.assign(resetBtn.style, {
            width: '100%', padding: '10px', background: 'transparent',
            border: '1px solid ' + borderC, borderRadius: '8px',
            color: '#ff3008', cursor: 'pointer', fontSize: '13px', fontWeight: '500', margin: '8px 0',
        });
        resetBtn.textContent = 'Reset All Settings';
        resetBtn.addEventListener('click', function() {
            if (confirm('Reset all settings to defaults?')) {
                features.forEach(function(f) { try { f.destroy(); } catch(e) {} setSetting(f.key, DEFAULT_SETTINGS[f.key]); });
                panel.remove(); var bd3 = document.getElementById(SCRIPT_ID + '-backdrop'); if (bd3) bd3.remove();
                location.reload();
            }
        });
        content.appendChild(resetBtn);
        panel.appendChild(content);

        var backdrop = document.createElement('div');
        Object.assign(backdrop.style, { position: 'fixed', inset: '0', background: 'rgba(0,0,0,0.5)', zIndex: '99999' });
        backdrop.id = SCRIPT_ID + '-backdrop';
        backdrop.addEventListener('click', function() { panel.remove(); backdrop.remove(); });
        document.body.appendChild(backdrop);
        document.body.appendChild(panel);
    }


    // =====================================================================
    //  INIT
    // =====================================================================
    function init() {
        injectStyle(SCRIPT_ID + '-core', [
            '#' + SCRIPT_ID + '-hdr-btns {',
            '  display: inline-flex; align-items: center; gap: 2px;',
            '}',
            '#' + SCRIPT_ID + '-hdr-btns button {',
            '  width: 36px; height: 36px; border: none; border-radius: 50%;',
            '  background: transparent; color: var(--usage-color-icon-default, #191919);',
            '  cursor: pointer; display: flex; align-items: center; justify-content: center;',
            '  transition: background 0.15s; padding: 0;',
            '}',
            '#' + SCRIPT_ID + '-hdr-btns button:hover {',
            '  background: var(--usage-color-background-hovered, rgba(0,0,0,0.06));',
            '}',
            '#' + SCRIPT_ID + '-hdr-btns.' + SCRIPT_ID + '-fixed-fallback {',
            '  position: fixed; top: 12px; right: 16px; z-index: 99999;',
            '  background: var(--usage-color-background-elevated-default, #fff);',
            '  border-radius: 20px; padding: 2px 4px;',
            '  box-shadow: 0 2px 8px rgba(0,0,0,0.15);',
            '  border: 1px solid var(--usage-color-border-default, #e4e4e4);',
            '}',
        ].join('\n'));

        features.forEach(function(f) {
            if (getSetting(f.key)) {
                try { f.init(); } catch(e) { console.error('[DD Enhanced] Init ' + f.key + ':', e); }
            }
        });

        setupSPAHandler();
        initHeaderButtons();

        GM_registerMenuCommand('Open Settings', toggleSettingsPanel);
        GM_registerMenuCommand('Toggle Dark Mode', function() {
            var cur = getSetting('darkMode');
            setSetting('darkMode', !cur);
            var f = features.find(function(feat) { return feat.key === 'darkMode'; });
            if (cur) f.destroy(); else f.init();
        });

        console.log('[DoorDash Enhanced] v' + VERSION + ' loaded. Alt+P for settings.');
    }

    init();

})();