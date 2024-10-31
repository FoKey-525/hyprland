import {LocalStorage} from "./local.js";

export const SessionStorage = {
  getAllItems: () => chrome.storage.session.get(),
  getItem: async key => (await chrome.storage.session.get(key))[key],
  setItem: (key, val) => chrome.storage.session.set({[key]: val}),
  removeItems: keys => chrome.storage.session.remove(keys),
};

export const StateStorage = {
  async get(key) {
    try {
      const result = await chrome.storage.session.get(key);
      return result[key];
    } catch (error) {
      throw error;
    }
  },
  async set(key, value) {
    try {
      await chrome.storage.session.set({[key]: value});
    } catch (error) {
      throw error;
    }
  },
  get isActive() {
    return this.get("active");
  },
  set isActive(value) {
    return this.set("active", value);
  },
  get isPremium() {
    return this.get("premium");
  },
  set isPremium(value) {
    return this.set("premium", value);
  },
  get activeGW() {
    return this.get("activeGW");
  },
  set activeGW(value) {
    return this.set("activeGW", value);
  },
  get countryFilter() {
    return this.get("countryFilter");
  },
  set countryFilter(value) {
    return this.set("countryFilter", value);
  },
  get gateways() {
    return this.get("gateways");
  },
  set gateways(value) {
    return this.set("gateways", value);
  },
  async persist() {
    const [active, premium, countryFilter, activeGW] = await Promise.all([
      this.isActive,
      this.isPremium,
      this.countryFilter,
      this.activeGW,
    ]);

    await Promise.all([
      LocalStorage.setItem("active", active),
      // LocalStorage.setItem("premium", premium),
      LocalStorage.setItem("countryFilter", countryFilter),
      LocalStorage.setItem("activeGW", activeGW),
    ]);
  },
  async unpersist() {
    return LocalStorage.getAllItems().then(items => {
      if (items.active === undefined) {
        this.isActive = false;
      } else {
        this.isActive = items.active;
      }
      this.countryFilter = items.countryFilter;
      this.activeGW = items.activeGW;
    });
  },
};