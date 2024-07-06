
class Game
{	
	#gameModuleList = [];
	#gameObjectList = [];
	#lastTimestamp;
	#loop;

	constructor() 
	{
		this.#lastTimestamp = 0;
		
		this.#loop = (timestamp = 0) =>
		{
			const deltaTime = (timestamp - this.#lastTimestamp) / 1000;

			for (const module of this.#gameModuleList) 
			{
				module.update(deltaTime);
			}

			this.#lastTimestamp = timestamp;

			window.requestAnimationFrame(this.#loop);
		}
	}

	run()
	{
		this.#startModules();
		this.#loop();
	}

	#startModules()
	{
		for (const module of this.#gameModuleList) 
		{
			module.start(this.#gameObjectList);
		}
	}
	
	addGameModule(gameModule)
	{
		this.#gameModuleList.push(gameModule);	
	}
	
	addGameObject(gameObject)
	{
		this.#gameObjectList.push(gameObject);
	}
}

export default Game;