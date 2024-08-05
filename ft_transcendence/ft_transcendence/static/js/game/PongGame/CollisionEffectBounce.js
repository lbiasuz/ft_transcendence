import { CollisionEffectBounce } from "../GameEngine/GameEngine.js";


export default class CollisionEffectBouncePong extends CollisionEffectBounce {

	#playSound
	#increaseSpeed
	#maxSpeed

	constructor(increaseSpeed, playSound) 
	{
		super();
		this.#playSound = playSound;
		this.#increaseSpeed = increaseSpeed;
		this.#maxSpeed = 3000;
	}

	effect(object, borderPoint, target)
	{
		if (this.#playSound) {
			(new Audio("/static/static/assets/sounds/clack.mp3")).play();
		}
		
		if (this.#increaseSpeed) {
			let speed = object.velocity.getSpeed();
			speed += 40;
			if (speed <= this.#maxSpeed) {
				object.velocity.setSpeed(speed);
			}
		}
		
		super.effect(object, borderPoint, target)
	}
}