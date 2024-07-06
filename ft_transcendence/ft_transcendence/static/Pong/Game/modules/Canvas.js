import Shape from '../../GameObject/components/Shape/Shape.js';
import Sprite from '../../GameObject/components/Sprite/Sprite.js';
import Velocity from '../../GameObject/components/Velocity/Velocity.js';
import GameModule from '../GameModule.js';
import { vec } from '../../Vector/Vector2.js';

class Canvas extends GameModule
{
	#context;
	#canvas;
	#gameObjectMap;

	constructor(canvasId, width = window.innerWidth, height = window.innerHeight) 
	{
		super();

		
		this.#canvas = document.getElementById(canvasId);
		console.log(canvasId);
		this.#canvas.width = width;
		this.#canvas.height = height;		
		this.#context = this.#canvas.getContext('2d');
		this.#gameObjectMap = new Map();
	}

	start(gameObjectList)
	{
		for (const gameObject of gameObjectList) 
		{
			this.#getComponent(gameObject, gameObject.getComponentList());
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
	}

	update()
	{
		this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
		
		// this.#canvas.width = this.#canvas.width;
		// this.#canvas.height = this.#canvas.height;

		for (const pair of this.#gameObjectMap) 
		{
			const gameObject = pair[0];

			const component = pair[1];

			if (component instanceof Shape)
			{
				component.draw(this.#context, gameObject.getPosition());
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

				component.print(this.#context, gameObject.getPosition(), 
								direction);
			}
		}	
	}
}

export default Canvas;