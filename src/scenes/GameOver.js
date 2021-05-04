class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene");
    }

    preload() {
        //bgmusic
        this.load.audio('play_music', './assets/GameplayMusic.wav');
        this.load.audio('menu_music', './assets/MenuMusic.wav');
        this.load.audio('over_music', './assets/GameOverMusic.wav');

        this.load.image('road', './assets/road3.png');
        this.load.image('cabin', './assets/cabin1.png');
        this.load.image('trailer', './assets/trailer1.png');
        this.load.image('button', './assets/button2.png');
    }

    create(data) {
        //bgmusic
        let MENUmusic = this.sound.add('over_music');
        MENUmusic.play();
        //MENUmusic.stop();

        this.road = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'road').setOrigin(0, 0);
        this.road.tilePositionX = data.roadX;
        
        let menuStyle = {
            fontFamily: 'Righteous',
            fontSize: '60px',
            color: '#FFFFFF',
            align: 'right'
        }
        this.add.text(324, 90, 'Game Over', menuStyle).setOrigin(0.5);

        new Button(this, 250, 300, 'button', 0, 'Play!', '36px', 'gotoPlay').setOrigin(0.5, 0.5).setInteractive({useHandCursor: true});
        new Button(this, 400, 300, 'button', 0, 'Menu', '36px', 'gotoMenu').setOrigin(0.5, 0.5).setInteractive({useHandCursor: true});

        this.input.on('gameobjectup', (pointer, gameObject, event) => {
            gameObject.push();
        });
    }
}