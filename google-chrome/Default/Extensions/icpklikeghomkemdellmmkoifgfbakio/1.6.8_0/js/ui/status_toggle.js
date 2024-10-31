export class StatusToggle {
  constructor(port) {
    this.port = port;
    this.statusToggle = document.getElementById("status");
    this.statusText = document.getElementById("status-text");
    this.safeShopToggle = document.getElementById("safeshop");
    this.safeShopText = document.getElementById("safeshop-text");

    this.statusToggle.addEventListener("click", ev => {
      this.port.postMessage({toggleActive: true});
    });

    this.safeShopToggle.addEventListener("click", ev => {
      this.port.postMessage({toggleSafeshopActive: this.safeShopToggle.checked});
    });
  }

  /**
   * @param {boolean} state
   */
  setVpnActive(state) {
    if (state) {
      this.statusToggle.checked = true;
      this.statusText.innerText = "Active";
    } else {
      this.statusToggle.checked = false;
      this.statusText.innerText = "Inactive";
    }
  }

  setSafeshopActive(state) {
    if (state) {
      this.safeShopToggle.checked = true;
      this.safeShopText.innerText = "Safeshop Active";
    } else {
      this.safeShopToggle.checked = false;
      this.safeShopText.innerText = "Safeshop Inactive";
    }
  }

  displaySafeshopToggle(state) {
    if (state) {
      this.safeShopToggle.closest('.toggle-button-area').classList.remove('hidden');
    } else {
      this.safeShopToggle.closest('.toggle-button-area').classList.add('hidden');
    }
  }
}