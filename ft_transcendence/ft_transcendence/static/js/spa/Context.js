export default class Context {

    static #data = new Map();

    static getItem(item) {
        return this.#data.get(item);
    }

    static setItem(item, value) {
        return this.#data.set(item, value);
    }

    static deleteItem(item) {
        this.#data.delete(item);
    }

}