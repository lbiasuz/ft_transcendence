import ObjectComponent from "../../ObjectComponent.js";

class Sprite extends ObjectComponent
{
	#img;

	constructor(source) 
	{
		super();

		this.#img = new Image();
		this.#img.src = source;
	}

	print(context, position, direction)
	{

		const radians = Math.atan2(direction.x, direction.y);
		
		context.setTransform(0.1, 0, 
							 0, 0.1, 
							 position.x, position.y);
		
		context.rotate(radians);

		context.drawImage(this.#img, -this.#img.width / 2, 
						  -this.#img.height / 2);
				
		context.setTransform(1, 0, 0, 1, 0, 0);
	}
}

export default Sprite; 