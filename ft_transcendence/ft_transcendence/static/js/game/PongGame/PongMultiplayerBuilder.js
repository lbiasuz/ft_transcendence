import * as GameEngine from "../GameEngine/GameEngine.js"
import CollisionEffectBounceWithSound from "./CollisionEffectBounce.js";
import CollisionScoreEvent from "./CollisionScoreEvent.js";

export default class PongMultiPlayersBuilder {

    static build(config, scoreCallBack)
    {
        const game = new GameEngine.Game();
        const { playerOneController, playerTwoController, playerThreeController, playerFourController } = this.#createControllers(config);

        this.#addBasicComponents(game, config);
        const ball = this.#addBall(game, config);
        const pawnOne = this.#addPawnOne(game, config, playerOneController);
        const pawnTwo = this.#addPawnTwo(game, config, playerTwoController);
        const PawnThree = this.#addPawnThree(game, config, playerThreeController);
        const PawnFour = this.#addPawnFour(game, config, playerFourController);
        this.#addWalls(game, config, scoreCallBack);

        return {game, objects: {ball, pawnOne, pawnTwo, PawnThree, PawnFour}};
    }

    static #addBasicComponents(game, config)
    {
        const canvasId = config.canvas.id
        const canvasWidth = config.canvas.width;
        const canvasHeight = config.canvas.height;
        const background = () => {

            const prefix = "static/static/assets/background/background-";
            const number = parseInt(Math.random() * 5);

            return prefix + number + ".png";
        }
        
        // Canvas
        const canvas = new GameEngine.Canvas(canvasId, canvasWidth, canvasHeight);
        canvas.getDocumentCanvas().style.backgroundImage = `url('${background()}')`;
        // console.log(canvas.getDocumentCanvas());
        game.addGameModule(canvas);

        // Input
        game.addGameModule(new GameEngine.Input());

        //Physics
        game.addGameModule(new GameEngine.Physics());
    }

    static #createControllers(config)
    {
        const pawnSpeed = config.pawn.speed;
        const playerOneKeyUp = config.playerOne.keyUp;
        const playerOneKeyDown = config.playerOne.keyDown;
        const playerTwoKeyUp = config.playerTwo.keyUp;
        const playerTwoKeyDown = config.playerTwo.keyDown;

        //Move Pawn Up
        const moveUpAction = new GameEngine.ActionMove(270, pawnSpeed);

        //Move Pawn Down
        const moveDownAction = new GameEngine.ActionMove(90, pawnSpeed);

        //Move Pawn Left
        const moveLeftAction = new GameEngine.ActionMove(180, pawnSpeed);

        //Move Pawn Right
        const moveRightAction = new GameEngine.ActionMove(0, pawnSpeed);

        //Controller Player One
        const playerOneController = new GameEngine.Controller();
        playerOneController.addAction(playerOneKeyUp, moveUpAction);
        playerOneController.addAction(playerOneKeyDown, moveDownAction);

        //Controller Player Two
        const playerTwoController = new GameEngine.Controller();
        playerTwoController.addAction(playerTwoKeyUp, moveUpAction);
        playerTwoController.addAction(playerTwoKeyDown, moveDownAction);

        //Controller Player Three
        const playerThreeController = new GameEngine.Controller();
        playerThreeController.addAction("a", moveLeftAction);
        playerThreeController.addAction("d", moveRightAction);

        //Controller Player Four
        const playerFourController = new GameEngine.Controller();
        playerFourController.addAction("ArrowLeft", moveLeftAction);
        playerFourController.addAction("ArrowRight", moveRightAction);


        return { playerOneController, playerTwoController, playerThreeController, playerFourController }
    }

    static #addBall(game, config)
    {
        const startPositionX = config.canvas.width / 2;
        const startPositionY = config.canvas.height / 2;
        const ballWidth = config.ball.width;
        const ballHeight = config.ball.height;
        const ballSprite = config.ball.sprite;
        const ballSpeed = config.ball.speed;
        const initialDirection = config.ball.initialDirection || this.#randomDirection();
        const playSound = config.playSound;
        const increaseSpeed = true;

        const ball = new GameEngine.GameObject('ball', GameEngine.vec(startPositionX, startPositionY));
        ball.addComponent(new GameEngine.Velocity(initialDirection, ballSpeed, true));
        ball.addComponent(new GameEngine.Sprite(ballSprite, ballWidth, ballHeight));
        ball.addComponent(new GameEngine.ColliderCircle(ballWidth / 2));
        ball.addComponent(new CollisionEffectBounceWithSound(increaseSpeed, playSound));

        game.addGameObject(ball);
        return ball;
    }

    static #randomDirection()
    {
        const degrees = [30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330]
        const randomPos = parseInt(Math.random() * (degrees.length - 1));
        return degrees[randomPos]
    }

    static #addPawnOne(game, config, controller)
    {
        const width = config.pawn.width;
        const height = config.pawn.height;
        const positionX = 10;
        const positionY = config.canvas.height / 2;
        const velicityDirection = 270;
        const sprite = config.playerOne.pawnSprite;

        const pawn = new GameEngine.GameObject('pawnOne', GameEngine.vec(positionX, positionY));
        pawn.addComponent(controller);
        pawn.addComponent(new GameEngine.Velocity(velicityDirection));
        pawn.addComponent(new GameEngine.Sprite(sprite, width, height));
        pawn.addComponent(new GameEngine.ColliderRectangle(width, height));

        game.addGameObject(pawn);
        return pawn;
    }

    static #addPawnTwo(game, config, controller)
    {
        const width = config.pawn.width;
        const height = config.pawn.height;
        const positionX = config.canvas.width - 11;
        const positionY = config.canvas.height - 120;
        const velicityDirection = 270;
        const sprite = config.playerTwo.pawnSprite;

        const pawn = new GameEngine.GameObject('pawnTwo', GameEngine.vec(positionX, positionY));
        pawn.addComponent(controller);
        pawn.addComponent(new GameEngine.Velocity(velicityDirection));
        pawn.addComponent(new GameEngine.Sprite(sprite, width, height));
        pawn.addComponent(new GameEngine.ColliderRectangle(width, height));

        game.addGameObject(pawn);
        return pawn;
    }

    static #addPawnThree(game, config, controller)
    {
        const width = config.pawn.width;
        const height = config.pawn.height;
        const positionX = config.canvas.width / 2;
        const positionY = 10;
        const velicityDirection = 180;
        const sprite = config.playerOne.pawnSprite;

        const pawn = new GameEngine.GameObject('pawnThree', GameEngine.vec(positionX, positionY));
        pawn.addComponent(controller);
        pawn.addComponent(new GameEngine.Velocity(velicityDirection));
        pawn.addComponent(new GameEngine.Sprite(sprite, width, height));
        pawn.addComponent(new GameEngine.ColliderRectangle(height, width));
        
		game.addGameObject(pawn);
        return pawn;
    }

    static #addPawnFour(game, config, controller)
    {
        const width = config.pawn.width;
        const height = config.pawn.height;
        const positionX = config.canvas.width / 2;
        const positionY = config.canvas.height - 11;
        const velicityDirection = 0;
        const sprite = config.playerTwo.pawnSprite;

        const pawn = new GameEngine.GameObject('pawnFour', GameEngine.vec(positionX, positionY));
        pawn.addComponent(controller);
        pawn.addComponent(new GameEngine.Velocity(velicityDirection));
        pawn.addComponent(new GameEngine.Sprite(sprite, width, height));
        pawn.addComponent(new GameEngine.ColliderRectangle(height, width));

        game.addGameObject(pawn);
        return pawn;
    }

    static #addWalls(game, config, scoreCallBack)
    {
        const verticalWidth = 20;
        const verticalHeight = config.canvas.height;
        const horizontalWidth = config.canvas.width;
        const horizontalHeight = 20;

        const verticalSprite = config.wall.verticalSprite;
        const horizontalSprite = config.wall.horizontalSprite;

        const middleVerticalCanvas = config.canvas.height / 2;
        const middleHorizontalCanvas = config.canvas.width / 2;

        const playSound = config.playSound;

        const playerOnescoreCallBack = () => {
            scoreCallBack({
                playerOneScore: 1
            })
        }

        const playerTwoscoreCallBack = () => {
            scoreCallBack({
                playerTwoScore: 1
            })
        }

        //WallLeft
        const wallLeft = new GameEngine.GameObject('wallLeft', GameEngine.vec(-10, middleVerticalCanvas));
        wallLeft.addComponent(new GameEngine.Sprite(horizontalSprite, verticalWidth, verticalHeight));
        wallLeft.addComponent(new CollisionScoreEvent(playerTwoscoreCallBack, playSound));
        wallLeft.addComponent(new GameEngine.ColliderRectangle(verticalWidth, verticalHeight));
        
		//WallRight
        const wallRight = new GameEngine.GameObject('wallRight', GameEngine.vec(horizontalWidth + 10, middleVerticalCanvas));
        wallRight.addComponent(new GameEngine.Sprite(horizontalSprite, verticalWidth, verticalHeight));
        wallRight.addComponent(new CollisionScoreEvent(playerOnescoreCallBack, playSound));
        wallRight.addComponent(new GameEngine.ColliderRectangle(verticalWidth, verticalHeight));

        //WallUp
        const wallUp = new GameEngine.GameObject('wallUp', GameEngine.vec(middleHorizontalCanvas, -10));
        wallUp.addComponent(new GameEngine.Sprite(verticalSprite,horizontalWidth, horizontalHeight));
		wallUp.addComponent(new CollisionScoreEvent(playerTwoscoreCallBack, playSound));
        wallUp.addComponent(new GameEngine.ColliderRectangle(horizontalWidth, horizontalHeight));

        //WallBottom
        const wallBottom = new GameEngine.GameObject('wallBottom', GameEngine.vec(middleHorizontalCanvas, verticalHeight + 10));
        wallBottom.addComponent(new GameEngine.Sprite(horizontalSprite, horizontalWidth, horizontalHeight));
		wallBottom.addComponent(new CollisionScoreEvent(playerOnescoreCallBack, playSound));
        wallBottom.addComponent(new GameEngine.ColliderRectangle(horizontalWidth, horizontalHeight));
        
        game.addGameObject(wallLeft);
        game.addGameObject(wallRight);
        game.addGameObject(wallUp);
        game.addGameObject(wallBottom);
    }
}