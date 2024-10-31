import {StateStorage} from "../storage/session.js";

export async function changeIcon(state) {
  // change extension icon based on state
  switch (state) {
    case 'disabled':
      await chrome.action.setIcon({
        path: "/design/icon/icon-disabled24.png",
      });
      break;
    case 'off':
      await chrome.action.setIcon({
        path: "/design/icon/icon-off24.png",
      });
      break;
    case 'premium-off':
      await chrome.action.setIcon({
        path: "/design/icon/icon-premium-off24.png",
      });
      break;
    case 'premium-on':
      await chrome.action.setIcon({
        path: "/design/icon/icon-premium24.png",
      });
      break;
    case 'on':
      await chrome.action.setIcon({
        path: "/design/icon/icon24.png",
      });
      break;
    default:
      console.error("anonymox.App.changeIcon: state " + state + " is not supported!");
      break;
  }
}

/**
 *
 * @param {boolean} disabled
 * @returns {Promise<void>}
 */
export async function updateIconState(disabled = false) {
  if (disabled) {
    return changeIcon("disabled");
  }
  const [active, premium] = await Promise.all([
    StateStorage.isActive,
    StateStorage.isPremium,
  ]);

  let iconState = premium ? "premium-" : "";
  if (active) {
    iconState += "on";
  } else {
    iconState += "off";
  }
  await changeIcon(iconState);
}