import { Config } from "../../config.js";
import { DEFAULT_PONG_CONFIG } from "../../game/PongGame/Config.js";
import PongGame from "../../game/PongGame/PongGame.js";
import FooterComponent from "../components/FooterComponent.js";
import NavbarAvatarComponent from "../components/NavbarAvatarComponent.js";
import NavbarLanguageComponent from "../components/NavbarLanguageComponent.js";
import NavbarMenuComponent from "../components/NavbarMenuComponent.js";
import Context from "../Context.js";
import Router from "../Router.js";
import View from "./View.js";
import Match from "../Match.js";

export default class PongGameView extends View {

    #gameConfig
    #playerOneScore
    #playerTwoScore
    #timer
    #timerIntervalId
    #ended
    #duration
    #game
    #match

    constructor(viewData) {

        super("Pong Game");

        const sprites = new Map();

        sprites.set("blue", "/static/static/assets/sprites/pawn-blue.png");
        sprites.set("green", "/static/static/assets/sprites/pawn-green.png");
        sprites.set("yellow", "/static/static/assets/sprites/pawn-yellow.png");
        sprites.set("red", "/static/static/assets/sprites/pawn-red.png");
        sprites.set("purple", "/static/static/assets/sprites/pawn-purple.png");

        const gameConfig = {...DEFAULT_PONG_CONFIG };

        gameConfig.canvas.id = Config.gameCanvasId;
        gameConfig.maxScore = viewData.maxScore;
        gameConfig.playerOne.name = viewData.playerOne.name;
        gameConfig.playerTwo.name = viewData.playerTwo.name;
        gameConfig.playerOne.color = viewData.playerOne.color;
        gameConfig.playerTwo.color = viewData.playerTwo.color;
        gameConfig.playerOne.pawnSprite = sprites.get(viewData.playerOne.color);
        gameConfig.playerTwo.pawnSprite = sprites.get(viewData.playerTwo.color);

        this.#gameConfig = gameConfig;

        const menu = new NavbarMenuComponent();
        menu.withLogo();

		const languages = new NavbarLanguageComponent();
        const avatar = new NavbarAvatarComponent(Context.getItem("user")?.username);

        menu.addItem(avatar.DOM());
		menu.addItem(languages.DOM());

        const main = document.createElement("main");

        const playerScore = document.createElement("div");
        playerScore.classList.add("pong-player-score");

        // Player One
        const playerOne = document.createElement("div");
        playerOne.classList.add("player");
        
        const playerOneName = document.createElement("span");
        playerOneName.classList.add("name", "color-" + gameConfig.playerOne.color);
        playerOneName.textContent = gameConfig.playerOne.name + ":";

        const playerOneScore = document.createElement("span");
        playerOneScore.classList.add("score");
        playerOneScore.textContent = 0;

        playerOne.append(playerOneName, playerOneScore);
        this.#playerOneScore = playerOneScore;

        // timer

        const timer = document.createElement("div");
        timer.classList.add("timer");

        // Player Two
        const playerTwo = document.createElement("div");
        playerTwo.classList.add("player");
        
        const playerTwoName = document.createElement("span");
        playerTwoName.classList.add("name", "color-" + gameConfig.playerTwo.color);
        playerTwoName.textContent = gameConfig.playerTwo.name + ":";

        const playerTwoScore = document.createElement("span");
        playerTwoScore.classList.add("score");
        playerTwoScore.textContent = 0;

        playerTwo.append(playerTwoName, playerTwoScore);
        this.#playerTwoScore = playerTwoScore;

        playerScore.append(playerOne, timer, playerTwo);

        const canvas = document.createElement("canvas");
        canvas.id = Config.gameCanvasId;

        const footer = new FooterComponent();

        this.#playerOneScore = playerOneScore;
        this.#playerTwoScore = playerTwoScore;
        this.#timer = timer;

        this.#match = viewData.match;

        main.append(playerScore);
        main.append(canvas);

        this._addElement(menu.DOM());
        this._addElement(main);
        this._addElement(footer.DOM());

    }

    #startGameEvent({ startAt }) {

        this.#timer.textContent = "00:00";
        
        this.#timerIntervalId = setInterval(() => {
            
            if (this.#ended) { return }

            this.#duration = (new Date()) - startAt;
            this.#timer.textContent = this.#formatDuration();
        
        }, 1000);

    }

    #formatDuration() {

        const formater = new Intl.NumberFormat("en-US",{minimumIntegerDigits:2})
        const seconds =  Math.floor(this.#duration / 1000 % 60);
        const minutes = (Math.floor(this.#duration / 1000) - seconds) / 60;

        return `${formater.format(minutes)}:${formater.format(seconds)}`;
    }

    #endGameEvent(gameStatus) {
        
        this.#ended = true;
        clearInterval(this.#timerIntervalId);

        let players = [
            {name: this.#gameConfig.playerOne.name, score: this.#playerOneScore.textContent, color: this.#gameConfig.playerOne.color},
            {name: this.#gameConfig.playerTwo.name, score: this.#playerTwoScore.textContent, color: this.#gameConfig.playerTwo.color}
        ]

        players.sort((a, b) => b.score - a.score);

        const finalScoreData = {
            maxScore: this.#gameConfig.maxScore,
            duration: this.#formatDuration(),
            firstPlace: {
                name: players[0].name,
                score: players[0].score,
                color: players[0].color
            },
            secondPlace: {
                name: players[1].name,
                score: players[1].score,
                color: players[1].color
            }
        }

        Match.update(this.#match.pk, {
            state: 'ended',
            started_at: gameStatus.startAt.toISOString(),
            ended_at: gameStatus.endAt.toISOString(),
            scoreboard: players
        }).then(response => response.json()).then(data => {
            console.log('Success:', data);
            finalScoreData.match = data;
            Router.navegateTo("/pong-final-score", finalScoreData);
        })
    }

    #scoreEvent(score) {

        this.#playerOneScore.textContent = score.playerOneScore;
        this.#playerTwoScore.textContent = score.playerTwoScore;

    }

    render() {

        super.render();

        if (Context.getItem("game")) {
            Context.getItem("game")?.stop();
            Context.deleteItem("game");
            console.log("Game Clearned");
        }

        this.#game = new PongGame(this.#gameConfig);
        Context.setItem("game", this.#game);

        this.#game.onStart(this.#startGameEvent.bind(this));
        this.#game.onScore(this.#scoreEvent.bind(this));
        this.#game.onEndGame(this.#endGameEvent.bind(this));
        this.#game.start();

    }

    clear() {

        super.clear();

        if (Context.getItem("game")) {
            Context.getItem("game")?.stop();
            Context.deleteItem("game");
            console.log("Game Clearned");
        }
    }

}