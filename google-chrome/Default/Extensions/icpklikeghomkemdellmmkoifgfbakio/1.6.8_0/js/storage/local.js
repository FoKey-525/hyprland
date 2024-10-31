export const LocalStorage = {
  getAllItems: () => chrome.storage.local.get(),
  getItem: async key => (await chrome.storage.local.get(key))[key],
  setItem: (key, val) => chrome.storage.local.set({[key]: val}),
  removeItems: keys => chrome.storage.local.remove(keys),
};

export const PersistedState = {
  async get(key) {
    const result = await chrome.storage.local.get(key);
    if (result[key] === undefined) {
      throw new Error(`${key} not found`);
    }
    return result[key];
  },
  async set(key, value) {
    try {
      await chrome.storage.local.set({[key]: value});
    } catch (error) {
      throw error;
    }
  },

  get isActiveSafeshop() {
    return this.get("activeSafeshop");
  },
  set isActiveSafeshop(value) {
    return this.set("activeSafeshop", value);
  },

  get credentials() {
    return this.get('credentials');
  },

  set credentials(credentials) {
    return this.set('credentials', credentials);
  },

  get isPremium() {
    return this.get('premium');
  },

  set isPremium(premium) {
    return this.set('premium', premium);
  },
};