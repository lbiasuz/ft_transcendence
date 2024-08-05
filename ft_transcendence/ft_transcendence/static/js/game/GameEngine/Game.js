export default class Game
{	
	#gameModuleList = [];
	#gameObjectList = [];
	#lastTimestamp;
	#loop;
	#paused

	constructor() 
	{
		this.#lastTimestamp = 0;
		this.#paused = false;

		let deltaCount = 0;
		const maxFrameRate = 60;
		const deltaTarget = 1 / maxFrameRate;
		
		this.#loop = (timestamp = 0) =>
		{

			if (this.#paused) {
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
	
	pause() {
		this.#paused = true;
	}

	stop() {
		this.#paused = true;
		window.removeEventListener("keydown", (e) => {});
		window.removeEventListener("keyup", (e) => {});
	}

	resume() {
		this.#paused = false;
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
