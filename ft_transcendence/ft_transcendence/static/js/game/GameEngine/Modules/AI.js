import GameModule from "./GameModule.js";

export default class AI extends GameModule
{
	constructor() {
		super();}

	update(gameObjectList)
	{
		for (const gameObject of gameObjectList) 
		{
			this.getComponent(gameObject, gameObject.getComponentList());
		}
	}

	getComponent(gameObject, componentList)
	{
		const behavior = componentList.find(gameObject => 
									  	   	gameObject instanceof Behavior);
		if (behavior)
		{
			behavior.routine(gameObject);
		}	
	}
}
