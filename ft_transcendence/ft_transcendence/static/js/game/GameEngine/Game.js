export default class Game
{	
	#gameModuleList = [];
	#gameObjectList = [];
	#lastTimestamp;
	#loop;
	#stopped

	constructor() 
	{
		this.#lastTimestamp = 0;
		this.#stopped = false;

		let deltaCount = 0;
		const maxFrameRate = 60;
		const deltaTarget = 1 / maxFrameRate;
		
		this.#loop = (timestamp = 0) =>
		{

			if (this.#stopped) {
				return;
			}

			let deltaTime = (timestamp - this.#lastTimestamp) / 1000;
			
			deltaCount += deltaTime;

			if (deltaCount > deltaTarget ) {

				deltaCount = deltaCount - deltaTarget;

				for (const module of this.#gameModuleList) 
				{
					module.update(deltaTarget);
				}

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
	
	stop() {
		this.#stopped = true;
	}

	resume() {
		this.#stopped = false;
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
