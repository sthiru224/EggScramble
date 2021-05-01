class Checkpoint extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.isCollidable = true;
    }

    update() {
        this.x -= this.scene.speed;
        if(this.x < -38) {
            this.scene.egg.reset();
            this.scene.egg.untilCheckpoint = 12;
            this.x = 99999;
        }
    }

    reset() {
        this.x = 934;
        this.y = 50;
        this.isCollidable = true;
    }
}