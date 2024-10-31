let buttonEl = document.getElementById("activateBtn");

if (buttonEl) {
  let port = chrome.runtime.connect({name: "premiumlistener"});

  buttonEl.addEventListener("click", function () {
    port.postMessage({
      activateCode: buttonEl.getAttribute("param1"),
    });
  });
}