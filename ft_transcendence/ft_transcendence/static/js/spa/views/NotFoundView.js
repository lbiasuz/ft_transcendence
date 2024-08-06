import FooterComponent from "../components/FooterComponent.js";
import NavbarAvatarComponent from "../components/NavbarAvatarComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import Context from "../Context.js";
import View from "./View.js";

export default class NotFoundView extends View {

    constructor() {

        super("Not Found");

        const main = document.createElement("main");

        const menu = new NavbarMenuComponent();
        menu.withLogo();

		const languages = new NavbarLanguageComponent();

        if (Context.getItem("user")) {
            const avatar = new NavbarAvatarComponent(Context.getItem("user")?.username);
            menu.addItem(avatar.DOM());
        }

		menu.addItem(languages.DOM());

        const errorMessage = document.createElement("div");
        errorMessage.classList.add("not-found");

        errorMessage.innerHTML = "<h1>404</h1><span>Page not found</span>";

        const footer = new FooterComponent();

        main.append(errorMessage);

        this._addElement(menu.DOM());
        this._addElement(main);
        this._addElement(footer.DOM());
    }
}