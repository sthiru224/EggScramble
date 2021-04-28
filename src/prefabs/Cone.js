class Cone extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, lane) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.lane = lane;
        this.isCollidable = true;
        this.resetter = false;
    }

    update() {
        if(this.x > -28) this.x -= this.scene.speed;
        else if(this.resetter) {
            this.resetter = false;
            this.scene.spawnObstacle();
        }
    }

    reset(stagger = 0) {
        this.x = 972 + stagger;
        if(Math.random() < 0.5) this.y = this.lane;
        else this.y = 165;
        this.alpha = 1;
        this.isCollidable = true;
    }
}