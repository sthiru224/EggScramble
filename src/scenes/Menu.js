class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //bgmusic
        this.load.audio('play_music', './assets/GameplayMusic.wav');
        this.load.audio('menu_music', './assets/MenuMusic.wav');
        this.load.audio('over_music', './assets/GameOverMusic.wav');
        this.load.audio('bump1', './assets/bump1.wav');
        this.load.audio('bump2', './assets/bump2.wav');
        this.load.audio('cone1', './assets/cone1.wav');
        this.load.audio('cone2', './assets/cone2.wav');
        this.load.audio('dropoff1', './assets/dropoff1.wav');
        this.load.audio('dropoff2', './assets/dropoff2.wav');
        this.load.audio('eggcollect', './assets/eggcollect.wav');
        this.load.audio('hole', './assets/hole.wav');
        this.load.audio('laneswitch1', './assets/carUp.wav');
        this.load.audio('laneswitch2', './assets/carDown.wav');
        this.load.audio('menuclick1', './assets/menuclick1.wav');
        this.load.audio('menuclick2', './assets/menuclick2.wav');

        this.load.image('road', './assets/road3.png');
        this.load.image('cabin', './assets/cabin1.png');
        this.load.image('trailer', './assets/trailer1.png');
        this.load.image('button', './assets/button2.png');
    }

    create() {
        this.menuMusic = this.sound.add('menu_music',{volume:0.25,loop:true});
        this.menuMusic.play();

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