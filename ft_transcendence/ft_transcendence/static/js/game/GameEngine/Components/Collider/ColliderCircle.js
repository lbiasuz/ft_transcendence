import Collider from "./Collider.js"
import { vecSubtr, vecDivide, vecSum, vecScale } from "../../Utils/Vector2.js"

export default class ColliderCircle extends Collider
{
	#radius;
	#collisionAngle;

	constructor(radius = 1, debugMode = false) 
	{		
		super(debugMode);
		
		this.#radius = radius;
		this.#collisionAngle = 90;
	}

	getRadius() 
	{
		return this.#radius;
	}

	setRadius(radius) 
	{
		this.#radius = radius;
	}

	getCollisionAngle() 
	{
		return this.#collisionAngle;
	}

	getExtremePoint(center, targetCenter) 
	{
		const direction = vecSubtr(targetCenter, center);

    	const magnitude = Math.sqrt(direction.x * direction.x + 
									direction.y * direction.y);
		
		if (magnitude === 0) 
		{
			return center;
		}

		const unitDirection = vecDivide(direction, magnitude);

		const borderPoint = vecSum(center, vecScale(unitDirection, 
													this.#radius));

    	return borderPoint;
	}
}	
