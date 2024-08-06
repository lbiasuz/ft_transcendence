import View from "./View.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import FooterComponent from "../components/FooterComponent.js";
import ScoreLimitComponent from "../components/ScoreLimitComponent.js";
import PlayerSetupComponent from "../components/PlayerSetupComponent.js";
import ButtonActionComponent from "../components/ButtonActionComponent.js";
import Router from "../Router.js";
import Lang from "../lang/Lang.js";
import { Config } from "../../config.js";
import NavbarAvatarComponent from "../components/NavbarAvatarComponent.js";
import Context from "../Context.js";

export default class PongSingleSetupView extends View {

	constructor() {

        super("Pong Game 1 VS 1");

        const main = document.createElement("main");

        const menu = new NavbarMenuComponent();
        menu.withLogo();

		const languages = new NavbarLanguageComponent();
        const avatar = new NavbarAvatarComponent(Context.getItem("user")?.username);

        menu.addItem(avatar.DOM());
		menu.addItem(languages.DOM());

        const title = document.createElement("h1");
        title.classList.add("mb-5");
        title.textContent = "1 VS 1";

        const footer = new FooterComponent();

        const scoreLimite = new ScoreLimitComponent(Config.matchsScore);
        const playerSetup1 = new PlayerSetupComponent(Lang.text("Player") + " 1");
        const playerSetup2 = new PlayerSetupComponent(Lang.text("Player") + " 2");
        const playButton = new ButtonActionComponent(Lang.text("play"));

        scoreLimite.addClass("mb-4");
        playButton.addClass("mt-4");

        const gameSetup = document.createElement("div");
        gameSetup.classList.add("game-setup");

        playButton.action(async () => {

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

            // console.log("Sending request to create match");
            // await fetch("/match/", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "X-CSRFToken": document.cookie.split('=')[1]
            //     },
            //     body: JSON.stringify({
            //         'game': 'pong', // TODO: set game type from game choice pong/pongx
            //         'state': 'created',
            //         'kind': 'single',
            //         'modifiers': { 'maxScore': gameConfig.maxScore },
            //         'scoreboard': [{ ...gameConfig.playerOne }, { ...gameConfig.playerTwo }],
            //     }),
            //     cookie: document.cookie,
            //     credentials: "same-origin"
            // }).then(response => response.json())
            // .then(data => {
            //     console.log('Success:', data);
            // })
            // .catch((error) => {
            //     console.error('Error:', error);
            // });

            Router.navegateTo("/pong", gameConfig);
        });

        gameSetup.append(scoreLimite.DOM());
        gameSetup.append(playerSetup1.DOM());
        gameSetup.append(playerSetup2.DOM());
        gameSetup.append(playButton.DOM());

        main.append(title);
        main.append(gameSetup);

        this._addElement(menu.DOM());
        // this._addElement(title);
		this._addElement(main);
		this._addElement(footer.DOM())

    }

}
