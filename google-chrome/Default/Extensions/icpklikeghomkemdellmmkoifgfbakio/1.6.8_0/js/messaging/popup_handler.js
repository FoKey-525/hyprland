import {StateStorage} from "../storage/session.js";
import {ProxyManager} from "../proxy/proxy.js";
import {updateIconState} from "../ui/icon.js";
import {PersistedState} from "../storage/local.js";

export function popupRequestHandler(receivingPort) {
  Promise.all([
    StateStorage.countryFilter,
    StateStorage.gateways,
    StateStorage.activeGW,
    StateStorage.isActive,
    StateStorage.isPremium,
    PersistedState.isActiveSafeshop,
  ])
    .then(([
             countryFilter,
             gateways,
             activeGWId,
             activeState,
             isPremium,
             isActiveSafeshop,
           ]) => {
      if (gateways === undefined) {
        receivingPort.postMessage({error: "loading"});
        return;
      }
      let activeGW = gateways.find(({id}) => id === activeGWId);
      let response = {
        countryFilter: countryFilter,
        gateways: gateways,
        activeGW: activeGW,
        isActive: activeState,
        isPremium: isPremium,
        isActiveSafeshop: isActiveSafeshop,
      };
      receivingPort.postMessage(response);
    });
}

export function popupChangeGWHandler(receivingPort, message) {
  let gw = message.changeGW;
  StateStorage.activeGW = gw.id;
  StateStorage.isActive.then(active => {
    ProxyManager.setGW(gw, active);
  });
  receivingPort.postMessage({
    activeGW: gw,
  });
}

export function popupChangeCountryHandler(receivingPort, message) {
  StateStorage.countryFilter = message.changeCountry;

  ProxyManager.filterProxyByCountry(message.changeCountry).then(gw => {
    StateStorage.isActive.then(active => {
      ProxyManager.setGW(gw, active);
    });

    receivingPort.postMessage({
      countryFilter: message.changeCountry,
      activeGW: gw,
    });
  });
}

export function toggleActiveHandler(receivingPort, message) {
  StateStorage.isActive.then(currentActiveState => {
    let newActiveState = !currentActiveState;
    StateStorage.isActive = newActiveState;

    if (newActiveState) {
      return Promise.all([StateStorage.activeGW, StateStorage.gateways])
        .then(([activeGWId, gateways]) => {
          let gw = ProxyManager.findProxy(gateways, activeGWId);
          return ProxyManager.setGW(gw, newActiveState);
        }).then(() => newActiveState);
    } else {
      return ProxyManager.clearProxy().then(() => newActiveState);
    }
  }).then(newActiveState => {
    return updateIconState().then(() => newActiveState);
  }).then(newActiveState => {
    receivingPort.postMessage({
      isActive: newActiveState,
    });
  });
}

export function toggleSafeshopHandler(receivingPort, message) {
  PersistedState.isActiveSafeshop = message.toggleSafeshopActive;
  receivingPort.postMessage({
    isActiveSafeshop: message.toggleSafeshopActive,
  });
}