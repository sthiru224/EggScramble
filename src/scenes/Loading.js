class Loading extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    create() {
        this.time.delayedCall(100, () => { this.scene.start('menuScene'); }, null, this);
    }
}