class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('road', './assets/road3.png');
        this.load.image('cabin', './assets/cabin1.png');
        this.load.image('trailer', './assets/trailer1.png');
        this.load.image('button', './assets/button2.png');
    }

    create() {
        this.road = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'road').setOrigin(0, 0);
        this.cabin = new Cabin(this, 156, 152, 'cabin', 0).setOrigin(0, 0);
        this.trailer = new Trailer(this, 12, 152, 'trailer', 0).setOrigin(0, 0);

        let menuStyle = {
            fontFamily: 'Righteous',
            fontSize: '60px',
            color: '#FFFFFF',
            align: 'right'
        }
        this.add.text(324, 90, 'Egg Scramble', menuStyle).setOrigin(0.5);

        new Button(this, 250, 300, 'button', 0, 'Play!', '36px', 'gotoPlay').setOrigin(0.5, 0.5).setInteractive({useHandCursor: true});
        new Button(this, 400, 300, 'button', 0, 'Instructions', '17px', 'gotoInstructions').setOrigin(0.5, 0.5).setInteractive({useHandCursor: true});

        this.input.on('gameobjectup', (pointer, gameObject, event) => {
            gameObject.push();
        });

        this.bump();
    }

    update() {
        this.road.tilePositionX += 4;

        this.cabin.bumpUpdate();
        this.trailer.bumpUpdate();
    }

    bump() {
        this.cabin.bump();
        this.time.delayedCall(200, () => {this.trailer.bump();}, null, this);
        this.time.delayedCall(275, () => {
            this.cabin.y = 152;
            this.trailer.y = 152;
        }, null, this);
        this.time.delayedCall(2000, () => {this.bump();}, null, this);
    }
}