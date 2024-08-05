import GameModule from "./GameModule.js"
import Collider from "../Components/Collider/Collider.js"
import Velocity from "../Components/Velocity/Velocity.js"
import ColliderCircle from "../Components/Collider/ColliderCircle.js"
import CollisionEffect from "../Components/CollisionEffect/CollisionEffect.js"
import { vec, vecDirection, vecDistance, vecScale, vecSum, vecAngle, vecDebug } 
from "../Utils/Vector2.js"
import { ColliderRectangle } from "../GameEngine.js"
export default class Physics extends GameModule
{
	#gameObjectList;
	#precisionDistance;

	constructor(precisionDistance = 100) 
	{
		super()

		this.#gameObjectList = [];
		this.#precisionDistance = precisionDistance;
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

	#getComponent(gameObject, componentList)
	{
		const collider =  componentList.find(gameObject1 => 
									 		 gameObject1 instanceof Collider);

		const velocity = componentList.find(gameObject1 => 
										 	gameObject1 instanceof Velocity);

		const collidEffect = componentList.find(gameObject1 => 
												gameObject1 instanceof 
												CollisionEffect)

		if (!collider && !velocity)
		{
			return;
		}

		const dataObject =
		{
			gameObject: gameObject,

			collider: collider,
			
			velocity: velocity,
			
			collidEffect: collidEffect,
			
			position: vec(0, 0),
			
			speed: 0
		}

		this.#gameObjectList.push(dataObject);
	}

	update(deltaTime)
	{
		for (const object1 of this.#gameObjectList) 
		{
			if (!object1.velocity || object1.velocity.getSpeed() == 0)
			{
				continue;
			}

			object1.speed = object1.velocity.getSpeed() * deltaTime;
			object1.position = object1.gameObject.getWorldPosition();

			for (const object2 of this.#gameObjectList) 
			{
				if (object2 === object1 || !object2.collider)
				{
					continue;
				}

				if (object2.velocity)
				{
					object2.speed = object2.velocity.getSpeed() * deltaTime;
				}
				object2.position = object2.gameObject.getWorldPosition();
				
				this.#collision(object1, object2);
				
				this.#collision(object1, object2);
			}

			this.#moveObject(object1);
		}
	}

	#collision(object1, object2)
	{
		if (object2.collider instanceof ColliderCircle)
		{
			return this.#onCircle(object1, object2);
		}

		this.#onRectangle(object1, object2);
	}

	#onCircle(object1, object2)
	{
		const borderPoint1 = 
		object1.collider.getExtremePoint(object1.position, object2.position);
		
		const borderPoint2 = 
		object2.collider.getExtremePoint(object2.position, object1.position);

		this.#testCollision(object1, borderPoint1, object2, borderPoint2)
	}

	#onRectangle(object1, object2)
	{
		const borderPoint2 = 
		object2.collider.getExtremePoint(object2.position, object1.position);
		
		const borderPoint1 = 
		object1.collider.getExtremePoint(object1.position, borderPoint2);

		this.#testCollision(object1, borderPoint1, object2, borderPoint2);
	}

	#testCollision(object1, borderPoint1, object2, borderPoint2)
	{
		const bordersDistance = vecDistance(borderPoint1, borderPoint2)
		
		console.log(bordersDistance);

		if (bordersDistance > this.#precisionDistance)
		{
			return;
		}

		this.#debug(object1, borderPoint1, object2, borderPoint2);

		const collisionAngle = object1.collider.getCollisionAngle();
		
		let directionAngle = object1.velocity.getAngleDirection();
		
		let overlapAngle = vecAngle(vecDirection(borderPoint1, borderPoint2));
		if (overlapAngle == 0 && directionAngle > 180)
		{
			overlapAngle = 360;
		}
		
		const deltaAngle = Math.abs(directionAngle - overlapAngle);

		if (deltaAngle > collisionAngle)
		{
			return;
		}

		if (object1.speed > bordersDistance)
		{
			object1.speed = bordersDistance;

			if (object2.collidEffect)
			{
				object2.collidEffect.effect(object2, borderPoint2, object1);
			}

			
			if (object1.collidEffect)
			{
				object1.collidEffect.effect(object1, borderPoint1, object2);
				return
			}
			
			object1.speed = 0;
		}
	}

	#moveObject(object)
	{
		if (object.speed == 0)
		{
			return;
		}
				
		const direction =object.velocity.getDirection()
		
		const velocityVector = vecScale(direction, object.speed);

		const finalMoviment = vecSum(object.position, velocityVector);
		
		object.gameObject.setWorldPosition(finalMoviment);

		if (object.velocity.getConstant() == false)
		{
			object.velocity.setSpeed(0);
		}
	}

	#debug(object1, borderPoint1, object2, borderPoint2)
	{
		if (!object1.collider.getDebugMode())
		{
			return
		}

		if (object1.collider instanceof ColliderCircle)
		{
			vecDebug(borderPoint1, 4, "darkblue");
			vecDebug(borderPoint2, 4, "lightgreen");
		}
		
		vecDebug(borderPoint2, 4, "darkred");
		vecDebug(borderPoint1, 4, "orange");
	}
}
