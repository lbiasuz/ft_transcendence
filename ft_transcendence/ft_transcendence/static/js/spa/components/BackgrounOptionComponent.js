import Lang from "../lang/Lang.js";
import Component from "./Component.js";

export default class BackgroundOptionComponent extends Component {

    #bgClasses;
    #background;

    constructor() {
        super();

        this.#bgClasses = new Map();
        this.#bgClasses.set("bg-0", "0");
        this.#bgClasses.set("bg-1", "1");
        this.#bgClasses.set("bg-2", "2");
        this.#bgClasses.set("bg-3", "3");
        this.#bgClasses.set("bg-4", "4");
        this.#bgClasses.set("bg-5", "5");

        const base = document.createElement("div");
        base.classList.add("background-selection");

        base.innerHTML = `
            <div class="title">${Lang.text("Map")}</div>
            <div class="selection">
                <button id="background-prev" class="btn btn-option btn-arrow"><</button>
                <div class="background">
                    <span class="bg-0"></span>
                </div>
                <button id="background-next" class="btn btn-option btn-arrow">></button>
            </div>
        `

        const buttonPrev = base.querySelector("#background-prev");
        const buttonNext = base.querySelector("#background-next");
        const background = base.querySelector(".background span");

        this.#background = background;

        this._component = base;

        buttonNext.addEventListener("click", () => {

            const currentBackground = this.#currentBackground();
            const nextBackground = this.#nextBackground();

            this.#background.classList.remove(currentBackground);
            this.#background.classList.add(nextBackground);
        })

        buttonPrev.addEventListener("click", () => {
            
            const currentBackground = this.#currentBackground();
            const previousBackground = this.#previousBackground();
            
            this.#background.classList.remove(currentBackground);
            this.#background.classList.add(previousBackground);
        })

    }

    selectedBackground() {
        const currentBackground = this.#currentBackground();
        return this.#bgClasses.get(currentBackground);
    }

    #currentBackground() {
        const background = [ ...this.#background.classList.values() ];

        for (const bg of background) {
            if (this.#bgClasses.has(bg)) {
                return bg;
            }
        }

        return this.#bgClasses.keys().next().value;
    }


    #nextBackground() {
    
        const currentBackground = this.#currentBackground();
        const backgrounds = [ ...this.#bgClasses.keys() ];
        const bgIndex = backgrounds.indexOf(currentBackground);

        if (bgIndex < backgrounds.length - 1) {
            return backgrounds[bgIndex + 1];
        }

        return backgrounds[0];
    }

    #previousBackground() {

        const currentBackground = this.#currentBackground();
        const backgrounds = [ ...this.#bgClasses.keys() ];
        const bgIndex = backgrounds.indexOf(currentBackground);
        
        if (bgIndex > 0) {
            return backgrounds[bgIndex - 1];
        }

        return backgrounds[backgrounds.length - 1];
    }

}