import Component from "./Component.js";

export default class SpacerComponent extends Component {

   constructor() {

    super();

    const base = document.createElement("div")
    base.classList.add("spacer");

    this._component = base;

   }

}