import GameModule from "../GameModule.js";
import Controller from "../../GameObject/components/Controller/Controller.js";

class Input extends GameModule
{
	#controlBindList;
	#busy = false;

	constructor()
	{
		super();

		this.#controlBindList = new Map();
		this.#busy = false;
	}

	#keyDownEvent()
	{
		window.addEventListener('keydown', 
								(e) => 
								{
									const bind = 
									this.#controlBindList.get(e.key);
									
									if (bind)
									{
										bind.active = true;
										console.log(bind.active);
									}
								});
	}
	
	#keyUpEvent(e)
	{
		window.addEventListener('keyup', 
								(e) => 
								{
									const bind = 
									this.#controlBindList.get(e.key);
									
									if (bind)
									{
										bind.active = false;
										console.log(bind.active);
									}
								});
}

	start(gameObjectList)
	{
		for (const gameObject of gameObjectList) 
		{
			this.#getComponent(gameObject, gameObject.getComponentList());
		}
		
		this.#keyDownEvent();
		this.#keyUpEvent();
	}
	
	#getComponent(gameObject, componentList)
	{
		const controller = 
		componentList.find(gameObject => gameObject instanceof Controller);
		
		if(controller)
		{
			const actionByInputList = controller.getActionByInputList();

			for (const actionByInput of actionByInputList)
			{
				const input = actionByInput[0];
				
				const action = actionByInput[1];

				let value = this.#controlBindList.get(input);
				
				if (!value)
				{
					this.#controlBindList.set(input, this.#bindObject());
					value = this.#controlBindList.get(input);
				}
				
				value.gameObjectList.add(gameObject);
				value.actionList.add(action);
			}	
		}
	}

	#bindObject()
	{
		const bind =
		{
			active: false,
			gameObjectList: new Set,
			actionList: new Set
		}

		return bind
	}

	update()
	{
		for(const bind of this.#controlBindList.values())
		{
			if (bind.active == true) 
			{
				for(const action of bind.actionList)
				{
					for(const gameObject of bind.gameObjectList)
					{
						action.doAction(gameObject);
					}
				}
			}
		}
	}
}

export default Input;