class Instructions extends Phaser.Scene {
    constructor() {
        super("instructionsScene");
    }

    preload() {
        this.load.image('road', './assets/road3.png');
        this.load.image('button', './assets/button2.png');
        this.load.image('instruct', './assets/GameInstructions.png');
        this.load.image('warbler', './assets/warbler.png');
        this.load.image('warbler2', './assets/warbler2.png');
    }

    create() {
        this.road = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'road').setOrigin(0, 0);
        
        let menuStyle = {
            fontFamily: 'Righteous',
            fontSize: '60px',
            color: '#FFFFFF',
            align: 'right'
        }

        this.add.sprite(324,175,"instruct");
        this.add.sprite(70,340,"warbler");
        this.add.sprite(600,80,"warbler2");
        


        new Button(this, 324, 360, 'button', 0, 'Back', '36px', 'gotoMenu').setOrigin(0.5, 0.5).setInteractive({useHandCursor: true});
        
        this.input.on('gameobjectup', (pointer, gameObject, event) => {
            gameObject.push();
        });
    }
}