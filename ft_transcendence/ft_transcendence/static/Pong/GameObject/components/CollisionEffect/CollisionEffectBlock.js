import { vec, vecDirection } from "../../../Vector/Vector2.js";
import CollisionEffect from "./CollisionEffect.js";
import CollisionEffectBounce from "./CollisionEffectBounce.js";

class CollisionEffectBlock extends CollisionEffect
{
	constructor() 
	{
		super();
	}

	effect(object, borderPoint, target)
	{
		if (!(target.collidEffect instanceof CollisionEffectBounce))
		{
			const forceBack = vecDirection(borderPoint, object.position);
			object.velocity.setVecDirection(forceBack);
		}
	}
}

export default CollisionEffectBlock;