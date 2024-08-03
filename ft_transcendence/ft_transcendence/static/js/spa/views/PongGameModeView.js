import View from "./View.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import FooterComponent from "../components/FooterComponent.js";
import ButtonActionComponent from "../components/ButtonActionComponent.js";
import SpacerComponent from "../components/SpacerComponent.js";
import Router from "../Router.js";
import Lang from "../lang/Lang.js";

export default class PongGameModeView extends View {

	constructor() {

        super("Pong Game Mode");

        const main = document.createElement("main");
		main.classList.add("text-center");

        const menu = new NavbarMenuComponent();
        menu.withLogo();

		const languages = new NavbarLanguageComponent();
		menu.addItem(languages.DOM());

        const title = document.createElement("div");
        title.innerHTML = `<h2>${Lang.text("Game Mode")}</h2>`;
        title.querySelector("h2").textContent = Lang.text("Game Mode")

        const footer = new FooterComponent();

        const button1vs1 = new ButtonActionComponent("1 vs 1");
        const buttonTournament = new ButtonActionComponent(Lang.text("tournament"));

        button1vs1.addClass("center","d-block","with-spacer-bottom");

        button1vs1.action(() => {
            Router.navegateTo("/pong-single");
        });

        buttonTournament.action(() => {
            Router.navegateTo("/pong-tournament");
        });

        main.append(title);
        main.append((new SpacerComponent()).DOM());
        main.append(button1vs1.DOM());
        main.append(buttonTournament.DOM());

        main.style = `
            padding-top: 8em;
            padding-bottom: 8em;
        `;

        this._addElement(menu.DOM());
		this._addElement(main);
		this._addElement(footer.DOM())

    }

}
