class Controller
{
	#actionByInput = new Map();

	constructor() {}

	addAction(inputElement, action)
	{
		this.#actionByInput.set(inputElement, action);
	}

	getActionByInputList()
	{
		return this.#actionByInput;
	}
}

export default Controller;