import ButtonActionComponent from "../components/ButtonActionComponent.js";
import FooterComponent from "../components/FooterComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import Lang from "../lang/Lang.js";
import View from "./View.js";

export default class PongTournamentMatchListView extends View {

    constructor() {

        super("Tournament Match List");

        const main = document.createElement("main");

        const menu = new NavbarMenuComponent();
        menu.withLogo();

		const languages = new NavbarLanguageComponent();
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

        const players = [
            {playerOne: {name: "Gabriel", color: "red"}, playerTwo: {name: "Bruno", color: "green"}},
            {playerOne: {name: "Leonardo", color: "blue"}, playerTwo: {name: "Bruno", color: "green"}, next: true},
            {playerOne: {name: "Gabriel", color: "red"}, playerTwo: {name: "Leonardo", color: "blue"}}
        ];

        for (const playersRow of players) {
            const listItem = document.createElement("div");
            listItem.classList.add("list-item");

            if (playersRow.next) {
                listItem.classList.add("next");
            }

            listItem.innerHTML = `
                <span class="color-${playersRow.playerOne.color}">${playersRow.playerOne.name}</span>
                <span class="sep">${playersRow.next? Lang.text("Next") : ""}</span>
                <span class="color-${playersRow.playerTwo.color}">${playersRow.playerTwo.name}</span>
            `;

            base.append(listItem);
        }

        main.append(title);
        main.append(base);
        main.append(nextMatchButton.DOM());

        this._addElement(menu.DOM());
		this._addElement(main);
        this._addElement(footer.DOM())

    }

}