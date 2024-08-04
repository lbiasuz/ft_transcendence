import ColliderCircle from "../Collider/ColliderCircle.js" 
import ColliderRectangle from "../Collider/ColliderRectangle.js" 
import CollisionEffect from "./CollisionEffect.js"

export default class CollisionEffectBounce extends CollisionEffect
{
	constructor() 
	{
		super();
	}

	effect(object, borderPoint, target)
	{
		if (object.collider instanceof ColliderCircle)
		{
			this.#effectAtCircle(object, borderPoint, target.collider);	
		}

		if (object.collider instanceof ColliderRectangle)
		{
			this.#effectAtRectangle(object, borderPoint, target.collider);	
		}

	}

	#effectAtCircle(object, borderPoint, overlap)
	{	
		if (object.collider.overlapDuplicity())
		{
			return;
		}

		let direction = object.velocity.getDirection();

		const deltaX =  Math.abs(borderPoint.x - object.position.x);

		const deltaY =  Math.abs(borderPoint.y - object.position.y);

		if (deltaX == deltaY)
		{
			direction.x = -direction.x;
			direction.y = -direction.y;
		}

		if(deltaX > deltaY)
		{
			direction.x = -direction.x;
		}

		if(deltaX < deltaY)
		{
			direction.y = -direction.y;
		}

		object.velocity.setVecDirection(direction);
	}

	#effectAtRectangle(object, borderPoint, overlap)
	{
		if (object.collider.overlapDuplicity())
		{
			return;
		}

		let direction = object.velocity.getDirection();

		const xLeft = Math.floor(object.position.x - 
								 object.collider.getHalfWidth());

		const xRight = Math.floor(object.position.x + 
								  object.collider.getHalfWidth());

		const yUp = Math.floor(object.position.y - 
							   object.collider.getHalfHeight());
		
		const yBottom = Math.floor(object.position.y + 
								   object.collider.getHalfHeight());

		if(Math.abs(borderPoint.x - xLeft) <= 1 || 
		   Math.abs(xRight - borderPoint.x) <= 1)
		{
			direction.x = -direction.x;
		}
		
		if(Math.abs(borderPoint.y - yUp) <= 1 || 
		Math.abs(borderPoint.y - yBottom) <= 1)
		{
			direction.y = -direction.y;
		}
		
		object.velocity.setDirection(direction);
	}
}