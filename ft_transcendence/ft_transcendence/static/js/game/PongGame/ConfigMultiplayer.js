export const DEFAULT_PONG_MULTIPLAYER_CONFIG = {
    playSound: false,
    canvas: {
        id: "canvas",
        width: 720,
        height: 720
    },
    pawn: {
        speed: 750,
        width: 20,
        height: 160,
    },
    wall: {
        verticalSprite: "",
        horizontalSprite: "./assets/sprites/border.png"
    },
    ball: {
        speed: 400,
        sprite: "./assets/sprites/ball.png",
        width: 40,
        height: 40,
    },
    playerOne: {
        pawnSprite: "./assets/sprites/pawn-green.png",
        keyUp: "w",
        keyDown: "s",
    },
    playerTwo: {
        pawnSprite: "./assets/sprites/pawn-blue.png",
        keyUp: "ArrowUp",
        keyDown: "ArrowDown",
    },
}