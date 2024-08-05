export default class Collider
{
	#debugMode;
	constructor(debugMode) 
	{
		this.#debugMode = debugMode;
	}

	getDebugMode()
	{
		return this.#debugMode;
	}

	setDebugMode(debugMode)
	{
		this.#debugMode = debugMode;
	}
}
