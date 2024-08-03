import { Velocity } from "./GameEngine.js";
import { vec, vecSubtr, vecSum } from "./Utils/Vector2.js";

export default class GameObject 
{
	#name;
	#worldPosition;
	#relativePosition;
	#objectComponentList = [];
	#childList = [];
	#startPositon
	#startSpeed
	#speedObject
	
	constructor (name = "[unknown]", position = vec(0, 0)) 
	{
		this.#worldPosition = position;
		this.#relativePosition = position;
		this.#startPositon = position
		this.#name = name;
	}

	resetPosition() {
		this.setWorldPosition(this.#startPositon)
	}

	resetSpeed() {
		if (!this.#speedObject) { return }
		this.#speedObject.setSpeed(this.#startSpeed);
	}
	
	getName() 
	{
		return this.#name;
	}
	
	getWorldPosition() 
	{
		return this.#worldPosition;
	}

	getRelativePosition() 
	{
		return this.#relativePosition;
	}

	getComponentList() 
	{
		return this.#objectComponentList;
	}

	getChildList()
	{
		return this.#childList;
	}

	setName(name) 
	{
		this.#name = name;
	}

	setWorldPosition(position) 
	{
		this.#worldPosition = position;

		this.updateChildListPositions();
	}

	setRelativePosition(position) 
	{
		const parentPosition = vecSubtr(this.#worldPosition, 
										this.#relativePosition)
		
		this.#relativePosition = position;

		this.#worldPosition = vecSum(parentPosition, this.#relativePosition);

		this.updateChildListPositions(this.#worldPosition);
	}

	updateChildListPositions() 
	{
		for (const childObject of this.#childList) 
		{
			this.setChildPosition(childObject);
		}
	}

	setChildPosition(childObject)
	{
		const relativePosition = childObject.getRelativePosition();

		const newPosition = vecSum(this.#worldPosition, relativePosition);
		
		childObject.setWorldPosition(newPosition)
	}

	addComponent(objectComponent)
	{
		if (objectComponent instanceof Velocity && !this.#speedObject) {
			this.#startSpeed = objectComponent.getSpeed();
			this.#speedObject = objectComponent;
		}
		this.#objectComponentList.push(objectComponent);
	}
	
	addChildObject(gameObject)
	{
		this.setChildPosition(gameObject)
	
		this.#childList.push(gameObject);
	}
}

