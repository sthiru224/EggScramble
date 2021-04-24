class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('road', './assets/road3.png');
    }

    create() {
        this.road = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'road').setOrigin(0, 0);
    }

    update() {
        this.road.tilePositionX += 3;
    }
}