import { CollisionEffect } from "../GameEngine/GameEngine.js";

export default class CollisionScoreEvent extends CollisionEffect {

    #callback;
    #playSound

    constructor(callback, playSound) {
        super();
        this.#callback = callback;
        this.#playSound = playSound;
    }

    effect()
	{
        if (this.#playSound) {
            const scoreAudio = new Audio("/static/static/assets/sounds/score.mp3");
            scoreAudio.play();
            
        }
		this.#callback();
	}
}