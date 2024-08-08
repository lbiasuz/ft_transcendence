import Component from "./Component.js";

export default class ButtonActionComponent extends Component {

    #actionCallBack;
    #spinner;

    constructor(text) {

        super();

        const button = document.createElement("button");
        button.classList.add("btn", "btn-game-action");

        button.textContent = text;

        const spinner = document.createElement("span");
        spinner.classList.add("spinner-border", "spinner-border-sm", "ms-2", "d-none");

        this.#spinner = spinner;

        button.addEventListener("click", () => {
            this.#actionCallBack?.();
        })

        button.append(spinner);

        this._component = button;

    }

    showSpinner() {
        this.#spinner.classList.remove("d-none");
    }

    hideSpinner() {
        this.#spinner.classList.add("d-none");
    }

    action(callback) {
        this.#actionCallBack = callback;
    }

}