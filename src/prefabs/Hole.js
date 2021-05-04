class Hole extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.isCollidable = true;
        this.resetter = false;
    }

    update() {
        if(this.x > -106) this.x -= this.scene.speed;
        else if(this.resetter) {
            this.resetter = false;
            this.scene.spawnObstacle();
        }
    }

    reset(stagger = 0) {
        this.x = 866 + stagger;
        this.y = this.scene.cone1.y;
        this.isCollidable = true;
    }
}