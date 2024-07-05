import Game from '../Pong/Game/Game.js';
import { vec } from "../Pong/Vector/Vector2.js";
import Input from '../Pong/Game/modules/Input.js';
import Canvas from '../Pong/Game/modules/Canvas.js';
import Moviment from '../Pong/Game/modules/Moviment.js';
import Collision from '../Pong/Game/modules/Collision.js';
import GameObject from '../Pong/GameObject/GameObject.js';
import ColliderRectangle from 
'../Pong/GameObject/components/Collider/ColliderRectangle.js';
import Sprite from '../Pong/GameObject/components/Sprite/Sprite.js';
import CollisionEffectBlock from 
'../Pong/GameObject/components/CollisionEffect/CollisionEffectBlock.js';
import CollisionEffectBounce from 
'../Pong/GameObject/components/CollisionEffect/CollisionEffectBounce.js';
import Velocity from '../Pong/GameObject/components/Velocity/Velocity.js';
import ActionMove from '../Pong/GameObject/components/Action/ActionMove.js';
import ShapeCircle from '../Pong/GameObject/components/Shape/ShapeCircle.js';
import ShapeRect from '../Pong/GameObject/components/Shape/ShapeRectangle.js';
import Controller from '../Pong/GameObject/components/Controller/Controller.js';
import ColliderCircle from '../Pong/GameObject/components/Collider/ColliderCircle.js';

//		Game Instance		//

const game = new Game();


//		Game Modules		//

//Canvas
const canvas = new Canvas('canvas', 1024, 720);
game.addGameModule(canvas);

// Input
const input = new Input();
game.addGameModule(input);

//Bounce Collision
const collision = new Collision();
game.addGameModule(collision);

//Moviment
const speed = new Moviment();
game.addGameModule(speed);


//		Actions				//

//Move up
const moveUpAction = new ActionMove(270, 200);

//Move down
const moveDownAction = new ActionMove(90, 200);


//		Controllers			//

//controller1
const controller1 = new Controller();
controller1.addAction('w', moveUpAction);
controller1.addAction('s', moveDownAction);

//controller2
const controller2 = new Controller();
controller2.addAction('ArrowUp', moveUpAction);
controller2.addAction('ArrowDown', moveDownAction);

//		GameObjects			//

//ball
const ball = new GameObject('ball', vec(200, 512));
const ballShape = new ShapeCircle('cyan', 20);
// const ballSprite = new Sprite('./assets/sprites/ball2.png');
const ballVelocity = new Velocity(315, 500, true);
const ballCollider = new ColliderCircle(20);
const ballColliderEffect = new CollisionEffectBounce();
ball.addComponent(ballVelocity);
ball.addComponent(ballShape);
// ball.addComponent(ballSprite);
ball.addComponent(ballCollider);
ball.addComponent(ballColliderEffect);
game.addGameObject(ball);

//pawn1
const pawn1 = new GameObject('pawn1', vec(100, 500));
const pawn1Shape = new ShapeRect('cyan', 20, 160);
const pawn1Velocity = new Velocity();
const pawn1Collider = new ColliderRectangle(20, 160);
const pawn1ColliderEffect = new CollisionEffectBlock();
pawn1.addComponent(controller1);
pawn1.addComponent(pawn1Velocity);
pawn1.addComponent(pawn1Shape);
pawn1.addComponent(pawn1Collider);
pawn1.addComponent(pawn1ColliderEffect);
game.addGameObject(pawn1);

//pawn2
const pawn2 = new GameObject('pawn2', vec(900, 500));
const pawn2Shape = new ShapeRect('cyan', 20, 160);
const pawn2Velocity = new Velocity();
const pawn2Collider = new ColliderRectangle(20, 160);
const pawn2ColliderEffect = new CollisionEffectBlock();
pawn2.addComponent(controller2);
pawn2.addComponent(pawn2Velocity);
pawn2.addComponent(pawn2Shape);
pawn2.addComponent(pawn2Collider);
pawn2.addComponent(pawn2ColliderEffect);
game.addGameObject(pawn2);

//WallLeft
const wallLeft = new GameObject('wallLeft', vec(0, 360));
const wallLeftShape = new ShapeRect('cyan', 20, 720);
const wallLeftCollider = new ColliderRectangle(20, 720);
// wallLeft.addComponent(wallLeftShape);
wallLeft.addComponent(wallLeftCollider);
game.addGameObject(wallLeft);

//WallRight
const wallRight = new GameObject('wallRight', vec(1024, 360));
const wallRightShape = new ShapeRect('cyan', 20, 720);
const wallRightCollider = new ColliderRectangle(20, 720);
// wallRight.addComponent(wallRightShape);
wallRight.addComponent(wallRightCollider);
game.addGameObject(wallRight);

//WallUp
const wallUp = new GameObject('wallUp', vec(512, 0));
const wallUpShape = new ShapeRect('cyan', 1024, 20);
const wallUpCollider = new ColliderRectangle(1024, 20);
wallUp.addComponent(wallUpShape);
wallUp.addComponent(wallUpCollider);
game.addGameObject(wallUp);

//WallBottom
const wallBottom = new GameObject('wallBottom', vec(512, 720));
const wallBottomShape = new ShapeRect('cyan', 1024, 20);
const wallBottomCollider = new ColliderRectangle(1024, 20);
wallBottom.addComponent(wallBottomShape);
wallBottom.addComponent(wallBottomCollider);
game.addGameObject(wallBottom);

const img = new Image();

//		Running Game Instance		//

game.run();

//player
//gameMode
//canvas.print();
//gameSession

export default game; 