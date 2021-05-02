class Cabin extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.bumpDir = 0;
    }

    update() {
        if(keyUP.isDown) {
            this.y -= 4;
        }
        if(keyDOWN.isDown) {
            this.y += 4;
        }
        if(this.bumpDir == 1) this.y -= 4;
        if(this.bumpDir == 2) this.y += 4;
        if(this.y < 50) this.y = 50;
        if(this.y > 260) this.y = 260;
    }

    bump() {
        this.bumpDir = 1;
        this.scene.time.delayedCall(25, () => {this.bumpDir = 2;}, null, this.scene);
        this.scene.time.delayedCall(49, () => {this.bumpDir = 0;}, null, this.scene);
    }

    bumpUpdate() {
        if(this.bumpDir == 1) this.y -= 4;
        if(this.bumpDir == 2) this.y += 4;
    }
}