import GameModule from '../GameModule.js';
import Velocity from '../../GameObject/components/Velocity/Velocity.js'
import { vecScale, vecSum } from '../../Vector/Vector2.js';

class Moviment extends GameModule
{
	#gameObjectMap;

	constructor() 
	{
		super();

		this.#gameObjectMap = new Map();
	}

	start(gameObjectList)
	{
		for (const gameObject of gameObjectList) 
		{
			this.#getComponent(gameObject, gameObject.getComponentList());
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
		
		const position = gameObject.getPosition();

		const smooth = vecScale(velocityVector, deltaTime);

		const finalMoviment = vecSum(position, smooth);
		
		gameObject.setPosition(finalMoviment);

		if (velocity.getConstant() == false)
		{
			velocity.setSpeed(0);
		}
	}
}

export default Moviment;