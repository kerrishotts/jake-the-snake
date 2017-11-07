import World from "./World.js";

export default class Walls {
    constructor({ world /*: World*/ = null, data = [] } = {}) {
        this.world = world;
        this.data = data.map(str => Array.from(str, c => c === "." ? "" : c));
    }

    draw(ctx) {
        ctx.fillStyle = '#808080';
        ctx.beginPath();
        this.data.forEach((row, y) => {
            row.forEach((col, x) => {
                if (col) {
                    ctx.rect(x, y, 1, 1);
                }
            });
        });
        ctx.fill();
    }

    containsPoint({ x = -1, y = -1 } = {}) {
        return !!(this.data[y] && this.data[y][x]);
    }
}
