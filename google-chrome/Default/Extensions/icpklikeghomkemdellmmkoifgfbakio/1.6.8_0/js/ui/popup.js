import {CountryList} from "./country_list.js";
import {GatewayList} from "./gateway_list.js";
import {StatusToggle} from "./status_toggle.js";
import {Loading} from "./loading.js";

console.debug("popup loaded");

// open port for tab change messages
let port = await chrome.runtime.connect({name: "popup"});
console.debug("port connected");

let cL = new CountryList();
let gwList = new GatewayList();
let statusToggle = new StatusToggle(port);
let loading = Loading;

document.getElementById("status").onclick = function () {
  console.debug("toggle button is clicked");
};

port.onMessage.addListener(handleMessage);
port.postMessage({request: ["load-all"]});

function handleMessage(message, sender) {
  console.debug("popup msg:", message, sender);

  if (message.error === undefined) {
    loading.stop();
  } else {
    setTimeout(() => {
      port.postMessage({request: ["load-all"]});
    }, 100);
    return;
  }

  if (message.gateways) {
    message.gateways.forEach(gateway => {
      gwList.addGateway(gateway);
      cL.addCountry(gateway.country);
    });

    gwList.build(port);
    cL.build(port);
  }

  if (message.countryFilter) {
    let countryFilter = message.countryFilter;
    cL.setSelected(countryFilter);
    cL.build(port);
    gwList.setCountryFilter(countryFilter);
    gwList.build(port);
  }

  if (message.activeGW) {
    let activeGW = message.activeGW;
    gwList.setActive(activeGW);
  }

  if (message.isActive !== undefined) {
    statusToggle.setVpnActive(message.isActive);
  }

  if (message.isPremium !== undefined) {
    statusToggle.displaySafeshopToggle(message.isPremium);
  }

  if (message.isActiveSafeshop !== undefined) {
    statusToggle.setSafeshopActive(message.isActiveSafeshop);
  }
}


document.addEventListener("click", e => {
  // let cL = new CountryList();
  cL.toggleDropDown(e);
});