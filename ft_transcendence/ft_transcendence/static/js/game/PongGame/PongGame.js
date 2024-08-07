import { DEFAULT_PONG_CONFIG } from "./Config.js"
import PongBuilder from "./PongBuilder.js"

export default class PongGame {

    #config
    #maxScore
    #playerOneScore
    #playerTwoScore
    #rounds
    #gameObjects
    #gameInstance
    #onStartCallBack
    #onScoreCallBack
    #onEndGameCallBack
    #startAt
    #endAt
    #stopped

    constructor(config, pongBuilder = PongBuilder) {

        if (!config?.playerOne?.name) {throw new Error("must inform player one name")};
        if (!config?.playerOne?.pawnSprite) {throw new Error("must inform player one sprite")};
        if (!config?.playerTwo?.name) {throw new Error("must inform player two name")};
        if (!config?.playerTwo?.pawnSprite) {throw new Error("must inform player two sprite")};
        if (!config?.maxScore) {throw new Error("must inform max score")};
        
        const { game, objects } = pongBuilder.build(config, this.#scoreEvent.bind(this));

        this.#gameInstance = game;
        this.#gameObjects = objects;
        this.#maxScore = config.maxScore;
        this.#playerOneScore = 0;
        this.#playerTwoScore = 0;
        this.#rounds = 0;
        this.#config = config;
    }

    onStart(callback) {
        this.#onStartCallBack = callback;
    }

    onScore(callback) {
        this.#onScoreCallBack = callback;
    }

    onEndGame(callback) {
        this.#onEndGameCallBack = callback;
    }

    #callScoreCallBack() {
        if (!this.#onScoreCallBack) { return }
        this.#onScoreCallBack({
            playerOneScore: this.#playerOneScore,
            playerTwoScore: this.#playerTwoScore
        });
    }

    #callEndGameCallBack() {
        
        if (!this.#onEndGameCallBack) { return }

        let intervalDelay = 1000;

        if (this.#config.playSound) {
            (new Audio("/static/static/assets/sounds/endgame.mp3")).play();
            intervalDelay = 3000;
        }

        const gameStatus = {
            playerOne: {
                name: this.#config.playerOne.name,
                score: this.#playerOneScore
            },
            playerTwo: {
                name: this.#config.playerTwo.name,
                score: this.#playerTwoScore
            },
            rounds: this.#rounds,
            startAt: this.#startAt,
            endAt: this.#endAt
        }

        let intervalId = setInterval(() => {

            this.#onEndGameCallBack(gameStatus);
            clearInterval(intervalId);

        }, intervalDelay);
    }

    #scoreEvent(score) {

        this.#playerOneScore += score.playerOneScore  || 0;
        this.#playerTwoScore += score.playerTwoScore  || 0;

        this.#rounds++;
        this.#gameObjects.ball.resetPosition();
        this.#gameObjects.ball.resetSpeed();
        this.#gameObjects.pawnOne.resetSpeed();
        this.#gameObjects.pawnTwo.resetSpeed();
	    this.#gameObjects?.PawnThree?.resetSpeed();
        this.#gameObjects?.PawnFour?.resetSpeed();

        this.#gameInstance.pause();

        if (this.#playerOneScore >= this.#maxScore || this.#playerTwoScore >= this.#maxScore) {
            this.#endAt = new Date();
            this.#callScoreCallBack();
            this.#callEndGameCallBack();
            return;
        }
        
        this.#callScoreCallBack();
        
        setTimeout(() => {

            if (this.#stopped) { 
                return;
            }

            if (this.#config.playSound) {
                (new Audio("/static/static/assets/sounds/next-round.mp3")).play();
            }

            this.#gameInstance.resume();

        }, 500);

    }

    start() {

        this.#gameInstance.run();
        
        if(this.#config.playSound) {

            this.#gameInstance.pause();
            (new Audio("/static/static/assets/sounds/countdown.mp3").play());

            setTimeout(() => {

                if (this.#stopped) { 
                    return;
                }

                this.#gameInstance.resume();
                this.#startAt = new Date();

                if (this.#onStartCallBack) {
                    this.#onStartCallBack({startAt: this.#startAt})
                }

            }, 4000);

            return;
        }

        this.#startAt = new Date();
        if (this.#onStartCallBack) {
            this.#onStartCallBack({startAt: this.#startAt})
        }
    }

    stop() {
        this.#stopped = true;
        this.#gameInstance.stop();
    }

}