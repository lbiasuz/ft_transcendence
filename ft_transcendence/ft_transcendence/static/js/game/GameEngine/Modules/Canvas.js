import GameModule from "./GameModule.js"
import { vec } from "../Utils/Vector2.js"
import Shape from "../Components/Shape/Shape.js"
import Sprite from "../Components/Sprite/Sprite.js"
import Velocity from "../Components/Velocity/Velocity.js"
import UIText from "../Components/UIText/UIText.js"

export default class Canvas extends GameModule
{
	#context;
	#canvas;
	#canvasId;
	#canvasWidth;
	#canvasHeight;
	#gameObjectMap;

	constructor(canvasId, width = window.innerWidth, height = window.innerHeight) 
	{
		super();
	
		this.#canvas = undefined;
		this.#context = undefined;
		this.#canvasId = canvasId;
		this.#canvasWidth = width;
		this.#canvasHeight = height;
		this.#gameObjectMap = new Map();
		this.#canvas = document.getElementById(this.#canvasId);
		this.#canvas.width = this.#canvasWidth;
		this.#canvas.height = this.#canvasHeight;		
		this.#context = this.#canvas.getContext('2d');
	}

	start(gameObjectList)
	{
		this.#iterateOnGameObjectList(gameObjectList);
	}

	getDocumentCanvas() {
		return this.#canvas;
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
		const shape = componentList.find(gameObject => 
										 gameObject instanceof Shape);
		if (shape)
		{
			this.#gameObjectMap.set(gameObject, shape); 	
		}

		const sprite = componentList.find(gameObject => 
										  gameObject instanceof Sprite);
		
		if (sprite)
		{
			this.#gameObjectMap.set(gameObject, sprite); 	
		}

		const uiText = componentList.find(gameObject => 
										  gameObject instanceof UIText);

		if (uiText)
		{
			this.#gameObjectMap.set(gameObject, sprite); 	
		}
	}

	update()
	{
		this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
		
		for (const pair of this.#gameObjectMap) 
		{
			const gameObject = pair[0];

			const component = pair[1];

			if (component instanceof Shape)
			{
				component.draw(this.#context, gameObject.getWorldPosition());
			}

			if (component instanceof Sprite)
			{
				const componentList = gameObject.getComponentList();

				const velocity = componentList.find(gameObject => 
												gameObject instanceof Velocity);
				
				let direction = vec(0, 0);

				if (velocity)
				{
					direction = velocity.getDirection();
				}

				component.print(this.#context, gameObject.getWorldPosition(), 
								direction);
								
			}

			if (component instanceof UIText)
			{
				component.print(this.#context, gameObject.getWorldPosition());
			}
		}	
	}
}