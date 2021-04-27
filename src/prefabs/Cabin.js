class Cabin extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
    }

    update() {
        if(keyUP.isDown) {
            this.y -= 4;
            if(this.y < 50) this.y = 50;
        }
        if(keyDOWN.isDown) {
            this.y += 4;
            if(this.y > 260) this.y = 260;
        }
    }
}