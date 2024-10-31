import {PersistedState} from "../storage/local.js";
import {compareWithCurrentVersion, versionLessThanThreshold} from "./version_compare.js";

export function createOffscreen() {
  return chrome.offscreen.createDocument({
    url: chrome.runtime.getURL("js/helper/offscreen.html"),
    reasons: [chrome.offscreen.Reason.LOCAL_STORAGE],
    justification: "migration of mv2 settings",
  });
}

// resolves promise with credentials, if we update from a mv2 extension version
function onInstalledHandler(resolve, reject) {
  return async (details) => {
    console.debug("onInstalled", details);
    if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
      if (compareWithCurrentVersion(details.previousVersion)) {
        console.debug("versions same or downgraded", details);
        return;
      }
      // upgrade from below threshold
      if (versionLessThanThreshold(details.previousVersion, "1.5.0")) {
        console.debug("upgrade from below version 1.5.0");
        // enable port communication to offscreen document
        chrome.runtime.onConnect.addListener(port => {
          // TODO extract and remove later
          port.onMessage.addListener((message) => {
            if (port.name === "offscreen") {
              console.log("upgrade port message", port, message);
              resolve(parseLocalStorage(message));
            }
          });
        });
        await createOffscreen();
      }
    }
    // reject if we did not update extension
    reject();
  };
}

// promise resolving in the onInstalled handler
export let updateCheck = new Promise((resolve, reject) => {
  chrome.runtime.onInstalled.addListener(onInstalledHandler(resolve, reject));
});

export function parseLocalStorage(message) {
  if (message.localStorage !== null) {
    if (message.localStorage.options !== null) {
      // { username: "", passwordPlain: "" }
      let options = JSON.parse(message.localStorage.options);
      let credentials = {username: options.username, password: options.passwordPlain};
      console.debug("persisting credentials to", credentials);
      PersistedState.credentials = credentials;
      return credentials;
    }
  }
}