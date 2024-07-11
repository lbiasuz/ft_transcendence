import { vec } from "../../../Vector/Vector2.js";
import Collider from "./Collider.js";

class ColliderRect extends Collider
{
	#width;
	#height;
	#halfWidth;
	#halfHeight;
	#previousOverlap;
	#currentOverlap;

	constructor(width, height) 
	{	
		super();

		this.#width = width;	
		this.#height = height;	
		this.#halfWidth = width / 2;	
		this.#halfHeight = height / 2;
		this.#previousOverlap = undefined;
		this.#currentOverlap = undefined;	
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

export default ColliderRect;