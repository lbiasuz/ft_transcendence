import ButtonActionComponent from "../components/ButtonActionComponent.js";
import FooterComponent from "../components/FooterComponent.js";
import NavbarAvatarComponent from "../components/NavbarAvatarComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import Context from "../Context.js";
import Lang from "../lang/Lang.js";
import Router from "../Router.js";
import View from "./View.js";

export default class PongTournamentFinalScoreView extends View {

    #matches;

    constructor(podium) {

        super("Tournament Final Score");

        const menu = new NavbarMenuComponent();
        menu.withLogo();

		const languages = new NavbarLanguageComponent();
        const avatar = new NavbarAvatarComponent(Context.getItem("user")?.username);

        menu.addItem(avatar.DOM());
		menu.addItem(languages.DOM());

        const base = document.createElement("div");
        base.classList.add("pong-final-score", "align-self-center");

        base.innerHTML = `
            <div class="players-score">
                <div class="score-title">
                    <span></span>
                    <span>${Lang.text("Player")}</span>
                    <span>${Lang.text("Wins")}</span>
                </div>
            </div>
        `;

        // Titles
        const title = document.createElement("h1");
        title.classList.add("mb-5");
        title.textContent =  Lang.text("Tournament Final Score");

        // PLayers
        for (let i = 0; i < podium.length; i++) {

            const playerContainer = document.createElement("div");
            playerContainer.classList.add("player");

            const player = podium[i];
            const playerPosition = i + 1;

            playerContainer.innerHTML = `
                <span>#${playerPosition}</span>
                <span class="color-${player.color}">${player.name}</span>
                <span>${player.wins}</span>
            `;

            if (playerPosition === 1) {
                playerContainer.classList.add("player-winner");
                playerContainer.innerHTML = playerContainer.innerHTML + `<i class="winner-flag"></i>`;
            }

            base.querySelector(".players-score").append(playerContainer);
        }

        const playNewTournamentButton = new ButtonActionComponent(Lang.text("Play new tournament"));
        playNewTournamentButton.addClass("mt-5");

        playNewTournamentButton.action(async () => {
            Router.navegateTo("/pong-tournament");
        });

        const main = document.createElement("main");

        main.append(title);
        main.append(base);
        main.append(playNewTournamentButton.DOM());

        const footer = new FooterComponent();

        this._addElement(menu.DOM());
        this._addElement(main);
        this._addElement(footer.DOM());
    }
}
