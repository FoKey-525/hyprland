import {StateStorage} from "../storage/session.js";
import {authPing} from "../network.js";

export let ProxyManager = {
  setProxy: function (gw) {
    let host = gw.tls ? gw.tlsHostname : gw.ip;
    let port = gw.port;
    let proxyType = gw.tls ? "HTTPS": "PROXY";
    const pacScriptConfigSc = {
      mode: 'pac_script',
      pacScript: {
        data: `function FindProxyForURL(url, host) {
          if (dnsDomainIs(host, ".sc.nwi.anonymox.net")) {
            return "${proxyType} ${host}:${port}";
          } else {
            return "DIRECT";
          }
        }`
      }
    };

    let scRunner = new Promise((resolve, reject) => {
      chrome.proxy.settings.set({value: pacScriptConfigSc, scope: 'regular'}, async () => {
        try {
          await authPing(gw.id);
          resolve();
        } catch (error) {
          reject(error);
        }
      })
    });

    scRunner.then(() => {
      const pacScriptConfig = {
        mode: 'pac_script',
        pacScript: {
          data: `function FindProxyForURL(url, host) {
          // Convert host to lowercase for case-insensitive matching
          host = host.toLowerCase();
      
          // Exact matches and wildcards
          if (isPlainHostName(host) ||
            dnsDomainIs(host, "anonymox.net") ||
            dnsDomainIs(host, "curopayments.net") ||
            dnsDomainIs(host, "fritz.box") ||
            dnsDomainIs(host, "easy.box") ||
            dnsDomainIs(host, ".spotilocal.com") ||
            host === "127.0.0.1") {
            return "DIRECT";
          }
      
          // IP address patterns
          if (/^(192\\.168\\.|10\\.|100\\.(6[4-9]|[7-9]\\d|1[0-1]\\d|12[0-7])\\.|172\\.(1[6-9]|2\\d|3[0-1])\\.|192\\.0\\.0\\.|198\\.1[89]\\.)/.test(host)) {
            return "DIRECT";
          }
          return "${proxyType} ${host}:${port}";
        }`
        }
      };
      chrome.proxy.settings.set({value: pacScriptConfig, scope: 'regular'}, () => {
      });
    }).catch(reason => {
      if (reason instanceof TypeError) {
        // handle network error
      }
    });
  },
  setGW: function (gw, active) {
    StateStorage.activeGW = gw.id;
    if (active) {
      this.setProxy(gw);
    }
  },
  clearProxy: async () => {
    return chrome.proxy.settings.clear({scope: 'regular'});
  },
  findProxy: function (gateways, activeGWId) {
    let gw = gateways.find(({id}) => id === activeGWId);
    // TODO find proper GW
    if (gw === undefined) {
      gw = gateways[0];
    }
    return gw;
  },
  filterProxyByCountry: function (selectedCountry) {
    return StateStorage.gateways.then(gateways => {
      if (selectedCountry !== undefined && selectedCountry !== "All") {
        return gateways.find(({country}) => country === selectedCountry);
      } else {
        return StateStorage.activeGW.then(activeGW => {
          return this.findProxy(gateways, activeGW);
        });
      }
    });
  },
};