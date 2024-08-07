import ButtonActionComponent from "../components/ButtonActionComponent.js";
import FooterComponent from "../components/FooterComponent.js";
import NavbarAvatarComponent from "../components/NavbarAvatarComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import Context from "../Context.js";
import Lang from "../lang/Lang.js";
import Router from "../Router.js";
import View from "./View.js";
import Match from "../Match.js";

export default class PongFinalScoreView extends View {

    constructor(viewData) {

        super("Final Score");

        const menu = new NavbarMenuComponent();
        menu.withLogo();

		const languages = new NavbarLanguageComponent();
        const avatar = new NavbarAvatarComponent(Context.getItem("user")?.username);

        menu.addItem(avatar.DOM());
		menu.addItem(languages.DOM());

        const base = document.createElement("div");
        base.classList.add("pong-final-score", "align-self-center");

        base.innerHTML = `
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
        const title = document.createElement("h1");
        title.classList.add("mb-5");
        title.textContent =  Lang.text("Final Score");

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
        playAgainButton.addClass("mt-5");

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

            Match.create({
                game: 'pong', // TODO: set game type from game choice pong/pongx
                state: 'created',
                kind: 'rematch',
                modifiers: { 'maxScore': gameConfig.maxScore },
                scoreboard: [{ ...gameConfig.playerOne }, { ...gameConfig.playerTwo }],
            }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                gameConfig.match = data;

                //TODO: refactor this to not be nested
                Match.update(viewData.match.pk, {
                    next_match: gameConfig.match.pk,
                }).then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    Router.navegateTo("/pong", gameConfig);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        })

        const main = document.createElement("main");

        main.append(title);
        main.append(base);
        main.append(playAgainButton.DOM());

        const footer = new FooterComponent();

        this._addElement(menu.DOM());
        this._addElement(main);
        this._addElement(footer.DOM());
    }

}