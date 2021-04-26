class Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, text, size, job) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        let buttonStyle = {
            fontFamily: 'Righteous',
            fontSize: size,
            color: '#000000',
            align: 'right'
        }
        scene.add.text(x, y, text, buttonStyle).setOrigin(0.5);

        this.job = job;
    }

    push() {
        if(this.job == 'gotoPlay') this.scene.scene.start('playScene', {roadX: this.scene.road.tilePositionX});
        if(this.job == 'gotoInstructions') this.scene.scene.start('instructionsScene');
        if(this.job == 'gotoMenu') this.scene.scene.start('menuScene');
    }
}