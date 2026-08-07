const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'DoorDashEnhanced.user.js'), 'utf8');
const extensionContent = fs.readFileSync(path.join(__dirname, '..', 'extension', 'content.js'), 'utf8');
const extensionManifest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'extension', 'manifest.json'), 'utf8'));
const filterList = fs.readFileSync(path.join(__dirname, '..', 'filters', 'doordash-enhanced.txt'), 'utf8');

const headerVersion = source.match(/@version\s+([0-9]+\.[0-9]+\.[0-9]+)/);
const runtimeVersion = source.match(/var VERSION\s*=\s*'([^']+)'/);
assert.ok(headerVersion, 'userscript metadata must declare a semantic version');
assert.ok(runtimeVersion, 'runtime version must be declared');
assert.equal(headerVersion[1], runtimeVersion[1], 'metadata and settings-panel versions must match');

const featureKeys = [...source.matchAll(/key:\s*'([^']+)'/g)].map((match) => match[1]);
assert.equal(new Set(featureKeys).size, featureKeys.length, 'feature keys must be unique');

const htmlAssignments = [...source.matchAll(/\.innerHTML\s*=\s*([^;]+);/g)].map((match) => match[1].trim());
assert.ok(htmlAssignments.length > 0, 'contract should cover the script HTML insertion paths');
assert.ok(htmlAssignments.every((expression) => expression.startsWith('trustedHTML(')), 'all innerHTML writes must use trustedHTML');
assert.ok(!/\bAlt[+\-]/.test(source), 'Alt keyboard shortcuts must stay removed');
assert.ok(source.includes('function scheduleDomWrite('), 'DOM writes must have an idle/ready scheduling boundary');
assert.ok(source.includes('feature._mountToken'), 'feature mounting must guard against stale scheduled work');
assert.ok(source.includes('scheduledHandle.cancel()'), 'observer teardown must cancel pending idle work');
assert.ok(source.includes("var CSS_BUNDLE_ID = SCRIPT_ID + '-styles';"), 'CSS-only features must share one style bundle');
assert.ok(source.includes('entryMatcher: isCheckoutPage'), 'page-bound features must declare an entry matcher');
assert.ok(source.includes('function registerFeatureMenuCommands()'), 'boolean features must be available from the userscript menu');
assert.ok(source.includes('function runPromoCodeTrial()'), 'promo-code attempts must be explicitly user-triggered');

// The literal-text repaint is the one place the theme reaches past the token
// graph and writes inline styles, so its blast radius is pinned here.
assert.ok(source.includes('var LITERAL_TEXT_SCOPE ='), 'literal-text repaint must declare a bounded container scope');
assert.ok(!/var LITERAL_TEXT_SCOPE\s*=\s*['"]\s*\*?\s*['"]/.test(source), 'literal-text repaint must not scope to the whole document');
assert.ok(/function repaintLiteralText\([\s\S]{0,500}?if \(!getSetting\('darkMode'\)\) return;/.test(source), 'literal-text repaint must be gated on the theme being active');
assert.ok(source.includes('function clearLiteralTextRepaint()'), 'literal-text repaint must be revertible on teardown');
assert.ok(source.includes('clearLiteralTextRepaint();'), 'dark mode teardown must call the literal-text revert');
const themeTokenSheet = source.match(/function themeCSS\(paletteName\)[\s\S]*?\n    \}\n/);
assert.ok(themeTokenSheet, 'theme engine must expose a single palette-driven sheet generator');
assert.ok(!/--base-color-white\s*:/.test(themeTokenSheet[0]), '--base-color-white backs primary-action text and must not be re-pointed');
assert.ok(source.includes('function configuredPromoCodes()'), 'promo codes must come from local user settings');
assert.equal(extensionManifest.version, headerVersion[1], 'companion manifest version must match the userscript');
assert.ok(extensionContent.includes("window.GM_getValue = function"), 'companion build must include the GM_getValue shim');
assert.ok(!extensionContent.includes('// ==UserScript=='), 'companion build must not embed userscript metadata');

// The extension has no userscript-manager menu, so the whole control surface
// reaches the user through the toolbar popup. A no-op GM_registerMenuCommand
// silently drops all of it, which is how it shipped before v2.11.0.
assert.ok(!/window\.GM_registerMenuCommand = function\(\) \{\};/.test(extensionContent),
  'companion build must not stub GM_registerMenuCommand into a no-op');
assert.ok(extensionContent.includes('chrome.runtime.onMessage.addListener'),
  'companion build must expose recorded menu commands to the popup');
assert.equal(extensionManifest.action.default_popup, 'popup.html', 'toolbar action must open the popup');
['16', '32', '48', '128'].forEach((size) => {
  const icon = extensionManifest.icons[size];
  assert.ok(icon, `manifest must declare a ${size}px icon`);
  assert.ok(fs.existsSync(path.join(__dirname, '..', 'extension', icon)), `${icon} must exist on disk`);
});
const popupHtml = fs.readFileSync(path.join(__dirname, '..', 'extension', 'popup.html'), 'utf8');
assert.ok(!/<script(?![^>]*\bsrc=)[^>]*>[\s\S]*?\S[\s\S]*?<\/script>/.test(popupHtml),
  'popup must not use inline script; MV3 CSP blocks it');
assert.ok(!/\son[a-z]+\s*=/.test(popupHtml), 'popup must not use inline event handlers; MV3 CSP blocks them');

// The manifest's match list is derived from the userscript so the two cannot
// drift; a hand-copied list silently misses any origin added later.
const userscriptMatches = [...source.matchAll(/^\/\/ @match\s+(\S+)/gm)].map((m) => m[1]);
assert.deepEqual(extensionManifest.content_scripts[0].matches, userscriptMatches,
  'manifest matches must be derived from the userscript @match directives');
assert.ok(filterList.includes('[data-testid="LegoStandardCarouselContainer"]:has-text(Sponsored)'), 'standalone filter list must cover sponsored carousels');
assert.ok(filterList.includes('[data-testid*="dashpass" i]'), 'standalone filter list must cover DashPass promotions');

console.log('userscript contract checks passed');
