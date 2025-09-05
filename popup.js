// ✅ Correct Miniblox default logo
const DEFAULT_LOGO = "https://miniblox.io/assets/miniblox-Dj36hMhG.png";

const applyBtn = document.getElementById('applyBtn');
const resetBtn = document.getElementById('resetBtn');

applyBtn.addEventListener('click', () => {
  const file = document.getElementById('fileInput').files[0];
  const url = document.getElementById('urlInput').value.trim();

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      chrome.storage.local.set({ logoSrc: reader.result }, () => {
        sendUpdate(reader.result);
        applyBtn.textContent = "Done!";
        setTimeout(() => applyBtn.textContent = "Apply", 1500);
      });
    };
    reader.readAsDataURL(file);
  } else if (url) {
    chrome.storage.local.set({ logoSrc: url }, () => {
      sendUpdate(url);
      applyBtn.textContent = "Done!";
      setTimeout(() => applyBtn.textContent = "Apply", 1500);
    });
  }
});

resetBtn.addEventListener('click', () => {
  chrome.storage.local.set({ logoSrc: DEFAULT_LOGO }, () => {
    sendUpdate(DEFAULT_LOGO);
    resetBtn.textContent = "Reset!";
    setTimeout(() => resetBtn.textContent = "Reset to Default", 1500);
  });
});

function sendUpdate(src) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "updateLogo", src });
  });
}