export default class Component {

    _component

    addClass() {
        this._component?.classList.add(...arguments);
    }

    DOM() {
        return this._component;
    }

}