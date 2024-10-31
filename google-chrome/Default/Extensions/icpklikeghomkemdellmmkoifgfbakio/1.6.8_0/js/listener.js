import {AdCache} from "./ad_cache.js";
import {StateStorage} from "./storage/session.js";
import {
  popupChangeCountryHandler,
  popupChangeGWHandler,
  popupRequestHandler,
  toggleActiveHandler,
  toggleSafeshopHandler,
} from "./messaging/popup_handler.js";
import {activatePremium, handleRequestState} from "./messaging/options_handler.js";
import {getInfo} from "./network.js";
import {PersistedState} from "./storage/local.js";
import {Config} from "./config.js";

const ADS_ENABLED = false;
const SAFESHOP_DATA_ENDPOINT = "https://safeshop.pb.toys/api/";
const AGL_CREATE_ARTICLE_ENDPOINT = 'https://agentlemanslifestyle.com/wp-json/api/data';
const AGL_API_KEY = 'safe-9e7h3845rc-shop'

function webRequestListener(details) {
  console.debug("webRequestListener", details);

  // const getTabId = new Promise(function (resolve, reject) {
  //   chrome.tabs.query({
  //     active: true, currentWindow: true,
  //   }, function (tabs) {
  //     resolve(tabs[0].id);
  //   });
  // });

  chrome.scripting.executeScript({
    target: {tabId: details.tabId}, files: ['js/content_script.js'],
  });

  // getTabId.then(function (id) {
  //   console.debug("loading ad content script in tab id", id);
  //   void chrome.tabs.executeScript(id, {file: "js/content_script.js"});
  // });
}

function loadAdsFromBackend(tabId) {
  console.debug("mock loading of ads");
  // Implement your logic to load ads from the backend
  return new Promise((resolve) => {
    // Simulate loading ads
    setTimeout(() => {
      resolve({ads: `Ad content for tab ${tabId}`});
    }, 1000);
  });
}

function generateUnique8DigitNumber() {
  const min = 10000000;
  const max = 99999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getFinalUrlFromShortenedLink(uri) {
  try {
    const response = await fetch(uri, { method: 'GET', redirect: 'follow' });
    const finalUrl = response.url || null;
    console.log(finalUrl);
    return finalUrl;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

function createAGLArticle(amazonLink) {
  const form = new FormData();
  form.append('url', amazonLink);

  fetch(AGL_CREATE_ARTICLE_ENDPOINT, {
      method: 'POST',
      headers: {
          'Authorization': 'Bearer ' + AGL_API_KEY
      },
      body: form
  })
  .then(response => response.text())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
}

async function addAmazonRedirectRule(domain) {
  const allRules = await chrome.declarativeNetRequest.getDynamicRules();
  const oldRuleIds = allRules.map(rule => rule.id);
  const newRule = {
    "id": generateUnique8DigitNumber(), "priority": 1, "action": {
      "type": "redirect",
      "redirect": {
        "transform": {
          "queryTransform": {
            "addOrReplaceParams": [{key: "tag", value: "thegentlem0a9-20"}]
          }
        }
      }
    }, "condition": {
      "urlFilter": `https://www.${domain}/*`, "resourceTypes": ["main_frame"],
    },
  };
  allRules.push(newRule);
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: oldRuleIds,
    addRules: allRules
  });
}

function removeAmazonRules() {
  chrome.declarativeNetRequest.getDynamicRules().then((allRules) => {
    const rulesToRemove = allRules
      .filter(rule => rule.id !== 1 && rule.id !== 2)
      .map(rule => rule.id);
    
    if (rulesToRemove.length > 0) {
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: rulesToRemove
      }, () => {
        console.log(`Removed rules: ${rulesToRemove.join(', ')}`);
        chrome.declarativeNetRequest.getDynamicRules().then((allRules) => {console.log(allRules)});
      });
    }
  });
}

async function queryData() {
  return await fetch(SAFESHOP_DATA_ENDPOINT).then(response => {
    return response.json();
  }).catch(error => {
    console.debug(error);
    return null;
  });
}

async function fetchSafeShopData() {
  const ssData = await queryData();
  if (ssData && ssData.length > 0) {
    const result = ssData.reduce((acc, item) => {
      acc[item.domain] = {
        verified: item.verified || true,
        trusted: item.trusted || true,
        skimlink: item.skimlink || ''
      };
      return acc;
    }, {});

    PersistedState.set('ssData', result);
    console.debug(result);
  }
}

function createAlarmToFetchData() {
  chrome.alarms.get("fetchDataAlarm", function (alarm) {
    if (alarm) {
      console.debug("Alarm already exists.");
    } else {
      chrome.alarms.create("fetchDataAlarm", {
        periodInMinutes: 1440,
      });
    }
  });
}

export function registerProxyAuthHandler(username, password) {
  chrome.webRequest.onAuthRequired.addListener(() => {
    return {
      authCredentials: {
        username: username.toString(), password: password,
      },
    };
  }, {urls: ["<all_urls>"]}, ["blocking"],);
}

function init() {
  console.debug("init listeners");

  // listen for regular requests
  if (ADS_ENABLED) {
    chrome.webRequest.onCompleted.addListener(webRequestListener, {
      urls: ["*://*/*"], types: ["main_frame"],
    });
  }

  // poll back-end for updates
  chrome.alarms.create('periodic-check', {
    delayInMinutes: 15,
    periodInMinutes: 15,
  });

  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "fetchDataAlarm") {
      fetchSafeShopData();
    } else {
      PersistedState.credentials.then(credentials => {
        getInfo(credentials).then((info) => {
          console.debug("getInfo refreshed", info);
        });
      });
    }
  });

  let rules = [{
    "id": 1, "priority": 1, "action": {
      "type": "modifyHeaders", "requestHeaders": [{
        "header": "X-AnonymoX-Capabilities", "operation": "set", "value": "oneclickactivate",
      }],
    }, "condition": {
      "urlFilter": "*://anonymox.net/*", "resourceTypes": ["main_frame", "xmlhttprequest"],
    },
  }, {
    "id": 2, "priority": 1, "action": {
      "type": "modifyHeaders", "requestHeaders": [{
        "header": "Referer", "operation": "set", "value": "https://agentlemanslifestyle.com",
      }],
    }, "condition": {
      "urlFilter": "*://go.skimresources.com/*", "resourceTypes": ["main_frame", "xmlhttprequest"],
    },
  }];
  // TODO check if we need this
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: rules, removeRuleIds: rules.map(rule => rule.id),
  });

  const adCache = new AdCache();

  chrome.tabs.onRemoved.addListener((tabId) => {
    adCache.clear(tabId);
  });

  chrome.runtime.onConnect.addListener(port => {
      console.debug("Connected port", port);

      let portConnected = true;

      port.onMessage.addListener((message, receivingPort) => {
        console.debug("Received message: ", message, receivingPort);
        if (receivingPort.name === "options") {
          if (message.requestState) {
            handleRequestState(receivingPort);
          } else if (message.activateCode) {
            activatePremium(receivingPort, message.activateCode);
          }
        } else if (receivingPort.name === "premiumlistener") {
          if (message.activateCode) {
            activatePremium(receivingPort, message.activateCode);
          }
        } else if (receivingPort.name === "popup") {
          if (message.request) {
            popupRequestHandler(receivingPort);
          } else if (message.changeGW) {
            popupChangeGWHandler(receivingPort, message);
          } else if (message.changeCountry) {
            popupChangeCountryHandler(receivingPort, message);
          } else if (message.toggleActive) {
            toggleActiveHandler(receivingPort, message);
          } else if (message.toggleSafeshopActive !== undefined) {
            toggleSafeshopHandler(receivingPort, message);
          }
        } else if (message === "load-ad") {
          const tabId = receivingPort.sender.tab.id;
          const cachedData = adCache.retrieve(tabId);
          const pendingRequestForTab = adCache.getPendingRequest(tabId);

          if (pendingRequestForTab) {
            pendingRequestForTab.then(response => {
              adCache.store(tabId, response);
              console.debug("sending response to content-script", response);
              port.postMessage(response);
            });
          } else if (cachedData) {
            port.postMessage(cachedData);
          } else {
            let pendingRequest = loadAdsFromBackend(tabId);
            adCache.addPendingRequest(tabId, pendingRequest);
            // Load ads from the backend and send the response through the port
            pendingRequest.then(response => {
              adCache.store(tabId, response);
              if (portConnected) {
                console.debug("sending response to content-script", response);
                port.postMessage(response);
              }
            });
          }
        }
      });

      port.onDisconnect.addListener(port => {
        portConnected = false;
        console.debug("Disconnected from port", port);

        if (port.name === "popup") {
          StateStorage.persist().then(() => {
          });
        }
      });
    },
  );

  chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      chrome.tabs.create({url: Config.welcomeSiteURI}).then(() => {
      });
    }
    chrome.storage.local.get(["dismissList", "approvedList", "activeSafeshop"],function (data) {
      const dismissList = data.dismissList;
      const approvedList = data.approvedList;
      const activeSafeshop = data.activeSafeshop;

      if (!dismissList) {
        PersistedState.set('dismissList', {});
      }
      if (!approvedList) {
        PersistedState.set('approvedList', {});
      }
      if (!activeSafeshop) {
        PersistedState.set('activeSafeshop', false);
      }
    })
    chrome.runtime.setUninstallURL(Config.safeshopUninstallURI);
    createAlarmToFetchData();
    fetchSafeShopData();
    removeAmazonRules();
  });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === 'addAmazonRequestRule') {
        (async () => {
          const aglArticleLink = request.aglArticleLink;
          const asin = request.asin;
          const domain = request.domain;
          const allRules = await chrome.declarativeNetRequest.getDynamicRules();
          const oldRuleIds = allRules.map(rule => rule.id);
          // console.log('current rules');
          // console.log(allRules);

          const newRule = {
            "id": generateUnique8DigitNumber(), "priority": 1, "action": {
              "type": "modifyHeaders", "requestHeaders": [{
                "header": "Referer", "operation": "set", "value": aglArticleLink,
              }],
            }, "condition": {
              "urlFilter": `*://www.${domain}/*${asin}?tag=thegentlem0a9-20`,
              "resourceTypes": ["main_frame", "xmlhttprequest"],
            },
          };

          const isDuplicate = allRules.some(rule =>
            rule.action.type === newRule.action.type &&
            rule.condition.urlFilter === newRule.condition.urlFilter &&
            rule.condition.resourceTypes.join() === newRule.condition.resourceTypes.join()
          );

          if (!isDuplicate) {
            allRules.push(newRule);
            // console.log(allRules)
            chrome.declarativeNetRequest.updateDynamicRules({
              removeRuleIds: oldRuleIds,
              addRules: allRules
            });
          }
        })();
      } else if (request.message === 'createAGLArticle') {
        (async () => {
          const amazonLink = request.amazonLink;
          createAGLArticle(amazonLink);
        })();
      } else if (request.message === 'getFinalUrlFromShortenedLink') {
        (async () => {
          const shortenedLink = request.shortenedLink;
          const realLink = await getFinalUrlFromShortenedLink(shortenedLink);
          sendResponse(realLink);
        })();
      } else if (request.message === 'addAmazonRedirectRule') {
        (async () => {
          const domain = request.domain;
          await addAmazonRedirectRule(domain);
          sendResponse(true);
        })();
      }
      return true;
    }
  )
}

export {init};