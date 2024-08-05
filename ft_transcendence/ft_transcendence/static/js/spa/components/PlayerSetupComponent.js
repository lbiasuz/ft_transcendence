import Lang from "../lang/Lang.js";
import Component from "./Component.js";

export default class PlayerSetupComponent extends Component {

    #colorClasses;
    #colorValue;
    #nameInput;
    #base;

    #nomalizeString(str) {
        str = str.replace(" ", "_");
        str = str.replace("__", "_");
        str = str.trim();
        str = str.substring(0, 16);
        return str;
    }

    constructor(playerNumber) {

        super();
        this.#colorClasses = new Map();
        this.#colorClasses.set("color-blue", "blue");
        this.#colorClasses.set("color-yellow", "yellow");
        this.#colorClasses.set("color-red", "red");
        this.#colorClasses.set("color-green", "green");
        this.#colorClasses.set("color-purple", "purple");

        const baseDiv = document.createElement("div");
        baseDiv.classList.add("player-setup");

        const title = document.createElement("span");
        title.textContent = playerNumber;

        const playerNameInput = document.createElement("input");
        playerNameInput.type = "text";
        playerNameInput.placeholder = Lang.text("Player Name");
        playerNameInput.setAttribute("maxlength", 16);
        playerNameInput.setAttribute("spellcheck", false);
        playerNameInput.addEventListener("input", () => {
            playerNameInput.value = this.#nomalizeString(playerNameInput.value);
        })
        playerNameInput.addEventListener("keyup", () => {
            playerNameInput.value = this.#nomalizeString(playerNameInput.value);
        })

        const colorSelector = document.createElement("div");
        colorSelector.classList.add("btn-group", "btn-color-selection");

        const buttonPrev = document.createElement("button");
        buttonPrev.classList.add("btn", "btn-option", "btn-arrow");
        buttonPrev.textContent = "<";

        const buttonNext = document.createElement("button");
        buttonNext.classList.add("btn", "btn-option", "btn-arrow");
        buttonNext.textContent = ">";

        const colorValue = document.createElement("button");
        colorValue.classList.add("btn", "btn-option", "btn-color", this.#colorClasses.keys().next().value);
        colorValue.append(document.createElement("span"));

        colorSelector.append(buttonPrev, colorValue, buttonNext);
        baseDiv.append(title, colorSelector, playerNameInput);
        
        this.#base = baseDiv;
        this.#colorValue = colorValue;
        this.#nameInput = playerNameInput;
        this._component = baseDiv;

        buttonPrev.addEventListener("click", () => {

            const currentColor = this.#currentColor();
            const prevColor = this.#previousColor();

            this.#colorValue.classList.remove(currentColor);
            this.#colorValue.classList.add(prevColor);

        });

        buttonNext.addEventListener("click", () => {

            const currentColor = this.#currentColor();
            const nextColor = this.#nextColor();

            this.#colorValue.classList.remove(currentColor);
            this.#colorValue.classList.add(nextColor);

        });

    }
    
    withCloseButton(action) {

        const closeButton = document.createElement("button");
        closeButton.classList.add("btn", "btn-remove");
        closeButton.addEventListener("click",(e) => {
            action(e);
        })

        this.#base.append(closeButton);
    }

    #currentColor () {

        const colors = this.#colorValue.classList.values().toArray();

        for (const color of colors) {
            if (this.#colorClasses.has(color)) {
                return color;
            }
        }

        return this.#colorClasses.keys().next().value;
    }

    #nextColor() {
    
        const currentColor = this.#currentColor();
        const colors = this.#colorClasses.keys().toArray();
        const colorIndex = colors.indexOf(currentColor);

        if (colorIndex < colors.length - 1) {
            return colors[colorIndex + 1];
        }

        return colors[0];
    }

    #previousColor() {

        const currentColor = this.#currentColor();
        const colors = this.#colorClasses.keys().toArray();
        const colorIndex = colors.indexOf(currentColor);
        
        if (colorIndex > 0) {
            return colors[colorIndex - 1];
        }

        return colors[colors.length - 1];
    }

    getPlayerName() {
        return this.#nomalizeString(this.#nameInput.value);
    }

    getCurrentColor() {
        return this.#colorClasses.get(this.#currentColor());
    }

}