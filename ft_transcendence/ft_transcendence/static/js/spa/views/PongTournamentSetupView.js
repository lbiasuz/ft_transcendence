import { Config } from "../../config.js";
import ButtonActionComponent from "../components/ButtonActionComponent.js";
import FooterComponent from "../components/FooterComponent.js";
import NavbarAvatarComponent from "../components/NavbarAvatarComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import PlayerSetupComponent from "../components/PlayerSetupComponent.js";
import OptionGroupComponent from "../components/OptionGroupComponent.js";
import Context from "../Context.js";
import Lang from "../lang/Lang.js";
import Router from "../Router.js";
import View from "./View.js";
import Match from "../Match.js";
import ConfirmCancelModalComponen from "../components/ConfirmCancelModalComponent.js";
import ToastComponent from "../components/ToastComponent.js";

export default class PongTournamentSetupView extends View {

    #extraPlayers = [];
    #addPlayerButton;
    #lastFixedPlayer;

    constructor() {

        super("Tournament");

        const main = document.createElement("main");

        const menu = new NavbarMenuComponent();
        menu.withLogo();

		const languages = new NavbarLanguageComponent();
        const avatar = new NavbarAvatarComponent(Context.getItem("user")?.username);

        menu.addItem(avatar.DOM());
		menu.addItem(languages.DOM());

        const footer = new FooterComponent();

        const title = document.createElement("h1");
        title.classList.add("mb-5");
        title.textContent = Lang.text("Tournament");

        const scoreLimit = new OptionGroupComponent(Config.matchsScore, Lang.text("Score Limit"));
        const gameSpeed = new OptionGroupComponent(Config.speeds, Lang.text("Game Speed"));
        const playerSetup1 = new PlayerSetupComponent(Lang.text("Player") + " 1");
        const playerSetup2 = new PlayerSetupComponent(Lang.text("Player") + " 2");
        const playerSetup3 = new PlayerSetupComponent(Lang.text("Player") + " 3");
        const addPlayerButton = new ButtonActionComponent(Lang.text("Add Player"));
        const startTournamentButton = new ButtonActionComponent(Lang.text("Begin Tournament"));

        scoreLimit.addClass("mb-4");
        gameSpeed.addClass("mb-4");
        addPlayerButton.addClass("mt-4", "d-block");
        startTournamentButton.addClass("mt-5");

        startTournamentButton.action(async () => {

            const players = [
                {
                    name: playerSetup1.getPlayerName() || (Lang.text("Player") + " 1"),
                    color: playerSetup1.getCurrentColor(),
                },
                {
                    name: playerSetup2.getPlayerName() || (Lang.text("Player") + " 2"),
                    color: playerSetup2.getCurrentColor(),
                },
                {
                    name: playerSetup3.getPlayerName() || (Lang.text("Player") + " 3"),
                    color: playerSetup3.getCurrentColor(),
                }
            ];

            this.#extraPlayers.forEach((component, i) => {
                players.push({
                    name: component.getPlayerName() || (Lang.text("Player") + " " + (i + 4)),
                    color: component.getCurrentColor(),
                })
            })

            const tournamentConfig = {
                game: 'pong',
                modifiers : {
                    maxScore: scoreLimit.getValue(),
                    speedModifier: parseFloat(gameSpeed.getValue()),
                },
                scoreboard: players
            }

            const response = await Match.tournament_create(tournamentConfig)

            if (response.error) {
                const toast = new ToastComponent(Lang.text("match-create-error"), "error");
                toast.show();
                return;
            }

            const matches = await Match.list("tournament_uuid=".concat(response.tournament_uuid));

            if (matches.error) {
                const toast = new ToastComponent(Lang.text("match-create-error"), "error");
                toast.show();
                return false;
            }

            Router.viewTo("/pong-tournament-match-list", matches);
        });

        const gameSetup = document.createElement("div");
        gameSetup.classList.add("game-setup");

        gameSetup.append(scoreLimit.DOM());
        gameSetup.append(gameSpeed.DOM());
        gameSetup.append(playerSetup1.DOM());
        gameSetup.append(playerSetup2.DOM());
        gameSetup.append(playerSetup3.DOM());
        gameSetup.append(addPlayerButton.DOM());
        gameSetup.append(startTournamentButton.DOM());

        addPlayerButton.DOM().classList.add("with-spacer-top", "center", "muted")

        this.#lastFixedPlayer = playerSetup3;
        this.#addPlayerButton = addPlayerButton.DOM();

        addPlayerButton.action(() => {
            this.#addPlayer();
        });

        main.append(title);
        main.append(gameSetup);

        this._addElement(menu.DOM());
		this._addElement(main);
		this._addElement(footer.DOM())

    }

    #addPlayer() {

        const player = new PlayerSetupComponent("");
        player.withCloseButton(() => {
            this.#removePlayer(player);
        });

        if (this.#extraPlayers.length === 0) {
            this.#lastFixedPlayer.DOM().after(player.DOM());
        }

        if (this.#extraPlayers.length > 0) {
            const lastIndex = this.#extraPlayers.length - 1;
            const lastItem = this.#extraPlayers[lastIndex];
            lastItem.DOM().after(player.DOM());
        }

        this.#extraPlayers.push(player);

        if (this.#extraPlayers.length >= 2) {
            this.#addPlayerButton.classList.add("d-none");
        }

        this.#updateExtraPlayersIndexes();
    }

    #updateExtraPlayersIndexes() {
        this.#extraPlayers.forEach((player, index) => {
            player.DOM().querySelector("span").textContent = `${Lang.text("Player")} ${index + 4}`;
        });
    }

    #removePlayer(player) {

        const playerIndex = this.#extraPlayers.indexOf(player);
        this.#extraPlayers.splice(playerIndex, 1);

        player.DOM().remove();
        this.#addPlayerButton.classList.remove("d-none");

        this.#updateExtraPlayersIndexes();
    }

    async _viewCondition() {

        const pendentMatchs = await Match.list("game=pong&state=created&kind=tournament");

        if (pendentMatchs.error) {
            const toast = new ToastComponent(Lang.text("page-load-content-error"), "error");
            toast.show();
            Router.navegateTo("/");
            return false;
        }

        if (pendentMatchs.length == 0 ) {
            return true;
        }

        const tournament_uuid = pendentMatchs[0].tournament_uuid;

        const matches = await Match.list("tournament_uuid=".concat(tournament_uuid));

        if (matches.error) {
            const toast = new ToastComponent(Lang.text("match-create-error"), "error");
            toast.show();
            return false;
        }

        const modalMessage = Lang.text("existing-tournament-msg");
        const confirmText = Lang.text("Continue Tournament");
        const cancelText = Lang.text("Cancel Tournament");

        const modal = new ConfirmCancelModalComponen(modalMessage, cancelText, confirmText);

        const toastUpdate = new ToastComponent(Lang.text("match-update-success"));
        const toastUpdateError = new ToastComponent(Lang.text("match-update-error"), "error");

        modal.onCancel(async () => {

            const response = await Match.delete(matches[0].pk);

            if (response.error) {
                toastUpdateError.show();
                return;
            }

            toastUpdate.show();
            modal.hide();
        });

        modal.onConfirm(async () => {

            modal.hide();
            Router.viewTo("/pong-tournament-match-list", matches);

        });

        modal.show();

        return true;
    }

}