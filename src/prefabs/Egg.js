class Egg extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.isCollidable = true;
    }

    update() {
        this.x -= this.scene.speed;
        if(this.x < -38) {
            this.x = 962;
            let random = Math.random();
            if(random < 0.3333) this.y = 75;
            else if(random < 0.6666) this.y = 175;
            else this.y = 175;
            this.alpha = 1;
            this.isCollidable = true;
        }
    }
}