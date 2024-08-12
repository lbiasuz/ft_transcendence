import * as GameEngine from "../GameEngine/GameEngine.js"
import CollisionEffectBounceWithSound from "./CollisionEffectBounce.js";
import CollisionScoreEvent from "./CollisionScoreEvent.js";

export default class PongBuilder {

    static build(config, scoreCallBack)
    {
        const game = new GameEngine.Game();
        const { playerOneController, playerTwoController } = this.#createControllers(config);

        this.#addBasicComponents(game, config);
        const ball = this.#addBall(game, config);
        const pawnOne = this.#addPawnOne(game, config, playerOneController);
        const pawnTwo = this.#addPawnTwo(game, config, playerTwoController);
        this.#addWalls(game, config, scoreCallBack);

        return {game, objects: {ball, pawnOne, pawnTwo}};
    }

    static #addBasicComponents(game, config)
    {
        const canvasId = config.canvas.id
        const canvasWidth = config.canvas.width;
        const canvasHeight = config.canvas.height;
        const backgroundImageBase = "static/static/assets/background/background-";
        
        // Input
        game.addGameModule(new GameEngine.Input());

        //Physics
        game.addGameModule(new GameEngine.Physics());

        // Canvas
        const canvas = new GameEngine.Canvas(canvasId, canvasWidth, canvasHeight);

        let backgrounImage = "";

        if (config.background && config.background !== "random") {
            backgrounImage = backgroundImageBase + config.background + ".png";
        }
        else {
            const number = parseInt(Math.random() * 5);
            backgrounImage = backgroundImageBase + number + ".png";
        }

        canvas.getDocumentCanvas().style.backgroundImage = `url(${backgrounImage})`;

        game.addGameModule(canvas);
    }

    static #createControllers(config)
    {
        const pawnSpeed = config.pawn.speed * config.speedModifier;

        const playerOneKeyUp = config.playerOne.keyUp;
        const playerOneKeyDown = config.playerOne.keyDown;
        const playerTwoKeyUp = config.playerTwo.keyUp;
        const playerTwoKeyDown = config.playerTwo.keyDown;

        //Move Pawn Up
        const moveUpAction = new GameEngine.ActionMove(270, pawnSpeed);

        //Move Pawn Down
        const moveDownAction = new GameEngine.ActionMove(90, pawnSpeed);

        //Controller Player One
        const playerOneController = new GameEngine.Controller();
        playerOneController.addAction(playerOneKeyUp, moveUpAction);
        playerOneController.addAction(playerOneKeyDown, moveDownAction);

        //Controller Player Two
        const playerTwoController = new GameEngine.Controller();
        playerTwoController.addAction(playerTwoKeyUp, moveUpAction);
        playerTwoController.addAction(playerTwoKeyDown, moveDownAction);

        return { playerOneController, playerTwoController }
    }

    static #addBall(game, config)
    {
        const startPositionX = config.canvas.width / 2;
        const startPositionY = config.canvas.height / 2;
        const ballWidth = config.ball.width;
        const ballHeight = config.ball.height;
        const ballSprite = config.ball.sprite;
        const ballSpeed = config.ball.speed * config.speedModifier;
        const initialDirection = config.ball.initialDirection || this.#randomDirection();
        const playSound = config.playSound;
        const increaseSpeed = true;

        const ball = new GameEngine.GameObject('ball', GameEngine.vec(startPositionX, startPositionY));
        ball.addComponent(new GameEngine.Velocity(initialDirection , ballSpeed, true));
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
        const positionX = 25;
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
        const positionX = config.canvas.width - 25;
        const positionY = config.canvas.height / 2;
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
        const wallLeft = new GameEngine.GameObject('wallLeft', GameEngine.vec(0, middleVerticalCanvas));
        wallLeft.addComponent(new GameEngine.Sprite(verticalSprite, verticalWidth, verticalHeight));
        wallLeft.addComponent(new CollisionScoreEvent(playerTwoscoreCallBack, playSound));
        wallLeft.addComponent(new GameEngine.ColliderRectangle(verticalWidth, verticalHeight));

        //WallRight
        const wallRight = new GameEngine.GameObject('wallRight', GameEngine.vec(horizontalWidth, middleVerticalCanvas));
        wallRight.addComponent(new GameEngine.Sprite(verticalSprite, verticalWidth, verticalHeight));
        wallRight.addComponent(new CollisionScoreEvent(playerOnescoreCallBack, playSound));
        wallRight.addComponent(new GameEngine.ColliderRectangle(verticalWidth, verticalHeight));

        //WallUp
        const wallUp = new GameEngine.GameObject('wallUp', GameEngine.vec(middleHorizontalCanvas, 0));
        wallUp.addComponent(new GameEngine.Sprite(horizontalSprite, horizontalWidth, horizontalHeight));
        wallUp.addComponent(new GameEngine.ColliderRectangle(horizontalWidth, horizontalHeight));

        //WallBottom
        const wallBottom = new GameEngine.GameObject('wallBottom', GameEngine.vec(middleHorizontalCanvas, verticalHeight));
        wallBottom.addComponent(new GameEngine.Sprite(horizontalSprite, horizontalWidth, horizontalHeight));
        wallBottom.addComponent(new GameEngine.ColliderRectangle(horizontalWidth, horizontalHeight));
        
        game.addGameObject(wallLeft);
        game.addGameObject(wallRight);
        game.addGameObject(wallUp);
        game.addGameObject(wallBottom);
    }
}