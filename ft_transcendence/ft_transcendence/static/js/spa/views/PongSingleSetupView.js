import View from "./View.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import FooterComponent from "../components/FooterComponent.js";
import ScoreLimitComponent from "../components/ScoreLimitComponent.js";
import PlayerSetupComponent from "../components/PlayerSetupComponent.js";
import ButtonActionComponent from "../components/ButtonActionComponent.js";
import Router from "../Router.js";
import Lang from "../lang/Lang.js";
import SpacerComponent from "../components/SpacerComponent.js";

export default class PongSingleSetupView extends View {

	constructor() {

        super("Pong Game 1 VS 1");

        const main = document.createElement("main");
		main.classList.add("text-center");

        const menu = new NavbarMenuComponent();
        menu.withLogo();

		const languages = new NavbarLanguageComponent();
		menu.addItem(languages.DOM());

        const title = document.createElement("div");
        title.innerHTML = "<h1>1 VS 1</h1>";

        const footer = new FooterComponent();

        const scoreLimite = new ScoreLimitComponent([5, 10, 15]);
        const playerSetup1 = new PlayerSetupComponent(Lang.text("Player") + " 1");
        const playerSetup2 = new PlayerSetupComponent(Lang.text("Player") + " 2");
        const playButton = new ButtonActionComponent(Lang.text("play"));

        const gameSetup = document.createElement("div");
        gameSetup.classList.add("game-setup");


        playButton.action(() => {

            const gameConfig = {
                maxScore: scoreLimite.getValue(),
                playerOne: {
                    name: playerSetup1.getPlayerName() || "Player 1",
                    color: playerSetup1.getCurrentColor()
                },
                playerTwo: {
                    name: playerSetup2.getPlayerName() || "Player 2",
                    color: playerSetup2.getCurrentColor()
                }
            }

            Router.navegateTo("/pong", gameConfig);
        });

        gameSetup.append(scoreLimite.DOM());
        gameSetup.append((new SpacerComponent()).DOM());
        gameSetup.append(playerSetup1.DOM());
        gameSetup.append(playerSetup2.DOM());
        gameSetup.append((new SpacerComponent()).DOM());
        gameSetup.append(playButton.DOM());

        main.append(title);
        main.append(gameSetup);

        main.style = `
            padding-top: 4em;
        `;

        this._addElement(menu.DOM());
		this._addElement(main);
		this._addElement(footer.DOM())

    }

}
