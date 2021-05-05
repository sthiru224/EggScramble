class Trailer extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.bumpDir = 0;
    }

    update() {
        if(this.y < this.scene.cabin.y) {
            if(this.scene.cabin.y - this.y < 8) this.y = this.scene.cabin.y;
            else if(this.scene.cabin.y - this.y < 30) this.y += 8;
            else this.y += 16;
        } else if(this.y > this.scene.cabin.y) {
            if(this.y - this.scene.cabin.y < 8) this.y = this.scene.cabin.y;
            else if(this.y - this.scene.cabin.y < 30) this.y -= 8;
            else this.y -= 16;
        }
        if(this.bumpDir == 1) this.y -= 8;
        if(this.bumpDir == 2) this.y += 8;
    }

    bump() {
        this.bumpDir = 1;
        this.scene.time.delayedCall(25, () => {this.bumpDir = 2;}, null, this.scene);
        this.scene.time.delayedCall(49, () => {this.bumpDir = 0;}, null, this.scene);
    }

    bumpUpdate() {
        if(this.bumpDir == 1) this.y -= 8;
        if(this.bumpDir == 2) this.y += 8;
    }
}