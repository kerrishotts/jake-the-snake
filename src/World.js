import rnd from "./rnd.js";

export default class World {
    constructor({ canvas = null, width = 32, height = 32, scale = 8,
        initialObjects = [] } = {}) {

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d", { alpha: false });
        this.width = width;
        this.height = height;
        this.scale = scale;

        this.objects = [];
        this.initialObjects = initialObjects;
        this.initialObjects.forEach(o => this.add(o));

        const scaledWidth = width * scale;
        const scaledHeight = height * scale;

        canvas.style.width = `${scaledWidth}px`;
        canvas.style.height = `${scaledHeight}px`;
        canvas.width = scaledWidth * window.devicePixelRatio;
        canvas.height = scaledHeight * window.devicePixelRatio;

        const ctx = this.ctx;
        ctx.scale(window.devicePixelRatio * scale, window.devicePixelRatio * scale);
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = "low";
        ctx.webkitImgaeSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
    }

    reset() {
        this.objects = [];
        this.initialObjects.forEach(o => this.add(o));
    }

    /**
     * Draws the world by clearing the game board and
     * then asks everything in the world to draw themselves
     */
    draw() {
        // clear the game board
        const ctx = this.ctx;
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, this.width, this.height);

        // ask everyone to draw themselves
        this.objects.forEach(o => o.draw && o.draw(this.ctx));
    }

    /**
     * Updates the world
     */
    update() {
        // ask everyone to update themselves
        this.objects.forEach(o => o.update && o.update());
    }

    /**
     * Add the specified object to the game world
     *
     * @param {object} o
     */
    add(o) {
        this.objects.push(o);
        o.world = this;
        if (o.spawn) {
            o.spawn();
        }
    }

    /**
     * Remove the specified object from the game world
     *
     * @param {object} p
     */
    remove(o) {
        this.objects = this.objects.filter(candidate => candidate !== o);
    }

    /**
     * Check to see if a spot is empty. We can do this by asking
     * all the objects in the world if they contain the desired
     * point.
     */
    isSpotEmpty({ x, y } = {}) {
        return this.objects.reduce((result, o) =>
            result ? !o.containsPoint({ x, y }) : result, true)
    }

    /**
     * Get a random spot that's guaranteed not to collide with
     * an existing object.
     */
    getRandomSafeSpot() {
        while (true) {
            const point = {
                x: rnd(this.width),
                y: rnd(this.height)
            };
            if (this.isSpotEmpty(point)) {
                return point;
            }
        }
    }

    /**
     * Get the object at point, if there is one.
     */
    getObjectAtSpot({ x, y } = {}) {
        return this.objects.find(o => o.containsPoint({ x, y }));
    }
}
