import ButtonActionComponent from "../components/ButtonActionComponent.js";
import FooterComponent from "../components/FooterComponent.js";
import NavbarAvatarComponent from "../components/NavbarAvatarComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import Context from "../Context.js";
import Lang from "../lang/Lang.js";
import View from "./View.js";

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

        console.log(viewData.matches);
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
        main.append(nextMatchButton.DOM());

        this._addElement(menu.DOM());
		this._addElement(main);
        this._addElement(footer.DOM())

    }

}