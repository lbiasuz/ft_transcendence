export default class GameModule
{
	constructor() {}

	start()
	{
		throw new Error("'GameModule.start()' must be implemented.");
	}

	iterateOnGameObjectList()
	{
		throw new Error("'GameModule.iterateGameObjectList()' \
						must be implemented.");
	}

	update()
	{
		throw new Error("'GameModule.update()' must be implemented.");
	}
}
