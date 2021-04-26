class Trailer extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
    }

    update() {
        if(this.y < this.scene.cabin.y) {
            if(this.scene.cabin.y - this.y < 30) this.y += 2;
            else this.y += 4;
        } else if(this.y > this.scene.cabin.y) {
            if(this.y - this.scene.cabin.y < 30) this.y -= 2;
            else this.y -= 4;
        }
    }
}