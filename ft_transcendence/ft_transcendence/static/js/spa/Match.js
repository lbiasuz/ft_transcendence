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

    static async list(params) {
        try {
            const response = await fetch (this.#matchRoute + "?" + params, this.#customRequest());
            return await response.json();
        } catch(e) {
            return {error: e};
        }
    }

    static async detail(pk) {
        try {
            const response = await fetch (this.#matchRoute + pk, this.#baseRequest())
            return await response.json();
        } catch(e) {
            return {error: e};
        }
    }

    static async create(body) {
        try {
            const response = await fetch (this.#matchRoute, this.#customRequest({
                method: "POST",
                body: JSON.stringify(body)
            }))
            return await response.json();
        } catch(e) {
            return {error: e};
        }
    }

    static async update(pk, body) {
        try {
            const response = await fetch (this.#matchRoute + pk, this.#customRequest({
                method: "PATCH",
                body: JSON.stringify(body)
            }))
            return await response.json();
        } catch(e) {
            return {error: e};
        }
    }

    static async delete(pk) {
        try {
            const response = await fetch (this.#matchRoute + pk, this.#customRequest({
                method: "DELETE"
            }))
            return await response.json();
        } catch(e) {
            return {error: e};
        }
    }

    static async tournament_create(body) {
        try {
            const response = await fetch (this.#tournamentRoute, this.#customRequest({
                method: "POST",
                body: JSON.stringify(body)
            }))
            return await response.json();
        } catch(e) {
            return {error: e};
        }
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