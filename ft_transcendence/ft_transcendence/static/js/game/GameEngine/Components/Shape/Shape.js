import ObjectComponent from "../ObjectComponent.js";

export default class Shape extends ObjectComponent
{
	#color;

	constructor(color) 
	{
		super();

		this.#color = color;
	}

	setColor(color) 
	{
		this.#color = color;
	}

	getColor() 
	{
		return this.#color;
	}

	draw()
	{
		throw new Error("'Shape.draw()' must be implemented.");
	}
}