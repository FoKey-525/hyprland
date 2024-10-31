import {PersistedState} from "../storage/local.js";

export function compareVersions(version1, version2) {
  const v1Parts = version1.split('.').map(Number);
  const v2Parts = version2.split('.').map(Number);
  const maxLength = Math.max(v1Parts.length, v2Parts.length);

  for (let i = 0; i < maxLength; i++) {
    const v1 = v1Parts[i] || 0;
    const v2 = v2Parts[i] || 0;

    if (v1 > v2) return 1;
    if (v1 < v2) return -1;
  }

  return 0;
}

/**
 * returns true if version < threshold
 * @param version
 * @param threshold
 * @returns {boolean}
 */
export function versionLessThanThreshold(version, threshold) {
  return compareVersions(version, threshold) < 0;
}

/**
 * returns true if current version <= other version
 * @param otherVersion
 * @returns {boolean}
 */
export function compareWithCurrentVersion(otherVersion) {
  let currentVersion = chrome.runtime.getManifest().version;
  return compareVersions(currentVersion, otherVersion) <= 0;
}

export function updateStoredVersion() {
  return PersistedState.set("version", chrome.runtime.getManifest().version);
}

export function getStoredVersion() {
  return PersistedState.get("version");
}