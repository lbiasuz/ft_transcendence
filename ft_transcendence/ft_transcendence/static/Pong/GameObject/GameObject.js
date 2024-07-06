import { vec } from "../Vector/Vector2.js";

class GameObject 
{
	#name;
	#position;
	#objectComponentList = [];
	
	constructor (name = "[unknown]", position = vec(0, 0)) 
	{
		this.#position = position;
		this.#name = name;
	}
	
	getName() 
	{
		return this.#name;
	}
	
	getPosition() 
	{
		return this.#position;
	}

	getComponentList() 
	{
		return this.#objectComponentList;
	}
	setName(name) 
	{
		this.#name = name;
	}

	setPosition(position) 
	{
		this.#position = position;
	}

	addComponent(objectComponent)
	{
		this.#objectComponentList.push(objectComponent);
	}
}

export default GameObject;