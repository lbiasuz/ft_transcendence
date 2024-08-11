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
import Match from "../Match.js"
import ConfirmCancelModalComponen from "../components/ConfirmCancelModalComponent.js";
import PongTeamGameView from "./PongTeamGameView.js";
import ToastComponent from "../components/ToastComponent.js";

export default class PongTeamSetupView extends View {

	constructor() {

        super("Pong Game Team VS Team");

        const main = document.createElement("main");

        const menu = new NavbarMenuComponent();
        menu.withLogo();

		const languages = new NavbarLanguageComponent();
        const avatar = new NavbarAvatarComponent(Context.getItem("user")?.username);

        menu.addItem(avatar.DOM());
		menu.addItem(languages.DOM());

        const title = document.createElement("h1");
        title.classList.add("mb-5");
        title.textContent = Lang.text("Team vs Team");

        const footer = new FooterComponent();

        const scoreLimite = new ScoreLimitComponent(Config.matchsScore);
        const teamSetup1 = new PlayerSetupComponent(Lang.text("Team") + " 1", Lang.text("Team Name"));
        const teamSetup2 = new PlayerSetupComponent(Lang.text("Team") + " 2", Lang.text("Team Name"));
        const playButton = new ButtonActionComponent(Lang.text("play"));

        scoreLimite.addClass("mb-4");
        playButton.addClass("mt-4");

        const gameSetup = document.createElement("div");
        gameSetup.classList.add("game-setup");

        playButton.action(async () => {

            const gameConfig = {
                maxScore: scoreLimite.getValue(),
                playerOne: {
                    name: teamSetup1.getPlayerName() || "Team 1",
                    color: teamSetup1.getCurrentColor()
                },
                playerTwo: {
                    name: teamSetup2.getPlayerName() || "Team 2",
                    color: teamSetup2.getCurrentColor()
                }
            }

            const response = await Match.create({
                game: 'pongx',
                state: 'created',
                kind: 'single',
                modifiers: { 'maxScore': gameConfig.maxScore },
                scoreboard: [{ ...gameConfig.playerOne }, { ...gameConfig.playerTwo }],
            })

            if (response.error) {
                const toast = new ToastComponent(Lang.text("match-create-error"));
                toast.show();
                return;
            }

            gameConfig.match = response;
            Router.clearTarget();
            (new PongTeamGameView(gameConfig)).render();

        });

        gameSetup.append(scoreLimite.DOM());
        gameSetup.append(teamSetup1.DOM());
        gameSetup.append(teamSetup2.DOM());
        gameSetup.append(playButton.DOM());

        main.append(title);
        main.append(gameSetup);

        this._addElement(menu.DOM());
		this._addElement(main);
		this._addElement(footer.DOM())

    }

    async _viewCondition() {
        
        const pendentMatchs = await Match.list("game=pongx&state=created&king=single");

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
        const teamOne = match.scoreboard[0];
        const teamTwo = match.scoreboard[1];

        const modalMessage = Lang.text("There is a match that has started but not finished.<br>Do you want to continue this match or start a new one?");
        const confirmText = Lang.text("Continue Match");
        const cancelText = Lang.text("Cancel Match");
        
        const teamOneText = `<span class="color-${teamOne.color} me-2">${teamOne.name}</span>`;
        const teamTwoText = `<span class="color-${teamTwo.color} ms-2">${teamTwo.name}</span>`;

        const modalText = modalMessage + `<br><br>${teamOneText} vs ${teamTwoText}<br>`;

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
                playerOne: {
                    name: teamOne.name,
                    color: teamOne.color
                },
                playerTwo: {
                    name: teamTwo.name,
                    color: teamTwo.color
                }
            }

            modal.hide();
            Router.clearTarget();
            (new PongTeamGameView(gameConfig)).render();

        });

        modal.show();

        return true;

    }

}
