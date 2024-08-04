import { Config } from "../../config.js";

export default class View {

	_elements;

	constructor (title) {
		document.title = Config.appTitle + " - "  + title;
		this._elements = [];
	}

	_addElement(element) {
		this._elements.push(element);
	}

	render() {
		const targetDOM = document.querySelector(Config.viewsTarget);
		for(const element of this._elements) {
			targetDOM.append(element);
		}
	}

	clear() {
		
	}
}