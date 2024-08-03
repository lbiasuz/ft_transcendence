import ButtonActionComponent from "../components/ButtonActionComponent.js";
import FooterComponent from "../components/FooterComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import Router from "../Router.js";
import View from "./View.js";
import Lang from "../lang/Lang.js";

export default class HomeView extends View {

	constructor() {

		super("Home");

		const main = document.createElement("main");
		main.classList.add("text-center");

		const logo = document.createElement("div")
		logo.classList.add("logo-login");
		logo.innerHTML = '<span class="logo">pong</span>';

		const loginButton = new ButtonActionComponent(Lang.text("login"));
		loginButton.addClass("btn-login");

		loginButton.action(() => {
			Router.navegateTo("/pong-mode");
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