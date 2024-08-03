import Collider from "./Collider.js"
import { vecSubtr, vecDivide, vecSum, vecScale } from "../../Utils/Vector2.js"

export default class ColliderCircle extends Collider
{
	#radius;
	#previousOverlap;
	#currentOverlap;

	constructor(radius = 1) 
	{		
		super();
		
		this.#radius = radius;
		this.#previousOverlap = undefined;
		this.#currentOverlap = undefined;
	}

	getRadius() 
	{
		return this.#radius;
	}

	setRadius(radius) 
	{
		this.#radius = radius;
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

	isOverlap(target, point, circleCenter) 
	{
		this.#radius;

		const distance = vecSubtr(point,circleCenter);
		
		const distanceSquared = distance.x * distance.x + 
								distance.y * distance.y;
		
		const radiusSquared = this.#radius * this.#radius;

		const isOverlaped =  distanceSquared <= radiusSquared;

		if (isOverlaped)
		{
			if (this.#currentOverlap)
			{
				this.#previousOverlap = this.#currentOverlap;
			}

			this.#currentOverlap = target;
		}
		
		return isOverlaped;
	}

	overlapDuplicity()
	{
		return this.#previousOverlap === this.#currentOverlap;
	}
}	
