import Collider from "./Collider.js"
import { vec } from "../../Utils/Vector2.js"

export default class ColliderRect extends Collider
{
	#width;
	#height;
	#halfWidth;
	#halfHeight;
	#collisionAngle;

	constructor(width, height, debugMode = false) 
	{	
		super(debugMode);

		this.#width = width;	
		this.#height = height;	
		this.#halfWidth = width / 2;	
		this.#halfHeight = height / 2;
		this.#collisionAngle = 89;	
	}

	getWidth()
	{
		return this.#width;
	}

	getHeight()
	{
		return this.#height;
	}

	getHalfWidth()
	{
		return this.#halfWidth;
	}

	getHalfHeight()
	{
		return this.#halfHeight;
	}

	getCollisionAngle() 
	{
		return this.#collisionAngle;
	}

	setWidth(width)
	{
		this.#width = width;
		this.#halfWidth = this.#width / 2;
	}

	setHeight(height)
	{
		this.#height = height;
		this.#halfHeight = this.#height / 2;
	}

	getExtremePoint(position, target)
	{
		let borderPoint = vec(target.x, target.y);

		const xLeftPoint = position.x - this.#halfWidth;
		const xRightPoint = position.x + this.#halfWidth
		const yUpPoint = position.y - this.#halfHeight
		const yBottomtPoint = position.y + this.#halfHeight

		let deltaX = 0;
		let deltaY = 0;

		if(this.isOverlap(undefined, target, position))
		{
			if (target.x < position.x)
			{
				deltaX = target.x - xLeftPoint;
			}

			if (target.x > position.x)
			{
				deltaX = xRightPoint - target.x;
			}

			if (target.y < position.y)
			{
				deltaY = target.y - yUpPoint;
			}

			if (target.y > position.y)
			{
				deltaY = yBottomtPoint - target.y;
			}
		}

		if (deltaX < deltaY || target.x < xLeftPoint || target.x > xRightPoint)
		{
			if (target.x < position.x)
			{
				borderPoint.x = xLeftPoint;
			}

			if (target.x > position.x)
			{
				borderPoint.x = xRightPoint;
			}
		}

		if (deltaX > deltaY || target.y < yUpPoint || target.y > yBottomtPoint)
		{
			if (target.y < position.y)
			{
				borderPoint.y = yUpPoint;
			}

			if (target.y > position.y)
			{
				borderPoint.y = yBottomtPoint;
			}
		}

		return borderPoint;
	}

	isOverlap(target, point, position) 
	{
		const isOverlaped = point.x >= position.x - this.#halfWidth && 
			   				point.x <= position.x + this.#halfWidth && 
			   				point.y >= position.y - this.#halfHeight &&
			   				point.y <= position.y + this.#halfHeight;

		return isOverlaped;
	}
}	