import {init} from "./listener.js";
import {StateStorage} from "./storage/session.js";
import {updateIconState} from "./ui/icon.js";
import {updateCheck} from "./helper/storage_migration.js";
import {compareVersions, getStoredVersion, updateStoredVersion} from "./helper/version_compare.js";
import {loadCredentialsAndGateway} from "./network/state_initialization.js";
import {initialInfoWithProxySetup} from "./network.js";
import {ProxyManager} from "./proxy/proxy.js";

ProxyManager.clearProxy().then(() => {
  console.debug("cleared proxy");
});

// manifest v2 did not store version string, so we enable migration path
updateIconState(true)
  .then(() => getStoredVersion())
  .then(persistedVersion => {
    console.debug("LocalStorage version:", persistedVersion, chrome.runtime.getManifest().version);
    // changed version
    if (compareVersions(persistedVersion, chrome.runtime.getManifest().version) !== 0) {
      return updateStoredVersion();
    }
  }).catch(async () => {
  // if we can not find the version string, try to run migrate old settings
  await updateStoredVersion();
  return updateCheck;
}).then(migratedCredentials => {
  console.debug("migratedCredentials", migratedCredentials);
  return migratedCredentials;
}).catch(error => {
  console.debug("Error in updateCheck:", error);
  // no need to handle this further
}).finally(() => {
  console.debug("finally, load credentials and state");

  StateStorage.unpersist()
    .then(() => loadCredentialsAndGateway())
    .then(async ([credentials, activeGWId]) => {
      let username = credentials.username;
      let password = credentials.password;

      await initialInfoWithProxySetup(username, password, activeGWId);
    });
});

init();
