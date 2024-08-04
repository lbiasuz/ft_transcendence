import Component from "./Component.js";

export default class ButtonActionComponent extends Component {

    #actionCallBack

    constructor(text) {

        super();

        const button = document.createElement("button");
        button.classList.add("btn", "btn-game-action");
        button.textContent = text;

        button.addEventListener("click", () => {
            this.#actionCallBack?.();
        })

        this._component = button;

    }

    action(callback) {
        this.#actionCallBack = callback;
    }


}