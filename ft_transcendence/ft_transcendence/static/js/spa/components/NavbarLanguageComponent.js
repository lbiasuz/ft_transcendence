import BaseComponent from "./Component.js";
import Lang from "../lang/Lang.js";
import Router from "../Router.js";

export default class NavbarLanguageComponent extends BaseComponent {

    #base;

    constructor() {

        super();

        this.#base = document.createElement("li");
        this.#base.classList.add("nav-item", "dropdown", "nav-languages", "cursor-lang");

        this.#base.innerHTML = `
            <a href="#" class="nav-link dropdown-toggle"  role="button"  data-bs-toggle="dropdown" aria-expanded="false">
                <img id="current-flag" src="/static/static/img/flag-en.png" alt="">
            </a>
            <ul class="dropdown-menu text-center">
                <li><a id="en-lang" class="dropdown-item"><img src="/static/static/img/flag-en.png" alt=""></a></li>
                <li><a id="pt-lang" class="dropdown-item"><img src="/static/static/img/flag-pt.png" alt=""></a></li>
                <li><a id="es-lang" class="dropdown-item"><img src="/static/static/img/flag-es.png" alt=""></a></li>
                <li><a id="fr-lang" class="dropdown-item"><img src="/static/static/img/flag-fr.png" alt=""></a></li>
            </ul>
        `;

		const images = {
	    	en: "/static/static/img/flag-en.png",
		    pt: "/static/static/img/flag-pt.png",
		    es: "/static/static/img/flag-es.png",
		    fr: "/static/static/img/flag-fr.png",
		}

		const flagImage = this.#base.querySelector("#current-flag")
        const currentLang = Lang.getCurrentLang();
		flagImage.src = images[currentLang];

        this.#registryLanguage("#en-lang", "en");
        this.#registryLanguage("#pt-lang", "pt");
        this.#registryLanguage("#es-lang", "es");
        this.#registryLanguage("#fr-lang", "fr");
        
        this._component = this.#base;
    }

    #registryLanguage(id, lang) {
        this.#base.querySelector(id).addEventListener("click", () => {
            Lang.setCurrenLang(lang);
            Router.navegateTo(location.pathname);
        })
    }

}