export class AdCache {
  constructor() {
    this.cache = {};
    this.pendingRequests = {};
  }

  store(tabId, data) {
    this.cache[tabId] = data;
  }

  retrieve(tabId) {
    return this.cache[tabId];
  }

  addPendingRequest(tabId, promise) {
    // if (!this.pendingRequests[tabId]) {
    //     this.pendingRequests[tabId] = [];
    // }
    // this.pendingRequests[tabId].push(resolve);
    this.pendingRequests[tabId] = promise;
    promise.then(() => {
      delete this.pendingRequests[tabId];
    });
  }

  hasPendingRequest(tabId) {
    return tabId in this.pendingRequests;
  }

  getPendingRequest(tabId) {
    return this.pendingRequests[tabId];
  }

  clear(tabId) {
    delete this.cache[tabId];
    delete this.pendingRequests[tabId];
  }

  clearAll() {
    this.cache = {};
    this.pendingRequests = {};
  }
}