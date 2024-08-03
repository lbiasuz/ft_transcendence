import ButtonActionComponent from "../components/ButtonActionComponent.js";
import FooterComponent from "../components/FooterComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import PlayerSetupComponent from "../components/PlayerSetupComponent.js";
import ScoreLimitComponent from "../components/ScoreLimitComponent.js";
import SpacerComponent from "../components/SpacerComponent.js";
import Lang from "../lang/Lang.js";
import Router from "../Router.js";
import View from "./View.js";

export default class PongTournamentSetupView extends View {

    #extraPlayers = [];
    #addPlayerButton;
    #lastFixedPlayer;

    constructor() {
        super("Tournament");

        const main = document.createElement("main");
		main.classList.add("text-center");

        const menu = new NavbarMenuComponent();
        menu.withLogo();

		const languages = new NavbarLanguageComponent();
		menu.addItem(languages.DOM());

        const footer = new FooterComponent();

        const title = document.createElement("div");
        title.innerHTML = `<h1>${Lang.text("Tournament")}</h1>`;


        const scoreLimite = new ScoreLimitComponent([5, 7, 10, 15]);
        const playerSetup1 = new PlayerSetupComponent(Lang.text("Player") + " 1");
        const playerSetup2 = new PlayerSetupComponent(Lang.text("Player") + " 2");
        const addPlayerButton = new ButtonActionComponent(Lang.text("Add Player"));
        const startTournamentButton = new ButtonActionComponent(Lang.text("Begin Tournament"));

        startTournamentButton.action(() => {
            Router.navegateTo("/pong-tournament-match-list");
        });

        const gameSetup = document.createElement("div");
        gameSetup.classList.add("game-setup");

        gameSetup.append(scoreLimite.DOM());
        gameSetup.append((new SpacerComponent).DOM());
        gameSetup.append(playerSetup1.DOM());
        gameSetup.append(playerSetup2.DOM());
        gameSetup.append(addPlayerButton.DOM());
        gameSetup.append((new SpacerComponent).DOM());
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