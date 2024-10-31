export class GatewayList {
  constructor() {
    this.identityContainer = document.getElementById("identity-select");
    this.idList = this.identityContainer.getElementsByTagName("ul")[0];

    this.gateways = [];
    this.countryFilter = null;
  }

  setCountryFilter(country) {
    this.countryFilter = country;
  }

  addGateway(gateway) {
    this.gateways.push(gateway);
  }

  setActive(gateway) {
    for (const li of this.idList.children) {
      if (li.getAttribute("data-gwid") === gateway.id) {
        li.classList.add("active");
        li.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      } else {
        li.classList.remove("active");
      }
    }
  }

  build(port) {
    this.port = port;

    this.idList.innerHTML = "";
    for (const gateway of this.gateways) {
      if (this.countryFilter === null
        || this.countryFilter === "All"
        || gateway.country === this.countryFilter) {
        console.log("displaying", this.countryFilter, gateway.id);
        let li = document.createElement("li");
        li.textContent = gateway.id;
        li.setAttribute("data-gwid", gateway.id);

        li.addEventListener("click", () => {
          port.postMessage({
            changeGW: gateway,
          });
        });

        this.idList.appendChild(li);

      }
    }
  }
}