
class GameModule
{
	constructor() {}

	start()
	{
		throw new Error("'GameModule.start()' must be implemented.");
	}

	update()
	{
		throw new Error("'GameModule.update()' must be implemented.");
	}
}

export default GameModule;