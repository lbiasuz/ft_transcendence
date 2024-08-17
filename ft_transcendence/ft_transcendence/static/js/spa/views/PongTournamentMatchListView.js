import ButtonActionComponent from "../components/ButtonActionComponent.js";
import FooterComponent from "../components/FooterComponent.js";
import NavbarAvatarComponent from "../components/NavbarAvatarComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import Context from "../Context.js";
import Lang from "../lang/Lang.js";
import View from "./View.js";
import Router from "../Router.js";
import Match from "../Match.js";

export default class PongTournamentMatchListView extends View {


    constructor(matches) {

        super("Tournament Match List");

        matches.sort((a, b) => a.pk - b.pk)

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
        const nextMatch = matches.find((match) => match.started_at == null);

        nextMatchButton.action(() => {
            const gameConfig = {
                maxScore: nextMatch?.modifiers.maxScore,
                background: nextMatch?.modifiers.background,
                speedModifier: nextMatch?.modifiers.speedModifier,
                playerOne: {
                    name: nextMatch?.scoreboard[0].name,
                    color: nextMatch?.scoreboard[0].color
                },
                playerTwo: {
                    name: nextMatch?.scoreboard[1].name,
                    color: nextMatch?.scoreboard[1].color
                },
                match: nextMatch
            }
            Router.viewTo("/pong-game", gameConfig);
        });

        const podium = new Map()

        //fill podium
        for (const match of matches) {
            const playerOne = match.scoreboard[0];
            const playerTwo = match.scoreboard[1];
            podium.set(playerOne.name, {name: playerOne.name, color: playerOne.color, wins: 0});
            podium.set(playerTwo.name, {name: playerTwo.name, color: playerTwo.color, wins: 0});
        }

        //add players to podium
        for (const match of matches) {

            const playerOne = match.scoreboard[0];
            const playerTwo = match.scoreboard[1];

            if (playerOne.score === undefined || playerTwo.score === undefined) {
                continue;
            }

            if (playerOne.score > playerTwo.score) {
                const oldPlayerOne = podium.get(playerOne.name);
                podium.set(playerOne.name, {
                    name: playerOne.name,
                    color: playerOne.color,
                    wins:  oldPlayerOne.wins + 1
                });
            }

            if (playerOne.score < playerTwo.score) {
                const oldPlayerTwo = podium.get(playerTwo.name);
                podium.set(playerTwo.name, {
                    name: playerTwo.name,
                    color: playerTwo.color,
                    wins:  oldPlayerTwo.wins + 1
                });
            }
        }

        const viewPodiumButton = new ButtonActionComponent(Lang.text("View Final Score"))
        viewPodiumButton.action(() => {

            const podiumSorted = [ ...podium.values() ]
            podiumSorted.sort((a, b) => b.wins - a.wins)

            Router.viewTo("/pong-tournament-final-score", podiumSorted);
            
        });

        for (const match of matches) {
            const listItem = document.createElement("div");
            listItem.classList.add("list-item");

            if (nextMatch && match.pk == nextMatch.pk) {
                listItem.classList.add("next");
            }

            const playerOneWin = match.scoreboard[0].score > match.scoreboard[1].score;
            const playerTwoWin = match.scoreboard[1].score > match.scoreboard[0].score;

            const playerOneLossClass = (playerTwoWin)? "text-decoration-line-through" : "";
            const playerTwoLossClass = (playerOneWin)? "text-decoration-line-through" : "";
           
            listItem.innerHTML = `
                <span class="color-${match.scoreboard[0].color} ${playerOneLossClass}">${match.scoreboard[0].name}</span>
                <span class="sep">${(listItem.classList.contains("next"))? Lang.text("Next") : ""}</span>
                <span class="color-${match.scoreboard[1].color} ${playerTwoLossClass}">${match.scoreboard[1].name}</span>
            `;

            base.append(listItem);
        }

        main.append(title);
        main.append(base);

        if (nextMatch) {
            main.append(nextMatchButton.DOM());
        }

        if (!nextMatch) {
            main.append(viewPodiumButton.DOM());
        }

        this._addElement(menu.DOM());
		this._addElement(main);
        this._addElement(footer.DOM())

    }
}