export default class Auth {

    static #userData;

    static async #loadData() {

        const request = await fetch("/user/");

        if (!request.ok) {
            this.#userData = undefined;
            return;
        }

        const data = await request.json();
        this.#userData = data;
    }

    static async #isValid() {
        const request = await fetch("/ping/");
        return request.ok;
    }

    static async getUser() {

        if (!this.#userData) {
           await this.#loadData();
           return this.#userData;
        }

        if (!await this.#isValid()) {
            this.#userData = undefined;
        }
        
        return this.#userData;
    }

}