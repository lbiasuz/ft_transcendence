import GameModule from "./GameModule.js"
import Collider from "../Components/Collider/Collider.js"
import Velocity from "../Components/Velocity/Velocity.js"
import ColliderCircle from "../Components/Collider/ColliderCircle.js"
import ColliderRectangle from "../Components/Collider/ColliderRectangle.js"
import CollisionEffect from "../Components/CollisionEffect/CollisionEffect.js"
import { vecDistance } from "../Utils/Vector2.js"

export default class Collision extends GameModule
{
	#gameObjectMap;
	#precisionDistance;

	constructor(precisionDistance = 100) 
	{
		super()

		this.#gameObjectMap = [];
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

				object1.position = object1.gameObject.getWorldPosition();
				
				object2.position = object2.gameObject.getWorldPosition();

				this.#collision(object1, object2);
				this.#collision(object2, object1);
	
			}
		}

	}

	#getComponent(gameObject, componentList)
	{
		const collider =  componentList.find(gameObject1 => 
									 		 gameObject1 instanceof Collider);

		if (!collider)
		{
			return;
		}

		const dataObject =
		{
			gameObject: gameObject,

			position: gameObject.getWorldPosition(),

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

		if(vecDistance(borderPoint1, borderPoint2) > this.#precisionDistance)
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
		if (!(object2.collider instanceof ColliderRectangle))
		{
			return;
		}
	
		const borderPoint2 = 
		object2.collider.getExtremePoint(object2.position, object1.position);
		
		const borderPoint1 = 
		object1.collider.getExtremePoint(object1.position, borderPoint2);

		if(vecDistance(borderPoint1, borderPoint2) > this.#precisionDistance)
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

