import ButtonActionComponent from "../components/ButtonActionComponent.js";
import FooterComponent from "../components/FooterComponent.js";
import NavbarAvatarComponent from "../components/NavbarAvatarComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import Context from "../Context.js";
import Lang from "../lang/Lang.js";
import View from "./View.js";
import Router from "../Router.js";

export default class PongTournamentMatchListView extends View {

    constructor(viewData) {

        super("Tournament Match List");

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
        title.textContent = Lang.text("Tournament Match List");

        const base = document.createElement("div");
        base.classList.add("match-list", "mb-5");

        base.innerHTML = `
            <div class="list-title">
                <span>${Lang.text("Player")}</span>
                <span class="sep">VS</span>
                <span>${Lang.text("Player")}</span>
            </div>
        `;

        const nextMatchButton = new ButtonActionComponent(Lang.text("Play Next Match"));
        nextMatchButton.action(() => {

            const match = viewData.matches.find((match) => match.started_at == null);

            const gameConfig = {
                maxScore: match.modifiers.maxScore,
                background: match.modifiers.background,
                speedModifier: match.modifiers.speedModifier,
                playerOne: {
                    name: match.scoreboard[0].name,
                    color: match.scoreboard[0].color
                },
                playerTwo: {
                    name: match.scoreboard[1].name,
                    color: match.scoreboard[1].color
                },
                match: match
            }

            Router.viewTo("/pong-game", gameConfig);
        });

        let nextMatchDefined = false;
        for (const match of viewData.matches) {
            const listItem = document.createElement("div");
            listItem.classList.add("list-item");

            if (match.started_at == null && nextMatchDefined == false) {
                listItem.classList.add("next");
                nextMatchDefined = true;
            }
           
            listItem.innerHTML = `
                <span class="color-${match.scoreboard[0].color}">${match.scoreboard[0].name}</span>
                <span class="sep">${(listItem.classList.contains("next"))? Lang.text("Next") : ""}</span>
                <span class="color-${match.scoreboard[1].color}">${match.scoreboard[1].name}</span>
            `;

            base.append(listItem);
        }

        main.append(title);
        main.append(base);

        let podium = {};

        if (nextMatchDefined = true) {
            main.append(nextMatchButton.DOM());
        } else {
            viewData.matches.forEach(element => {
                if (element.scoreboard[0].name in podium) {
                    podium[element.scoreboard[0].name] += +element.scoreboard[0].score;
                } else {
                    podium[element.scoreboard[0].name] = +element.scoreboard[0].score;
                }
                if (element.scoreboard[1].name in podium) {
                    podium[element.scoreboard[1].name] += +element.scoreboard[1].score;
                } else {
                    podium[element.scoreboard[1].name] = +element.scoreboard[1].score;
                }
            });
            let sortable = [];
            for (var player in podium) {
                sortable.push([player, podium[player]]);
            }
            sortable.sort(function(a, b) {
                return a[1] - b[1];
            });
            
            const backButton = new ButtonActionComponent(sortable[0][0]);
            backButton.action(() => { Router.navegateTo("/")})

            main.append(backButton.DOM());
        }

        this._addElement(menu.DOM());
		this._addElement(main);
        this._addElement(footer.DOM())

    }

}