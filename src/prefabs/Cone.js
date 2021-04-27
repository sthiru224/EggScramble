class Cone extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, lane) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.lane = lane;
    }

    update() {
        this.x -= this.scene.speed;
        if(this.x < -28) {
            this.x = 972;
            if(Math.random() < 0.5) this.y = this.lane;
            else this.y = 165;
        }
    }
}