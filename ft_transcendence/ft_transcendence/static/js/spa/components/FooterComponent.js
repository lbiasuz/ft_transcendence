import Component from "./Component.js";
import Lang from "../lang/Lang.js";

export default class FooterComponent extends Component {

    constructor() {

        super();

        const base = document.createElement("footer");
        base.classList.add("text-center");

        base.innerHTML = `
            <div class="authors">
                <span>Developed by:</span>
                <ul>
                    <li>Bruno Luiz</li>
                    <li>Gabriel Souza</li>
                    <li>Leonardo Biasuz</li>
                    <li>Otávio Burato</li>
                    <li>Renato Miranda</li>
                </ul>
            </div>
        `;
        
        base.querySelector("span").innerText = Lang.text("Developed by") + ":"

        this._component = base;

    }

}