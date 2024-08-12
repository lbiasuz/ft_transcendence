import View from "./View.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import FooterComponent from "../components/FooterComponent.js";
import OptionGroupComponent from "../components/OptionGroupComponent.js";
import PlayerSetupComponent from "../components/PlayerSetupComponent.js";
import ButtonActionComponent from "../components/ButtonActionComponent.js";
import Router from "../Router.js";
import Lang from "../lang/Lang.js";
import { Config } from "../../config.js";
import NavbarAvatarComponent from "../components/NavbarAvatarComponent.js";
import Context from "../Context.js";
import Match from "../Match.js"
import ConfirmCancelModalComponen from "../components/ConfirmCancelModalComponent.js";
import PongGameView from "./PongGameView.js";
import ToastComponent from "../components/ToastComponent.js";
import BackgroundOptionComponent from "../components/BackgrounOptionComponent.js";

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

        const speeds = ["1.0x",  "1.5x", "2.0x"];

        const scoreLimit = new OptionGroupComponent(Config.matchsScore, Lang.text("Score Limit"));
        const gameSpeed = new OptionGroupComponent(speeds, Lang.text("Game Speed"));
        const background = new BackgroundOptionComponent();
        const playerSetup1 = new PlayerSetupComponent(Lang.text("Player") + " 1");
        const playerSetup2 = new PlayerSetupComponent(Lang.text("Player") + " 2");
        const playButton = new ButtonActionComponent(Lang.text("play"));

        scoreLimit.addClass("mb-4");
        gameSpeed.addClass("mb-4");
        background.addClass("mt-3");
        playButton.addClass("mt-5");

        const gameSetup = document.createElement("div");
        gameSetup.classList.add("game-setup");

        playButton.action(async () => {

            const gameConfig = {
                maxScore: scoreLimit.getValue(),
                background: background.selectedBackground(),
                speedModifier: parseFloat(gameSpeed.getValue()),
                playerOne: {
                    name: playerSetup1.getPlayerName() || "Player 1",
                    color: playerSetup1.getCurrentColor()
                },
                playerTwo: {
                    name: playerSetup2.getPlayerName() || "Player 2",
                    color: playerSetup2.getCurrentColor()
                },
            }

            const response = await Match.create({
                game: 'pong',
                state: 'created',
                kind: 'single',
                modifiers: {
                    maxScore: gameConfig.maxScore, 
                    background: gameConfig.background,
                    speedModifier: gameConfig.speedModifier
                },
                scoreboard: [{ ...gameConfig.playerOne }, { ...gameConfig.playerTwo }],
            })

            if (response.error) {
                const toast = new ToastComponent(Lang.text("match-create-error"));
                toast.show();
                return;
            }

            gameConfig.match = response;
            Router.clearTarget();
            (new PongGameView(gameConfig)).render();

        });

        gameSetup.append(scoreLimit.DOM());
        gameSetup.append(gameSpeed.DOM());
        gameSetup.append(playerSetup1.DOM());
        gameSetup.append(playerSetup2.DOM());
        gameSetup.append(background.DOM());
        gameSetup.append(playButton.DOM());

        main.append(title);
        main.append(gameSetup);

        this._addElement(menu.DOM());
		this._addElement(main);
		this._addElement(footer.DOM())

    }

    async _viewCondition() {
        
        const pendentMatchs = await Match.list("game=pong&state=created&king=single");

        if (pendentMatchs.error) {
            const toast = new ToastComponent(Lang.text("page-load-content-error"), "error");
            toast.show();
            Router.navegateTo("/");
            return false;
        }

        if (pendentMatchs.length == 0 ) {
            return true;
        }

        const match = pendentMatchs[0];
        const playerOne = match.scoreboard[0];
        const playerTwo = match.scoreboard[1];

        const modalMessage = Lang.text("There is a match that has started but not finished.<br>Do you want to continue this match or start a new one?");
        const confirmText = Lang.text("Continue Match");
        const cancelText = Lang.text("Cancel Match");
        
        const playerOneText = `<span class="color-${playerOne.color} me-2">${playerOne.name}</span>`;
        const playerTwoText = `<span class="color-${playerTwo.color} ms-2">${playerTwo.name}</span>`;

        const modalText = modalMessage + `<br><br>${playerOneText} vs ${playerTwoText}<br>`;

        const modal = new ConfirmCancelModalComponen(modalText, cancelText, confirmText);

        const toastUpdate = new ToastComponent(Lang.text("match-update-success"));
        const toastUpdateError = new ToastComponent(Lang.text("match-update-error"), "error");

        modal.onCancel(async () => {

            const response = await Match.update(match.pk, {
                state: "canceled"
            })

            if (response.error) {
                toastUpdateError.show();
                return;
            }

            toastUpdate.show();
            modal.hide();
        });

        modal.onConfirm(() => {
            
            const gameConfig = {
                match: match,
                maxScore: match.modifiers.maxScore,
                background: match.modifiers.background || "random",
                speedModifer: match.modifiers.speedModifer || 1,
                playerOne: {
                    name: playerOne.name,
                    color: playerOne.color
                },
                playerTwo: {
                    name: playerTwo.name,
                    color: playerTwo.color
                }
            }

            modal.hide();
            Router.clearTarget();
            (new PongGameView(gameConfig)).render();

        });

        modal.show();

        return true;

    }

}
