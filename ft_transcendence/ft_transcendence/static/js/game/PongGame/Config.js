export const DEFAULT_PONG_CONFIG = {
    playSound: false,
    canvas: {
        id: "canvas",
        width: 1024,
        height: 720
    },
    background: "random",
    speedModifier: 1,
    pawn: {
        speed: 700,
        width: 20,
        height: 160,
    },
    wall: {
        verticalSprite: "",
        horizontalSprite: "/static/static/assets/sprites/border.png"
    },
    ball: {
        speed: 400,
        sprite: "/static/static/assets/sprites/ball.png",
        width: 40,
        height: 40,
    },
    playerOne: {
        pawnSprite: "/static/static/assets/sprites/pawn-green.png",
        keyUp: "w",
        keyDown: "s",
    },
    playerTwo: {
        pawnSprite: "/static/static/assets/sprites/pawn-blue.png",
        keyUp: "[",
        keyDown: "]",
    },
}