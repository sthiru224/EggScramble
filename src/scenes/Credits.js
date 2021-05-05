class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {
        let creditsStyle = {
            fontFamily: 'Righteous',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'right'
        }
        this.add.text(324, 125, 'Story & Music         Swetha Thiru', creditsStyle).setOrigin(0.5);
        this.add.text(324, 200, 'SFX         Alexander Nguyen', creditsStyle).setOrigin(0.5);
        this.add.text(324, 275, 'Art & Programming         Ben Tingley', creditsStyle).setOrigin(0.5);
        creditsStyle.fontSize = '12px';
        this.add.text(324, 310, 'Photo used to create hole art credit to Kaipo Honda', creditsStyle).setOrigin(0.5);
        new Button(this, 324, 360, 'button', 0, 'Back', '36px', 'gotoMenu').setOrigin(0.5, 0.5).setInteractive({useHandCursor: true});
        this.input.on('gameobjectup', (pointer, gameObject, event) => {
            gameObject.push();
        });
    }
}