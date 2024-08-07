export const DEFAULT_PONG_CONFIG = {
    playSound: false,
    canvas: {
        id: "canvas",
        width: 1024,
        height: 720
    },
    pawn: {
        speed: 500,
        width: 20,
        height: 160,
    },
    wall: {
        verticalSprite: "",
        horizontalSprite: "/static/static/assets/sprites/border.png"
    },
    ball: {
        speed: 275,
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
        keyUp: "ArrowUp",
        keyDown: "ArrowDown",
    },
}