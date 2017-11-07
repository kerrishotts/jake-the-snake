import Game from "./src/Game.js";

const level = [
    //           1111111111222222222233
    // 01234567890123456789012345678901
    "XXXXXXXXXXXXXX....XXXXXXXXXXXXXX", //  0
    "X..............................X", //  1
    "X..............................X", //  2
    "X..............................X", //  3
    "X..............................X", //  4
    "X..............................X", //  5
    "X..............................X", //  6
    "X..............................X", //  7
    "X..............................X", //  8
    "X..............................X", //  9
    "X..............................X", // 10
    "X..............................X", // 11
    "X..............................X", // 12
    "X............XXXXXX............X", // 13
    ".............XXXXXX.............", // 14
    ".............XXXXXX.............", // 15
    ".............XXXXXX.............", // 16
    ".............XXXXXX.............", // 17
    "X............XXXXXX............X", // 18
    "X..............................X", // 19
    "X..............................X", // 20
    "X..............................X", // 21
    "X..............................X", // 22
    "X..............................X", // 23
    "X..............................X", // 24
    "X..............................X", // 25
    "X..............................X", // 26
    "X..............................X", // 27
    "X..............................X", // 28
    "X..............................X", // 29
    "X..............................X", // 30
    "XXXXXXXXXXXXXX....XXXXXXXXXXXXXX"  // 31
];

const game = new Game({ levels: [level], scale: 16 });
game.start();