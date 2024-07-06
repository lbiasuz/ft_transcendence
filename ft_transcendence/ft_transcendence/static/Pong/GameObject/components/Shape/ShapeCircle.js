import Shape from './Shape.js'

class ShapeCircle extends Shape 
{
	#radius = 0;
	#piDouble;

	constructor(color, radius) 
	{		
		super(color);
		
		this.#radius = radius;
		this.#piDouble = Math.PI * 2;
	}

	draw(context, position)
	{
		context.fillStyle = this.getColor();
		context.beginPath();
		context.arc(position.x, position.y, this.#radius, 0, this.#piDouble);
		context.fill();
	}
	
	getRadius() 
	{
		return this.#radius;
	}

	setRadious(radius) 
	{
		this.#radius = radius;
	}

}

export default ShapeCircle;


