import { en as english } from "./en.js";
import { pt as portuguese } from "./pt.js";
import { es as spanish } from "./es.js";
import { fr as french } from "./fr.js";

export default class Lang {

	static dictionaries = {
		en: english,
		pt: portuguese,
		es: spanish,
		fr: french,
	}

	static #defaultLang = "en";
	static #currentLang;
	static #dictionary;

	static #loadDictionary() {

		const langFromStorage = window.localStorage.getItem("lang");
		
		if (langFromStorage && this.#langExistis(langFromStorage)) {
			this.#currentLang = langFromStorage;
		}

		if (!this.#currentLang) {
			this.#currentLang = this.#defaultLang;
		}

		this.#dictionary = { ...this.dictionaries[this.#defaultLang], ... this.dictionaries[this.#currentLang] };
	}

	static #langExistis(lang) {
		return (this.dictionaries[lang]) ? true : false;
	}

	static text(key) {

		if (!this.#dictionary) {
			this.#loadDictionary();
		}

		return this.#dictionary[key] || key;
	}

	static getCurrentLang() {
		if (!this.#currentLang) {
			this.#loadDictionary();
		}
		return this.#currentLang;
	};

	static setCurrenLang(lang) {

		if (!this.#langExistis(lang)) { return }

		this.#currentLang = lang;
		window.localStorage.setItem("lang", lang);
		this.#loadDictionary();
	}

}