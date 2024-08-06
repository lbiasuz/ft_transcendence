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
			fetch("/ping").then((response) => {
				let href = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-6f60df1067aebb00d90db164bd83b278dbf2aacef540c58a5ba333fe86119504&redirect_uri=http%3A%2F%2Flocalhost%2Fsso&response_type=code"
				if (response.status !== 200) window.location.href = href
				else Router.navegateTo("/pong-mode");
			})
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