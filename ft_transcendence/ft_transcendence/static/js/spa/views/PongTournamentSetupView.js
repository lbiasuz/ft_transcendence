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
import PongTournamentMatchListView from "./PongTournamentMatchListView.js";

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
        const playerSetup1 = new PlayerSetupComponent(Lang.text("Player") + " 1");
        const playerSetup2 = new PlayerSetupComponent(Lang.text("Player") + " 2");
        const addPlayerButton = new ButtonActionComponent(Lang.text("Add Player"));
        const startTournamentButton = new ButtonActionComponent(Lang.text("Begin Tournament"));

        scoreLimit.addClass("mb-4");
        addPlayerButton.addClass("mt-4", "d-block");
        startTournamentButton.addClass("mt-5");

        startTournamentButton.action(async () => {

            const players = [{
                name: playerSetup1.getPlayerName() || "Player 1",
                color: playerSetup1.getCurrentColor(),
            },
            {
                name: playerSetup2.getPlayerName() || "Player 2",
                color: playerSetup2.getCurrentColor(),
            }];

            this.#extraPlayers.forEach((component, i) => {
                players.push({
                    name: component.getPlayerName() || "Player" + (i + 3),
                    color: component.getCurrentColor(),
                })
            })

            const tournamentConfig = {
                game: 'pong',
                modifiers : {
                    maxScore: scoreLimit.getValue(),
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

            tournamentConfig.matches = matches;
            Router.clearTarget();
            
            (new PongTournamentMatchListView(tournamentConfig)).render();
        });

        const gameSetup = document.createElement("div");
        gameSetup.classList.add("game-setup");

        gameSetup.append(scoreLimit.DOM());
        gameSetup.append(playerSetup1.DOM());
        gameSetup.append(playerSetup2.DOM());
        gameSetup.append(addPlayerButton.DOM());
        gameSetup.append(startTournamentButton.DOM());

        addPlayerButton.DOM().classList.add("with-spacer-top", "center", "muted")

        this.#lastFixedPlayer = playerSetup2;
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

        if (this.#extraPlayers.length >= 3) {
            this.#addPlayerButton.classList.add("d-none");
        }

        this.#updateExtraPlayersIndexes();
    }

    #updateExtraPlayersIndexes() {
        this.#extraPlayers.forEach((player, index) => {
            player.DOM().querySelector("span").textContent = `${Lang.text("Player")} ${index + 3}`;
        });
    }

    #removePlayer(player) {

        const playerIndex = this.#extraPlayers.indexOf(player);
        this.#extraPlayers.splice(playerIndex, 1);

        player.DOM().remove();
        this.#addPlayerButton.classList.remove("d-none");

        this.#updateExtraPlayersIndexes();
    }

}