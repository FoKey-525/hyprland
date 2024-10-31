import {ThriftFetchTransport} from "./network/fetch_transport.js";
import {Thrift} from "./network/thrift.js";
import {Communication} from "./network/ClientService.js";
import {Config} from "./config.js";
import {StateStorage} from "./storage/session.js";
import {updateIconState} from "./ui/icon.js";
import {PersistedState} from "./storage/local.js";
import {ProxyManager} from "./proxy/proxy.js";
import {registerProxyAuthHandler} from "./listener.js";


let transport = new ThriftFetchTransport("https://master.anonymox.net/chrome");
let protocol = new Thrift.Protocol(transport);
let client = new Communication.Client.ClientServiceClient(protocol);

export async function authPing(host) {
  try {
    await fetch(new URL(`authping?gw=${host}`, `http://${host}.${Config.Network.selfCheckDomain}`));
    return true;
  } catch (error) {
    throw error;
  }
}

async function processInfo(info, activeGWId) {
  let gateways = info.gateways;
  let premium = info.premium;

  StateStorage.gateways = gateways;
  StateStorage.isPremium = premium;

  PersistedState.isPremium = premium;

  await updateIconState();

  let gw = ProxyManager.findProxy(gateways, activeGWId);

  let countryFilter = await StateStorage.countryFilter;
  if (countryFilter !== undefined && countryFilter !== "All") {
    if (gw.country !== countryFilter) {
      StateStorage.countryFilter = "All";
    }
  }

  await StateStorage.persist();

  let active = await StateStorage.isActive;
  ProxyManager.setGW(gw, active);

  return info;
}

export async function getInfo(credentials) {
  try {
    let info = await client.Info7(
      credentials.username,
      credentials.password,
      chrome.runtime.getManifest().version,
      "en"
    );

    await processInfo(info, StateStorage.activeGW);

    return info;
  } catch (err) {
    console.debug(err);
  }
}

export async function initialInfoWithProxySetup(username, password, activeGWId) {
  try {
    await ProxyManager.clearProxy();

    let info = await client.Info7(
      username,
      password,
      chrome.runtime.getManifest().version,
      "en"
    );

    registerProxyAuthHandler(username, password);

    await processInfo(info, activeGWId);
  } catch (err) {
    console.log(err);
  }
}

export {client};

