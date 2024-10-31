export class CountryList {
  constructor() {
    this.countrySelect = document.getElementById("country-select");
    this.countrySelectSelected = this.countrySelect.getElementsByClassName("select-selected")[0];
    this.countrySelectItems = this.countrySelect.getElementsByClassName("select-items")[0];
    this.countries = new Set();
    this.selectedCountry = "All";

    if (!this.countrySelectSelected.hasAttribute("data-listening")) {
      this.countrySelectSelected.setAttribute("data-listening", true);
      this.countrySelectSelected.addEventListener("click", e => {
        e.stopPropagation();
        this.toggleDropDown(e);
      });
    }
  }

  addCountry(country) {
    this.countries.add(country);
  }

  setSelected(country) {
    this.selectedCountry = country;
  }

  build(port) {
    this.port = port;

    this.countrySelectItems.innerHTML = "";
    this.#addItem("All");
    for (const country of this.countries) {
      this.#addItem(country);
    }
    if (this.selectedCountry !== "") {
      console.log("this.countrySelectSelected", this.countrySelectSelected);

      this.countrySelectSelected.innerHTML = "";
      let flag = this.#makeFlag(this.selectedCountry);
      this.countrySelectSelected.appendChild(flag);
      let label = document.createElement("div");
      label.innerText = this.selectedCountry;
      this.countrySelectSelected.appendChild(label);
    }
  }

  #makeFlag(country) {
    let flag = document.createElement("img");
    if (country === "All") {
      flag.src = `design/flags/world.png`;
    } else {
      flag.src = `design/flags/${country}.png`;
    }
    return flag;
  }

  #addItem(country) {
    let selectItem = document.createElement("div");
    selectItem.classList.add("select-item");
    let flag = this.#makeFlag(country);
    selectItem.appendChild(flag);
    let label = document.createElement("div");
    label.innerText = country;
    selectItem.appendChild(label);

    if (this.port) {
      selectItem.addEventListener("click", e => {
        this.port.postMessage({
          changeCountry: country,
        });
      });
    }
    this.countrySelectItems.appendChild(selectItem);
  }

  toggleDropDown(e) {
    if (e.target === this.countrySelectSelected ||
      this.countrySelectSelected.classList.contains("select-arrow-active")
    ) {
      this.countrySelectItems.classList.toggle("select-hide");
      this.countrySelectSelected.classList.toggle("select-arrow-active");
    }
  }
}