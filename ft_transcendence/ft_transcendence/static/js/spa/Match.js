export default class Match {

	// Estes são os atributos da classe Match
	// todos estão presentes no serializers, somente os primeiros são obrigatórios
	// as funções da classe Match são as funções do CRUD simples e a listagem permite filtros
	// de acordo com o django-filter backend

	//pk;
	//uuid;
	//game; // pong, pongx
	//kind; // single, rematch, tournament
	//state // created, ended, canceled
	
	//next_match;
	//started_at;
	//ended_at;
	//scoreboard;
	//modifiers;
	//tournament_uuid;
	
	static #matchRoute = "/match/";
    static #tournamentRoute = "/tournament/"

    static list(params) {
        return fetch (this.#matchRoute + params, this.#customRequest());
    }

    static detail(pk) {
        return fetch (this.#matchRoute + pk, this.#baseRequest())
    }

    static create(body) {
        return fetch (this.#matchRoute, this.#customRequest({
            method: "POST",
            body: JSON.stringify(body)
        }))
    }

    static update(pk, body) {
        return fetch (this.#matchRoute + pk, this.#customRequest({
            method: "PATCH",
            body: JSON.stringify(body)
        }))
    }

    static delete(pk) {
        console.log(this.#matchRoute + pk)
        return fetch (this.#matchRoute + pk, this.#customRequest({
            method: "DELETE"
        }))
    }

    static tournament_create(body) {
        return fetch (this.#tournamentRoute, this.#customRequest({
            method: "POST",
            body: JSON.stringify(body)
        }))
    }

    static #customRequest(requestConfig) {
        const request = { ...this.#baseRequest(), ...requestConfig };
        return request;
    }

    static #baseRequest() {
        const baseRequest = {
            method: "GET",
            headers: this.#defaultHeaders(),
            credentials: "same-origin"
        }
        return baseRequest;
    }

    static #defaultHeaders() {
        const headers = {
            "Content-Type": "application/json",
            "X-CSRFToken": this.#getCsrfToken()
        }
        return headers;
    }

    static #getCsrfToken() {
        return document.cookie.split('=')[1];
    }
}