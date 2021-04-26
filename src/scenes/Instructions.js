class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene");
    }

    preload() {
        this.load.image('road', './assets/road3.png');
        this.load.image('button', './assets/button2.png');
    }

    create() {
        this.road = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'road').setOrigin(0, 0);
        
        let menuStyle = {
            fontFamily: 'Righteous',
            fontSize: '60px',
            color: '#FFFFFF',
            align: 'right'
        }
        

        new Button(this, 324, 350, 'button', 0, 'Back', '36px', 'gotoMenu').setOrigin(0.5, 0.5).setInteractive({useHandCursor: true});
        
        this.input.on('gameobjectup', (pointer, gameObject, event) => {
            gameObject.push();
        });
    }
}