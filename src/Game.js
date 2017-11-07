import { DIRECTIONS } from "./constants.js";

import rnd from "./rnd.js";

import World from "./World.js";
import Food from "./Food.js";
import SpoilableFood from "./SpoilableFood.js";
import Snake from "./Snake.js";
import Walls from "./Walls.js";

export default class Game {

    constructor({
        width = 32,
        height = 32,
        scale = 8,
        speed = 4,
        FoodClasses = [Food, SpoilableFood],
        PlayerClass = Snake,
        initialObjects = [],
        levels = [],
        level = 0 } = {}
    ) {

        this.canvas = null;
        this.input = null;
        this.div = null;

        this.world = null;
        this.player = null;

        this.width = width;
        this.height = height;
        this.scale = scale;
        this.initialObjects = initialObjects;

        this.speed = speed;
        this._tilNextFrame = speed;

        this.FoodClasses = FoodClasses;
        this.PlayerClass = PlayerClass;

        this.levels = levels;
        this.level = level;

        this.paused = false;

        this.play = this.play.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    createPlayArea() {
        const canvas = document.createElement("canvas");
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "Focus to control snake");
        const div = document.createElement("div");

        div.addEventListener("keydown", this.handleKeyPress, false);

        div.appendChild(canvas);
        div.appendChild(input);

        document.body.appendChild(div);

        this.canvas = canvas;
        this.input = input;
        this.div = div;
    }

    handleKeyPress(evt) {
        if (!this.player) {
            return;
        }
        switch (evt.key) {
            case "ArrowUp":
            case "w":
            case "W":
                this.player.go(DIRECTIONS.UP); break;
            case "ArrowDown":
            case "s":
            case "S":
                this.player.go(DIRECTIONS.DOWN); break;
            case "ArrowLeft":
            case "a":
            case "A":
                this.player.go(DIRECTIONS.LEFT); break;
            case "ArrowRight":
            case "d":
            case "D":
                this.player.go(DIRECTIONS.RIGHT); break;
        }
        evt.preventDefault();
    }

    start() {
        this.createPlayArea();
        this.input.focus();

        const startingObjects = [...this.initialObjects];

        if (this.levels.length > 0) {
            const walls = new Walls({ data: this.levels[this.level] });
            startingObjects.push(walls);
        }

        this.world = new World({ canvas: this.canvas, width: this.width, height: this.height, scale: this.scale, initialObjects: startingObjects });
        this.player = new Snake({ world: this.world });
        this.world.add(this.player);
        this.play();
    }

    play() {
        window.requestAnimationFrame(this.play);

        if (this.paused) {
            return;
        }

        this._tilNextFrame--;
        if (this._tilNextFrame <= 0) {
            this._tilNextFrame = this.speed;
        } else {
            return;
        }

        this.world.update();
        this.world.draw();

        // is the player dead? If so, make a new one
        if (!this.player.alive) {
            this.world.reset();
            this.player = new this.PlayerClass({ world: this.world });
            this.world.add(this.player);
        }

        // any safe foods on the map? If not, add one.
        if (this.world.objects.filter(o => o instanceof Food).filter(food => food.safe).length === 0) {
            const food = new this.FoodClasses[rnd(this.FoodClasses.length)]({ world: this });
            this.world.add(food);
        }
    }

}