import ObjectComponent from "../ObjectComponent.js";

export default class UIText extends ObjectComponent
{
	#text;
	#font;
	#fontSize;
	#fillStyle;

	constructor(text, font = "20px Arial", fillStyle = 'red') 
	{
		super();

		this.#text = text;
		this.#font = font;
		this.#fillStyle = fillStyle;
	}

	print(context, position)
	{
		context.font = font;
		context.fillStyle = 'blue';
		context.fillText(this.#text, position.x, position.y);
	}
}