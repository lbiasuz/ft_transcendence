import { Config } from "../config.js";

export default class Router {

    static #routes = []
    static #currentView;
 
    static #clearTarget() {
        document.querySelector(Config.viewsTarget).childNodes.forEach(e => e.remove());
        document.querySelector(Config.viewsTarget).innerHTML = "";
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

    static #router(viewData) {

        this.#clearTarget();

        const match = this.#routes.find(({ path }) => path == location.pathname);
        const route = match || this.#routes[0];

        if (this.#currentView) {
            this.#currentView.clear();
        }

        this.#currentView = new route.view(viewData);
        this.#currentView.render();
    }

}