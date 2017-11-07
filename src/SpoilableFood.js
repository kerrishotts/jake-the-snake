import rnd from "./rnd.js";

import Food from "./Food.js";

export default class SpoilingFood extends Food {
    spawn() {
        super.spawn();
        this.fresh = rnd(100) + 25;
    }

    get safe() {
        return this.fresh > 0;
    }

    update() {
        if (this.fresh > 0) {
            this.fresh--;
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.safe ? '#FF0000' : '#808000';
        ctx.beginPath();
        ctx.rect(this.x, this.y, 1, 1);
        ctx.fill();
    }
}
