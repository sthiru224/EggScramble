class Checkpoint extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.isCollidable = true;

        this.dropoff1 = scene.sound.add('dropoff1');
        this.dropoff2 = scene.sound.add('dropoff2');
    }

    update() {
        this.x -= this.scene.speed;
        if(this.x < -38) {
            // generate random number, either 1 or 0
            var value = Phaser.Math.Between(0, 1);
            console.log('random' + value);

            // each number has a unique sound effect that will play when checkpoint is reached.
            if (value == 0){
                this.dropoff1.play();
            }
            if (value == 1){
                this.dropoff2.play();
            }
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