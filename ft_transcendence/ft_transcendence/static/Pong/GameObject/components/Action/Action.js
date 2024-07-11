class Action
{
	constructor() {}

	doAction()
	{
		throw new Error("'Action.doAction()' must be implemented.");
	}
}

export default Action;