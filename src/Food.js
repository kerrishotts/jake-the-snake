import World from "./World.js";

export default class Food {
    constructor({ world /*: World*/ = null } = {}) {
        this.world = world;
        this.x = -1;
        this.y = -1;
    }

    spawn() {
        ({ x: this.x, y: this.y } = this.world.getRandomSafeSpot());
    }

    update() {
    }

    get safe() {
        return true;
    }

    get calories() {
        return 5;
    }

    containsPoint({ x = -1, y = -1 } = {}) {
        return this.x === x && this.y === y;
    }

    draw(ctx) {
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.rect(this.x, this.y, 1, 1);
        ctx.fill();
    }
}
