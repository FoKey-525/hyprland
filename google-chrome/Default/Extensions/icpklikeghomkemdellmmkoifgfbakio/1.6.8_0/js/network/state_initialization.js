import {LocalStorage, PersistedState} from "../storage/local.js";
import {StateStorage} from "../storage/session.js";
import {client} from "../network.js";

function requestAndPrepareCredentials(activeGWId) {
  return client.GetAccount2().then(
    userCredentials => {
      let username = userCredentials.user;
      let password = userCredentials.passwordPlain;
      let credentials = {username: username, password: password};
      PersistedState.credentials = credentials;
      return [credentials, activeGWId];
    },
  ).catch(error => console.error(error));
}

// requests new credentials if not persisted, join return with active gateway
export function loadCredentialsAndGateway() {
  return Promise.all([
    LocalStorage.getItem("credentials"),
    StateStorage.activeGW,
  ]).then(([credentials, activeGWId]) => {
    if (credentials !== undefined) {
      return [credentials, activeGWId];
    } else {
      return requestAndPrepareCredentials(activeGWId);
    }
  }).catch(error => console.error(error));
}
