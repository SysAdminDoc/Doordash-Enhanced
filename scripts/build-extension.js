// Generates the unpacked Chrome MV3 build from the userscript.
//
// Everything under extension/ except the icons is generated here, so the
// extension cannot drift from the userscript. `--check` re-derives every file
// and fails if any of them is stale, which is what CI runs.
//
// The @match list is parsed out of the userscript metadata rather than being
// maintained separately: a hand-copied list silently misses any origin added
// to the userscript later.

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, 'DoorDashEnhanced.user.js');
const extensionDir = path.join(root, 'extension');
const checkOnly = process.argv.includes('--check');

const source = fs.readFileSync(sourcePath, 'utf8');

const versionMatch = source.match(/^\/\/ @version\s+([^\s]+)/m);
if (!versionMatch) throw new Error('userscript @version is missing');
const version = versionMatch[1];

const descriptionMatch = source.match(/^\/\/ @description\s+(.+)$/m);
const metadataEnd = source.indexOf('// ==/UserScript==');
if (metadataEnd === -1) throw new Error('userscript metadata block is missing');
const metadataBlock = source.slice(0, metadataEnd);

const matches = (metadataBlock.match(/^\/\/ @match\s+(\S+)/gm) || [])
    .map((line) => line.replace(/^\/\/ @match\s+/, '').trim());
if (!matches.length) throw new Error('userscript declares no @match directives');

const userscriptBody = source.slice(metadataEnd + '// ==/UserScript=='.length).trim();

// GM_* compatibility layer. GM_registerMenuCommand is not a no-op here: the
// userscript registers its whole control surface through it, and a browser
// extension has no userscript-manager menu to surface those in. They are
// recorded and re-exposed to the toolbar popup over chrome.runtime messaging.
const shim = `(function() {
    'use strict';
    var PREFIX = 'dd-enhanced-extension:';
    window.GM_getValue = function(key, fallback) {
        var raw = window.localStorage.getItem(PREFIX + key);
        if (raw === null) return fallback;
        try { return JSON.parse(raw); } catch(e) { return raw; }
    };
    window.GM_setValue = function(key, value) {
        window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    };
    window.GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        (document.head || document.documentElement).appendChild(style);
        return style;
    };
    var menuCommands = [];
    window.GM_registerMenuCommand = function(label, fn) {
        menuCommands.push({ label: String(label), run: fn });
        return menuCommands.length - 1;
    };
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
        chrome.runtime.onMessage.addListener(function(message, sender, respond) {
            if (!message || message.channel !== 'dd-enhanced') return undefined;
            if (message.type === 'list') {
                respond({ commands: menuCommands.map(function(entry) { return entry.label; }) });
                return undefined;
            }
            if (message.type === 'invoke') {
                var entry = menuCommands[message.index];
                if (entry) {
                    try { entry.run(); } catch(e) { console.error('[DD Enhanced] menu command:', e); }
                }
                respond({ ok: !!entry });
                return undefined;
            }
            return undefined;
        });
    }
})();`;

const manifest = {
    manifest_version: 3,
    name: 'DoorDash Enhanced',
    version,
    description: descriptionMatch
        ? descriptionMatch[1].trim().slice(0, 132)
        : 'DoorDash dark mode, fee transparency, checkout automation, and local utilities.',
    icons: {
        16: 'icons/icon16.png',
        32: 'icons/icon32.png',
        48: 'icons/icon48.png',
        128: 'icons/icon128.png',
    },
    action: {
        default_title: 'DoorDash Enhanced',
        default_popup: 'popup.html',
        default_icon: {
            16: 'icons/icon16.png',
            32: 'icons/icon32.png',
            48: 'icons/icon48.png',
            128: 'icons/icon128.png',
        },
    },
    host_permissions: ['https://gist.githubusercontent.com/*'],
    content_scripts: [
        {
            matches,
            js: ['content.js'],
            run_at: 'document_start',
        },
    ],
};

// MV3 forbids inline script, so the popup's behaviour lives in popup.js.
// Inline <style> is still allowed and keeps the build to one fewer file.
const popupHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>DoorDash Enhanced</title>
<style>
  :root { color-scheme: dark; }
  body {
    margin: 0; padding: 12px; width: 260px;
    background: #14161b; color: #edf0f4;
    font: 13px/1.4 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  h1 {
    margin: 0 0 2px; font-size: 13px; font-weight: 700;
    display: flex; align-items: center; gap: 7px;
  }
  h1 img { width: 16px; height: 16px; }
  .version { color: #a2aab7; font-size: 11px; margin: 0 0 10px; }
  #status { color: #a2aab7; font-size: 12px; margin: 0; }
  #commands { display: flex; flex-direction: column; gap: 5px; }
  button {
    text-align: left; padding: 7px 9px; border-radius: 8px; cursor: pointer;
    background: #1b1e25; color: #edf0f4; border: 1px solid #2b303a;
    font: inherit;
  }
  button:hover { background: #21252d; border-color: #3a414d; }
  button:active { background: #2b303a; }
  button:focus-visible { outline: 2px solid #ff8f7a; outline-offset: 1px; }
</style>
</head>
<body>
  <h1><img src="icons/icon32.png" alt=""> DoorDash Enhanced</h1>
  <p class="version" id="version"></p>
  <p id="status">Loading&hellip;</p>
  <div id="commands"></div>
  <script src="popup.js"></script>
</body>
</html>
`;

const popupJs = `// Generated by scripts/build-extension.js. Do not edit directly.
//
// The userscript registers its whole control surface through
// GM_registerMenuCommand. In a userscript manager those appear in the
// manager's menu; here the content-script shim records them and this popup
// lists them, invoking each one back in the page.

const statusEl = document.getElementById('status');
const listEl = document.getElementById('commands');

document.getElementById('version').textContent = 'v' + chrome.runtime.getManifest().version;

function show(message) {
  statusEl.textContent = message;
  statusEl.hidden = false;
}

async function activeTabId() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab ? tab.id : null;
}

function send(tabId, message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve(response);
    });
  });
}

async function render() {
  const tabId = await activeTabId();
  if (tabId === null) return show('No active tab.');

  let response;
  try {
    response = await send(tabId, { channel: 'dd-enhanced', type: 'list' });
  } catch (e) {
    return show('Open a DoorDash tab, then reload it once after installing.');
  }
  const commands = (response && response.commands) || [];
  if (!commands.length) return show('No controls registered yet — reload the page.');

  statusEl.hidden = true;
  listEl.textContent = '';
  commands.forEach((label, index) => {
    const button = document.createElement('button');
    button.textContent = label;
    button.addEventListener('click', async () => {
      try {
        await send(tabId, { channel: 'dd-enhanced', type: 'invoke', index });
        window.close();
      } catch (e) {
        show('Could not reach the page. Reload the DoorDash tab.');
      }
    });
    listEl.appendChild(button);
  });
}

render();
`;

const files = {
    'content.js': '// Generated by scripts/build-extension.js. Do not edit directly.\n'
        + shim + '\n\n' + userscriptBody + '\n',
    'manifest.json': JSON.stringify(manifest, null, 2) + '\n',
    'popup.html': popupHtml,
    'popup.js': popupJs,
};

const requiredIcons = ['icons/icon16.png', 'icons/icon32.png', 'icons/icon48.png', 'icons/icon128.png'];
const missingIcons = requiredIcons.filter((rel) => !fs.existsSync(path.join(extensionDir, rel)));
if (missingIcons.length) throw new Error('extension icons missing: ' + missingIcons.join(', '));

if (checkOnly) {
    const stale = Object.keys(files).filter((name) => {
        const target = path.join(extensionDir, name);
        return !fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== files[name];
    });
    if (stale.length) {
        throw new Error('extension build is out of date (' + stale.join(', ')
            + '); run node scripts/build-extension.js');
    }
    console.log(`extension build is current (${version})`);
} else {
    fs.mkdirSync(extensionDir, { recursive: true });
    Object.keys(files).forEach((name) => {
        fs.writeFileSync(path.join(extensionDir, name), files[name]);
    });
    console.log(`built extension/ (${version}): ` + Object.keys(files).join(', '));
}
