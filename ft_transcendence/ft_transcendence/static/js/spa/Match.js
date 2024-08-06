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

	list(params) {
		fetch ("/match/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": document.cookie.split('=')[1]
			},
			params: params,
			cookie: document.cookie,
			credentials: "same-origin"
		})
	}

	detail(pk) {
		fetch ("/match/" + pk, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": document.cookie.split('=')[1]
			},
			cookie: document.cookie,
			credentials: "same-origin"
		})
	}

	create(body) {
		fetch ("/match/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": document.cookie.split('=')[1]
			},
			body: JSON.stringify(body),
			cookie: document.cookie,
			credentials: "same-origin"
		})
	}

	update(pk, body) {
		fetch ("/match/" + pk, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": document.cookie.split('=')[1]
			},
			body: JSON.stringify(body),
			cookie: document.cookie,
			credentials: "same-origin"
		})
	}

	delete(pk) {
		fetch ("/match/" + pk, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": document.cookie.split('=')[1]
			},
			cookie: document.cookie,
			credentials: "same-origin"
		})
	}

	tournament_create(body) {
		fetch ("/tournament/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": document.cookie.split('=')[1]
			},
			body: JSON.stringify(body),
			cookie: document.cookie,
			credentials: "same-origin"
		})
	}
}