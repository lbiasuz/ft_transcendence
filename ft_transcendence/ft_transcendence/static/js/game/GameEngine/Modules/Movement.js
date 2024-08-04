import GameModule from "./GameModule.js";
import Velocity from "../Components/Velocity/Velocity.js";
import { vecScale, vecSum } from "../Utils/Vector2.js";

export default class Movement extends GameModule
{
	#gameObjectMap;

	constructor() 
	{
		super();

		this.#gameObjectMap = new Map();
	}

	start(gameObjectList)
	{
		this.#iterateOnGameObjectList(gameObjectList);
	}

	#iterateOnGameObjectList(gameObjectList)
	{
		for (const gameObject of gameObjectList) 
		{
			this.#getComponent(gameObject, gameObject.getComponentList());
			
			this.#iterateOnGameObjectList(gameObject.getChildList());
		}	
	}

	update(deltaTime)
	{
		for (const pair of this.#gameObjectMap) 
		{
			const gameObject = pair[0];

			const component = pair[1];
			
			this.#moveObject(gameObject, component, deltaTime);
		}
	}

	#getComponent(gameObject, componentList)
	{
		const velocity = componentList.find(gameObject => 
									  	   	gameObject instanceof Velocity);
		if (velocity)
		{
			this.#gameObjectMap.set(gameObject, velocity);
		}	
	}

	#moveObject(gameObject, velocity, deltaTime)
	{
		const velocityVector = velocity.getVelocity();
		
		const speed = velocity.getSpeed();

		if (speed == 0)
		{
			return;
		}
		
		const position = gameObject.getWorldPosition();

		const smooth = vecScale(velocityVector, deltaTime);

		const finalMoviment = vecSum(position, smooth);
		
		gameObject.setWorldPosition(finalMoviment);

		if (velocity.getConstant() === false)
		{
			velocity.setSpeed(0);
		}
	}
}