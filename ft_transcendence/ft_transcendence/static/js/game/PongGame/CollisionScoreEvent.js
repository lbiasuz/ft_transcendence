import { CollisionEffect } from "../GameEngine/GameEngine.js";

export default class CollisionScoreEvent extends CollisionEffect {

    #callback;
    #playSound

    constructor(callback, playSound) {
        super();
        this.#callback = callback;
        this.#playSound = playSound;
    }

    effect(object1, borderPoint1, object2)
	{
		if(object2.gameObject.getName() != "ball")
		{
			return;
		}

        if (this.#playSound) {
            const scoreAudio = new Audio("/static/static/assets/sounds/score.mp3");
            scoreAudio.play();
            
        }

		object2.speed = 0;
		
		this.#callback();
	}
}