import View from "./View.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import FooterComponent from "../components/FooterComponent.js";
import ButtonActionComponent from "../components/ButtonActionComponent.js";
import Router from "../Router.js";
import Lang from "../lang/Lang.js";
import Context from "../Context.js";
import NavbarAvatarComponent from "../components/NavbarAvatarComponent.js";

export default class PongGameModeView extends View {

	constructor() {

        super("Pong Game Mode");

        const main = document.createElement("main");

        const menu = new NavbarMenuComponent();
        menu.withLogo();

		const languages = new NavbarLanguageComponent();
		const avatar = new NavbarAvatarComponent(Context.getItem("user")?.username);

        menu.addItem(avatar.DOM());
		menu.addItem(languages.DOM());

        const title = document.createElement("div");
        title.innerHTML = `<h2 class="mb-4">${Lang.text("Game Mode")}</h2>`;
        title.querySelector("h2").textContent = Lang.text("Game Mode")

        const footer = new FooterComponent();

        const button1vs1 = new ButtonActionComponent("1 vs 1");
        const buttonTournament = new ButtonActionComponent(Lang.text("tournament"));

        button1vs1.addClass("mx-auto", "mb-2");

        button1vs1.action(() => {
            Router.navegateTo("/pong-single");
        });

        buttonTournament.action(() => {
            Router.navegateTo("/pong-tournament");
        });

        main.append(title);
        main.append(button1vs1.DOM());
        main.append(buttonTournament.DOM());

        this._addElement(menu.DOM());
		this._addElement(main);
		this._addElement(footer.DOM())

    }

}
