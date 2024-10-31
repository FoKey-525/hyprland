export let Loading = (function () {
  // this view polls `anonymox.App.started`. as long as this is not true, it displays a loading spinner
  // with some loading text. once `anonymox.App.started` is true, it checks `anonymox.App.connectionSuccess`.
  // if this is true it hides the loading spinner, if its false it shows a failuremessage

  let container = document.getElementById("loading"),
    failureMsg = document.getElementById("failureMsg");

  function init() {
    container.style.display = "block";
  }

  function stop() {
    // stop the spinner, fadeout container and remove it from dom
    // (removal is sometimes necessary to avoid ghosting elements)

    container.classList.add("fadeout");

    // the fadeout class takes exactly 300ms. change this accordingly to css
    setTimeout(function () {
      container.style.display = "none";
      // container.parentElement.removeChild(container);
    }, 300);
  }

  function displayFailureMsg() {
    failureMsg.style.display = "block";
  }

  init();

  return {
    stop: stop,
    failure: displayFailureMsg
  };
})();