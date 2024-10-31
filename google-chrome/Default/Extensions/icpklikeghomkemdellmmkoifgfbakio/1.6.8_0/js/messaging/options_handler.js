import {StateStorage} from "../storage/session.js";
import {PersistedState} from "../storage/local.js";
import {client, getInfo} from "../network.js";
import {Communication} from "../network/client_types.js";

export function handleRequestState(receivingPort) {
  Promise.all([
    StateStorage.isPremium,
    PersistedState.credentials,

  ]).then(([
             premium, credentials,
           ]) => {
    receivingPort.postMessage({
      premium: premium,
      userId: credentials.username,
      extVersion: chrome.runtime.getManifest().version,
      browserInfo: "y",
    });
  });
  // chrome.runtime.getPlatformInfo().then(platformInfo => {
  //   console.log(platformInfo);
  // });
}

export function activatePremium(port, code) {
  PersistedState.credentials.then(credentials => {
    client.ActivatePremium(
      code,
      credentials.username,
      credentials.password,
      "en",  // TODO get from browser
    ).then(res => {
      console.debug(res);
      getInfo(credentials).then(() => {
        handleRequestState(port);
      });
    }, error => {
      console.debug(error);
      if (error instanceof Communication.Client.GenericException2) {
        port.postMessage({
          activateError: error.xmessage,
        });
      }
    });
  });
}