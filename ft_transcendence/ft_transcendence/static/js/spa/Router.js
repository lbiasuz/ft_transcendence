import { Config } from "../config.js";
import Auth from "./Auth.js";
import Context from "./Context.js";

export default class Router {

    static #routes = []
    static #currentView;
    static notFoundView;
    static authView;
    static authMiddleware;
 
    static #clearTarget() {
        // document.querySelector(Config.viewsTarget).childNodes.forEach(e => e.remove());
        document.querySelector(Config.viewsTarget).innerHTML = "";
    }


    static #addSpinner() {
        document.querySelector(Config.viewsTarget).innerHTML = `
        <main>
            <div class="spinner-grow mx-auto" role="status">
            </div>
        </main>
    `;
    }

    static start() {
        
        window.addEventListener("popstate", this.#router.bind(this));
        document.body.addEventListener("click", e => {
            if (e.target.matches("[data-link]")) {
                e.preventDefault();
                this.navegateTo(e.target.href);
            }
        });

        this.#router();
    }

    static addRoute(path, view) {
        this.#routes.push({
            path: path,
            view: view
        })
    }

    static navegateTo(route, viewData) {
        history.pushState(null, null, route);
        this.#router(viewData);
    }

    static async #router(viewData) {

        // this.#addSpinner();

        if (this.authMiddleware && ! await this.authMiddleware()) {
            const view = new this.authView();
            this.#clearTarget();
            return view.render();
        }

        this.#clearTarget();

        const match = this.#routes.find(({ path }) => path == location.pathname);

        if (this.#currentView) {
            this.#currentView.clear();
        }

        if (!match) {
            const view = new this.notFoundView();
            return view.render();
        }

        this.#currentView = new match.view(viewData);
        this.#currentView.render();
    }

}