import BaseComponent from "./Component.js";

export default class NavbarMenuComponent extends BaseComponent {

    #itemsList
    #logo

    constructor() {

        super();

        const base = document.createElement("nav");
        base.classList.add("navbar", "navbar-expand-lg");

        const menuBody = document.createElement("div");
        menuBody.classList.add("container-fluid");

        const itemsList = document.createElement("ul");
        itemsList.classList.add("navbar-nav", "me-auto", "mb-2","mb-lg-0");
        
        const itemsContainer = document.createElement("div");

        const logo = document.createElement("a");
        logo.href = "/";
        logo.textContent = "";
        logo.dataset.link = ""
        logo.classList.add("navbar-brand", "logo");

        itemsContainer.append(itemsList);
        menuBody.append(logo, itemsContainer);

        this.#itemsList = itemsList;
        this.#logo = logo;

        base.append(menuBody);
        this._component = base;
    }

    withLogo() {
        this.#logo.textContent = "PONG"
        return this;
    }

    addItem(item) {
        this.#itemsList.append(item);
        return this;
    }

}