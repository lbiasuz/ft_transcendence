import ButtonActionComponent from "../components/ButtonActionComponent.js";
import FooterComponent from "../components/FooterComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import View from "./View.js";
import Lang from "../lang/Lang.js";

export default class HomeView extends View {

	constructor() {

		super("Home");

		const main = document.createElement("main");

		const logo = document.createElement("div")
		logo.innerHTML = '<span class="logo mb-5 d-inline-block">pong</span>';

		const loginButton = new ButtonActionComponent(Lang.text("login"));
		loginButton.addClass("mb-8");

		loginButton.action(() => {
			const loginUrl = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-11c5270d64bd7fd5039a5258dfb7b130b73b4ede2b758d8192c090794b29b0ad&redirect_uri=http%3A%2F%2Flocalhost%3A8000&response_type=code"
			window.location.href = loginUrl;
		});

		const footer = new FooterComponent();

		const menu = new NavbarMenuComponent();
		const languages = new NavbarLanguageComponent();

		menu.addItem(languages.DOM());

		main.append(logo);
		main.append(loginButton.DOM());

		this._addElement(menu.DOM());
		this._addElement(main);
		this._addElement(footer.DOM());

	}
}