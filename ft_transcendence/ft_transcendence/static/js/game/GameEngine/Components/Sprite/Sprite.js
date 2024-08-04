import ObjectComponent from "../ObjectComponent.js";

export default class Sprite extends ObjectComponent
{
	#img;
	#renderWidth;
	#renderHeight;

	constructor(source, width, height) 
	{
		super();

		this.#img = new Image();
		this.#img.src = source;
		this.#img.onload = () => 
		{
			this.#renderWidth = width / this.#img.width;
			this.#renderHeight = height / this.#img.height;
		};
	}

	print(context, position, direction)
	{
		const radians = Math.atan2(direction.x, direction.y);
		
		context.setTransform(this.#renderWidth, 0, 0, this.#renderHeight, 
							 position.x, position.y);
		
		context.rotate(radians);

		context.drawImage(this.#img, -this.#img.width / 2, 
						  -this.#img.height / 2);
				
		context.setTransform(1, 0, 0, 1, 0, 0);
	}
}