const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
const source = read('DoorDashEnhanced.user.js');
const readme = read('README.md');
const changelog = read('CHANGELOG.md');

const failures = [];
const requireMatch = (value, pattern, description) => {
  const match = value.match(pattern);
  if (!match) failures.push(description);
  return match;
};

const metadataVersion = requireMatch(source, /^\/\/ @version\s+([^\s]+)/m, 'missing userscript @version');
const runtimeVersion = requireMatch(source, /var VERSION\s*=\s*'([^']+)'/, 'missing runtime VERSION');
const readmeVersion = requireMatch(readme, /img\.shields\.io\/badge\/version-([0-9]+\.[0-9]+\.[0-9]+)-blue/, 'missing README version badge');
const changelogVersion = requireMatch(changelog, /^## \[v([0-9]+\.[0-9]+\.[0-9]+)\]/m, 'missing top CHANGELOG version entry');

const versions = [metadataVersion, runtimeVersion, readmeVersion, changelogVersion]
  .filter(Boolean)
  .map((match) => match[1]);
if (versions.some((version) => version !== versions[0])) {
  failures.push(`version mismatch: ${versions.join(', ')}`);
}

const expectedRawUrl = 'https://github.com/SysAdminDoc/Doordash-Enhanced/raw/refs/heads/main/DoorDashEnhanced.user.js';
if (!source.includes(`// @downloadURL  ${expectedRawUrl}`)) failures.push('downloadURL is not pinned to the canonical raw URL');
if (!source.includes(`// @updateURL    ${expectedRawUrl}`)) failures.push('updateURL is not pinned to the canonical raw URL');
if (source.includes('Alt+')) failures.push('legacy Alt keyboard shortcuts are still present');

if (failures.length) {
  console.error('userscript validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`userscript metadata validated (${versions[0]})`);
}
