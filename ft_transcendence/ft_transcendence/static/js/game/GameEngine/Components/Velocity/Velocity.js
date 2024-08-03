import { vec, vecScale } from "../../Utils/Vector2.js";

export default class Velocity
{
	#direction;
	#constant;
	#speed;

	constructor(degree = 0, speed = 0, constant = false)
	{
		this.#direction = vec();
		this.#speed = speed;
		this.#constant = constant;
		this.setAngleDirection(degree);
	}

	getDirection()
	{
		return this.#direction;
	}

	getSpeed()
	{
		return this.#speed;
	}

	getConstant()
	{
		return this.#constant;
	}

	setAngleDirection(degree)
	{
		const radians = degree * (Math.PI / 180);
    	this.#direction.x = Math.cos(radians);
    	this.#direction.y = Math.sin(radians);
	}

	setVecDirection(direction)
	{
		this.#direction = direction;
	}

	setSpeed(speed)
	{
		this.#speed = speed;
	}

	setConstant(constant)
	{
		this.#constant = constant;
	}

	getVelocity()
	{
		return vecScale(this.#direction, this.#speed);
	}
}
