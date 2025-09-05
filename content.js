chrome.storage.local.get('logoSrc', ({ logoSrc }) => {
  if (logoSrc) {
    updateLogo(logoSrc);
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "updateLogo") {
    updateLogo(message.src);
  }
});

function updateLogo(src) {
  // Exact match for current Miniblox logo element
  const logo = document.querySelector('img.chakra-image.css-1je8qb9');
  if (logo) {
    logo.src = src;
  }
}