
function vec(x = 0, y = 0)
{
	let _vec = 
	{
		x: x,
		y: y
	};

	return _vec;
}

function vecSum(vec1, vec2)
{
	let vecResult = {x: 0, y: 0}; 

	vecResult.x = vec1.x + vec2.x;
	vecResult.y = vec1.y + vec2.y;

	return vecResult;
}

function vecSubtr(vec1, vec2)
{
	let vecResult = {x: 0, y: 0}; 

	vecResult.x = vec1.x - vec2.x;
	vecResult.y = vec1.y - vec2.y;

	return vecResult;
}

function vecScale(vec, scalar)
{
	let vecResult = {x: 0, y: 0};

	vecResult.x = vec.x * scalar;
	vecResult.y = vec.y * scalar;

	return vecResult;
}

function vecDivide(vec, scalar)
{
	if (scalar === 0) 
	{
		throw new Error("Division by zero is not allowed.");
	}
	
	let vecResult = {x: 0, y: 0};

	vecResult.x = vec.x / scalar;
	vecResult.y = vec.y / scalar;

	return vecResult;
}

function vecDot(vec1, vec2)
{
	return vec1.x * vec2.x + vec1.y * vec2.y;
}

function vecDistance(vec1, vec2) 
{
	const dx = vec2.x - vec1.x;
	const dy = vec2.y - vec1.y;
	
	return Math.sqrt(dx * dx + dy * dy);
}

function vecDirection(vec1, vec2)
{
	let direction = {x: 0, y: 0};

	direction.x = vec2.x - vec1.x;
	direction.y = vec2.y - vec1.y;

	const magnitude = Math.sqrt(direction.x * direction.x + 
								direction.y * direction.y);

	if (magnitude === 0) 
	{
		return {x: 0, y: 0};
	}

	let unitDirection = {x: 0, y: 0};

	unitDirection.x = direction.x / magnitude;
	unitDirection.y = direction.y / magnitude;
	
	return unitDirection;
}

function vecEqual(vec1, vec2)
{
	return vec1.x === vec2.x && vec1.y === vec2.y;
}

function vecStr(vec)
{
	return "[" + vec.x + ", " + vec.y + "]";
}

function vecDebug(vec, radius = 4, color = 'red')
{
	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	context.fillStyle = color;
	context.beginPath();
	context.arc(vec.x, vec.y, radius, 0, Math.PI * 2);
	context.fill();
}

export { vec, vecSum, vecSubtr, vecDebug, vecDirection, vecDistance, vecDot, 
	     vecEqual, vecScale, vecStr, vecDivide };