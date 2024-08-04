import Velocity from "../Velocity/Velocity.js";

export default class ActionMove
{
	#direction;
	#speed;

	constructor(direction, speed) 
	{
		this.#direction = direction;
		this.#speed = speed;
	}

	doAction(gameObject)
	{
		const componentList = gameObject.getComponentList();

		const velocity = componentList.find(gameObject => 
											gameObject instanceof Velocity);
		
		if (velocity)
		{
			velocity.setAngleDirection(this.#direction);
			velocity.setSpeed(this.#speed);
		}
	}
}