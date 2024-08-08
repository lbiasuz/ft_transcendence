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
<<<<<<< Updated upstream
import Match from "../Match.js"
=======
import Match from "../Match.js";
>>>>>>> Stashed changes

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



        const toastSuccess = document.createElement("div");
        toastSuccess.classList.add("toast", "align-items-center", "border-0", "position-fixed", "bottom-0", "end-0", "success");
        toastSuccess.role = "alert";
        toastSuccess.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                Partida criada com sucesso em seu histórico.
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;

        const toastError = document.createElement("div");
        toastError.classList.add("toast", "align-items-center", "border-0", "position-fixed", "bottom-0", "end-0", "success");
        toastError.role = "alert";
        toastError.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                Error ao criar partida em seu histórico.
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;


        document.querySelector("body")?.append(toastSuccess);
        document.querySelector("body")?.append(toastError);

        /**
         * 
         * <div class="toast align-items-center text-bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                Hello, world! This is a toast message.
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            </div>
         * 
         * 
         */


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

<<<<<<< Updated upstream
            Match.create({
                game: 'pong', // TODO: set game type from game choice pong/pongx
                state: 'created',
                kind: 'single',
                modifiers: { 'maxScore': gameConfig.maxScore },
                scoreboard: [{ ...gameConfig.playerOne }, { ...gameConfig.playerTwo }],
            }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                gameConfig.match = data;
                Router.navegateTo("/pong", gameConfig);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
=======

            // const del = await Match.delete("2").then(response => response.status);
            // console.log(del);

            const list = await Match.list("?state=created&kind=single").then(response => response.json());
            console.log(list);

            // await Match.create({
            //     'game': 'pong', // TODO: set game type from game choice pong/pongx
            //     'state': 'created',
            //     'kind': 'single',
            //     'modifiers': { 'maxScore': gameConfig.maxScore },
            //     'scoreboard': [{ ...gameConfig.playerOne }, { ...gameConfig.playerTwo }],
            // })
            // .then(response => response.json())
            // .then(() => {

            //     // Router.navegateTo("/pong", gameConfig);
            //     const toast = new bootstrap.Toast(toastSuccess);
            //     toast.show();

            // })
            // .catch(() => {
            //     const toast = new bootstrap.Toast(toastError);
            //     toast.show();
            // });

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

            // Router.navegateTo("/pong", gameConfig);
>>>>>>> Stashed changes
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
