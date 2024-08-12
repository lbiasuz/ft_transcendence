import Component from "./Component.js";
import Lang from "../lang/Lang.js";

export default class OptionGroupComponent extends Component {

    #optionsGroup

    constructor(options, title) {
        super();

        const baseDiv = document.createElement("div");
        const titleSpan = document.createElement("span");
        const optionsGroupDiv = document.createElement("div");

        baseDiv.append(titleSpan, optionsGroupDiv);

        this.#optionsGroup = optionsGroupDiv;
        this._component = baseDiv;

        baseDiv.classList.add("option-group");
        titleSpan.textContent = title;
        optionsGroupDiv.classList.add("btn-group", "btn-group-options");

        let isFirst = true;

        for (const option of options) {

            const element = document.createElement("button");
            optionsGroupDiv.append(element);

            element.classList.add("btn", "btn-option");

            if (isFirst) {
                element.classList.add("active");
                isFirst = false;
            }
            
            element.textContent = option;

            element.addEventListener("click", (e) => {

                if (this.#optionsGroup) {
                    const actives = this.#optionsGroup.querySelectorAll(".active");
                    actives.forEach((ref) => {
                        ref.classList.remove("active")
                    })
                }
                e.target.classList.add("active")
            })
        }
    }

    getValue() {

        const element = this.#optionsGroup.querySelector(".active");
        if (!element) { return 0 };
        return parseInt(element.textContent);
    }
}