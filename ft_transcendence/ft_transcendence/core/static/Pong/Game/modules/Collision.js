import GameModule from "../GameModule.js";
import Collider from "../../GameObject/components/Collider/Collider.js";
import Velocity from "../../GameObject/components/Velocity/Velocity.js";
import ColliderCircle from "../../GameObject/components/Collider/ColliderCircle.js";
import ColliderRect from "../../GameObject/components/Collider/ColliderRectangle.js";
import CollisionEffect from "../../GameObject/components/CollisionEffect/CollisionEffect.js";
import { vecDistance } from "../../Vector/Vector2.js";

class Collision extends GameModule
{
	#gameObjectMap;

	constructor() 
	{
		super()

		this.#gameObjectMap = [];
	}

	start(gameObjectList)
	{
		for (const gameObject of gameObjectList) 
		{
			this.#getComponent(gameObject, gameObject.getComponentList());
		}	
	}

	update()
	{
		let copy = this.#gameObjectMap;

		for (const object1 of this.#gameObjectMap) 
		{
			copy = copy.slice(1);

			if (!object1.velocity || object1.velocity.getSpeed() == 0)
			{
				continue;
			}
	
			for (const object2 of copy) 
			{
				if (!object2.collider)
				{
					continue;
				}

				object1.position = object1.gameObject.getPosition();
				
				object2.position = object2.gameObject.getPosition();

				this.#collision(object1, object2);
				
				if (object2.velocity)
				{
					this.#collision(object2, object1);
				}
			}
		}

	}

	#getComponent(gameObject, componentList)
	{
		const collider =  componentList.find(gameObject1 => 
									 		 gameObject1 instanceof Collider);

		if (collider.collider)
		{
			return;
		}

		const dataObject =
		{
			gameObject: gameObject,

			position: gameObject.getPosition(),

			collider: collider,

			borderPoint: null,
			
			velocity: componentList.find(gameObject1 => 
										 gameObject1 instanceof Velocity),
			
			collidEffect: componentList.find(gameObject1 => 
							   				 gameObject1 instanceof 
											 CollisionEffect)
		}

		this.#gameObjectMap.push(dataObject);
	}

	#collision(object1, object2)
	{
		this.#onCircle(object1, object2);

		this.#onRectangle(object1, object2);
	}

	#onCircle(object1, object2)
	{
		if (!(object2.collider instanceof ColliderCircle))
		{
			return;
		}

		const borderPoint1 = 
		object1.collider.getExtremePoint(object1.position, object2.position);
		
		const borderPoint2 = 
		object2.collider.getExtremePoint(object2.position, object1.position);

		if(vecDistance(borderPoint1, borderPoint2) > 50)
		{
			return;
		}

		if(!object1.collider.isOverlap(object2.collider, borderPoint2, 
			object1.position) &&
			!object2.collider.isOverlap(object1.collider, borderPoint1, 
			object2.position))
		{
			return;
		}

		if (object1.collidEffect)
		{
			object1.collidEffect.effect(object1, borderPoint1, object2);
		}
	}

	#onRectangle(object1, object2)
	{
		if (!(object2.collider instanceof ColliderRect))
		{
			return;
		}
	
		const borderPoint2 = 
		object2.collider.getExtremePoint(object2.position, object1.position);
		
		const borderPoint1 = 
		object1.collider.getExtremePoint(object1.position, borderPoint2);

		if(vecDistance(borderPoint1, borderPoint2) > 50)
		{
			return;
		}
		
		if(!object1.collider.isOverlap(object2.collider, borderPoint2, 
			object1.position) &&
			!object2.collider.isOverlap(object1.collider, borderPoint1, 
			object2.position))
		{
			return;
		}

		if (object1.collidEffect)
		{
			object1.collidEffect.effect(object1, borderPoint1, object2);
		}
	}
}

export default Collision;
