import { DIRECTIONS } from "./constants.js";

import World from "./World.js";
import Food from "./Food.js";

export default class Snake {
    constructor({ world /*: World*/ = null } = {}) {
        this.alive = true;
        this.length = 5;
        this.points = [];
        this.world = world;
        this.direction = [
            DIRECTIONS.UP, DIRECTIONS.DOWN,
            DIRECTIONS.LEFT, DIRECTIONS.RIGHT
        ][Math.floor(Math.random() * 4)];
        this.nextDirectionQueue = [];

    }

    spawn() {
        this.points.push(this.world.getRandomSafeSpot());
    }

    containsPoint({ x = -1, y = -1 } = {}) {
        return !!this.points.find(point => point.x === x && point.y === y);
    }

    go(direction) {
        this.nextDirectionQueue.push(direction);
    }

    get head() {
        return this.points[this.points.length - 1];
    }

    get tail() {
        return this.points[0];
    }

    get nextDirection() {
        return this.nextDirectionQueue.length > 0 ? this.nextDirectionQueue.shift() : this.direction;
    }

    draw(ctx) {
        ['#00BF00', '#00DF00', '#00FF00'].forEach((color, whichColor) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            this.points.forEach((point, whichPoint) => {
                if (whichPoint % 3 === whichColor) {
                    ctx.rect(point.x, point.y, 1, 1);
                }
            });
            ctx.fill();
        });
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.rect(this.head.x, this.head.y, 1, 1);
        ctx.fill();
    }

    update() {
        const { world, direction, nextDirection, head, points } = this;
        // get the next direction we should go
        this.direction = nextDirection;

        // update the position of the head, wrapping it around the world as needed
        const newPoint = {
            x: (head.x + direction.x + world.width) % world.width,
            y: (head.y + direction.y + world.height) % world.height
        };

        // are we about to run into anything?
        const objectAhead = world.getObjectAtSpot(newPoint);
        if (objectAhead) {
            // yes, something's there...
            if (objectAhead instanceof Food) {
                // it's food!
                if (objectAhead.safe) {
                    this.length += objectAhead.calories;
                    world.remove(objectAhead);
                } else {
                    // it was spoilt. Injure us.
                    this.length -= objectAhead.calories;
                    if (this.length < 5) {
                        // too short -- dead!
                        this.alive = false;
                    }
                    world.remove(objectAhead);
                }
            } else {
                // It's either a snake or something else.
                // either way, we're dead.
                this.alive = false;
            }
        }

        points.push(newPoint);
        while (points.length > this.length) {
            points.shift();
        }
    }
}
