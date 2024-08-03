import ButtonActionComponent from "../components/ButtonActionComponent.js";
import FooterComponent from "../components/FooterComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import Lang from "../lang/Lang.js";
import Router from "../Router.js";
import View from "./View.js";

export default class PongFinalScoreView extends View {

    constructor(viewData) {

        super("Final Score");

        const menu = new NavbarMenuComponent();
        menu.withLogo();

		const languages = new NavbarLanguageComponent();
		menu.addItem(languages.DOM());

        const base = document.createElement("div");
        base.classList.add("pong-final-score", "align-self-center");

        base.innerHTML = `
            <h1></h1>

            <div class="config-information">
                <span id="duration"></span>
                <span id="score-limit"></span>
            </div>

            <div class="players-score">
            <div class="score-title">
                <span></span>
                <span id="playerTitle"></span>
                <span id="scoreTitle"></span>
            </div>
            <div class="player player-winner">
                <span>#1</span>
                <span id="firstPlaceName"></span>
                <span id="firstPlaceScore"></span>
                <i class="winner-flag"></i>
            </div>
            <div class="player">
                <span>#2</span>
                <span id="secondPlaceName"></span>
                <span id="secondPlaceScore"></span>
            </div>
        `;

        // Titles
        base.querySelector("h1").textContent = Lang.text("Final Score");
        base.querySelector("#playerTitle").textContent = Lang.text("Player");
        base.querySelector("#scoreTitle").textContent = Lang.text("Score");

        // Duration
        base.querySelector("#duration").textContent = `${Lang.text("Duration")}: ${viewData.duration}`;

        // Score Limit
        base.querySelector("#score-limit").textContent = `${Lang.text("Score Limit")}: ${viewData.maxScore}`;

        // PLayers
        base.querySelector("#firstPlaceName").textContent = viewData.firstPlace.name;
        base.querySelector("#firstPlaceName").classList.add("color-" + viewData.firstPlace.color);
        base.querySelector("#firstPlaceScore").textContent = viewData.firstPlace.score;
        base.querySelector("#secondPlaceName").textContent = viewData.secondPlace.name;
        base.querySelector("#secondPlaceName").classList.add("color-" + viewData.secondPlace.color);
        base.querySelector("#secondPlaceScore").textContent = viewData.secondPlace.score;

        const playAgainButton = new ButtonActionComponent(Lang.text("Play Again"));
        playAgainButton.action(() => {

            const gameConfig = {
                maxScore: viewData.maxScore,
                playerOne: {
                    name: viewData.firstPlace.name,
                    color: viewData.firstPlace.color,
                },
                playerTwo: {
                    name: viewData.secondPlace.name,
                    color: viewData.secondPlace.color,
                }
            }

            Router.navegateTo("/pong", gameConfig);
        })

        const main = document.createElement("main");
        main.classList.add("text-center");

        main.append(base);
        main.append(playAgainButton.DOM());
        main.style = `
            margin-top: 8em;
        `;

        const footer = new FooterComponent();

        this._addElement(menu.DOM());
        this._addElement(main);
        this._addElement(footer.DOM());
    }

}