import Shape from './Shape.js'
import { vec, vecSubtr } from "../../../Vector/Vector2.js";

class ShapeRectangle extends Shape 
{
	#width;
	#height;
	#drawScale;

	constructor(color, width, height) 
	{	
		super(color);
		
		this.#width = width;	
		this.#height = height;
		this.#drawScale = vec(width / 2, height / 2);	
	}
	
	draw(context, position)
	{
		context.fillStyle = this.getColor();
		
		context.beginPath();
		
		const drawPoint = vecSubtr(position, this.#drawScale);
		
		context.fillRect(drawPoint.x, drawPoint.y, this.#width, this.#height);
	}
	
	getWidth()
	{
		return this.#width;
	}

	getHeight()
	{
		return this.#height;
	}

	setWidth(width)
	{
		this.#width = width;
	}

	setHeight(height)
	{
		this.#height = height;
	}
}

export default ShapeRectangle;