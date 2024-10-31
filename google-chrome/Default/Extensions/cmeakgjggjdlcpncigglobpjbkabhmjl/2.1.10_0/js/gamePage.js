const cssGamePage = document.createElement('link');
cssGamePage.href = chrome.runtime.getURL('js/siteExt/gamePage.css');
cssGamePage.rel = 'stylesheet';
cssGamePage.type = 'text/css';
(document.head || document.documentElement).prepend(cssGamePage);

var sGameBundle = document.createElement('script');
sGameBundle.src = chrome.runtime.getURL('js/siteExt/gamePage.bundle.js');
(document.head || document.documentElement).appendChild(sGameBundle);
sGameBundle.onload = function () {
  var sGame = document.createElement('script');
  sGame.src = chrome.runtime.getURL('js/gamePage.script.js');
  (document.head || document.documentElement).appendChild(sGame);
  sGame.onload = function () {
    sGame.parentNode.removeChild(sGame);
  };

  sGameBundle.parentNode.removeChild(sGameBundle);
};

var actualCode = [`window.SIHID = '${chrome.runtime.id}';`].join('\r\n');

document.documentElement.setAttribute('onreset', actualCode);
document.documentElement.dispatchEvent(new CustomEvent('reset'));
document.documentElement.removeAttribute('onreset');
