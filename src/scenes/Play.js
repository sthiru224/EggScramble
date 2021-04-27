class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('road', './assets/road3.png');
        this.load.image('cabin', './assets/cabin1.png');
        this.load.image('trailer', './assets/trailer1.png');
        this.load.image('cone', './assets/cone1.png');
    }

    create(data) {
        this.road = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'road').setOrigin(0, 0);
        this.road.tilePositionX = data.roadX;
        this.cone1 = new Cone(this, 648, 65, 'cone', 0, 65).setOrigin(0, 0);
        this.cone2 = new Cone(this, 704, 265, 'cone', 0, 265).setOrigin(0, 0);
        this.cabin = new Cabin(this, 156, 152, 'cabin', 0).setOrigin(0, 0);
        this.trailer = new Trailer(this, 12, 152, 'trailer', 0).setOrigin(0, 0);

        this.speed = 3;

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        this.road.tilePositionX += this.speed;

        this.cone1.update();
        this.cone2.update();
        this.cabin.update();
        this.trailer.update();
    }
}