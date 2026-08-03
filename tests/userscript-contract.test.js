const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.join(__dirname, '..', 'DoorDashEnhanced.user.js'), 'utf8');

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

console.log('userscript contract checks passed');
