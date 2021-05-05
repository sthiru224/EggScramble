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
        
        // menu click sound effects
        this.menuclick1 = scene.sound.add('menuclick1');
        this.menuclick2 = scene.sound.add('menuclick2');
    }

    push() {
        if(this.job == 'gotoPlay'){
            this.scene.scene.start('playScene', {roadX: this.scene.road.tilePositionX}), this.menuclick1.play();
            this.scene.menuMusic.stop();
            this.scene.overMusic.stop();
        }
        // if(this.job == 'gotoPlay' && scene == Menu){
        //     this.scene.scene.start('playScene', {roadX: this.scene.road.tilePositionX}), this.menuclick1.play();
        //     this.scene.menuMusic.stop();
        // }

        if(this.job == 'gotoInstructions'){
            this.scene.scene.start('instructionsScene'), this.menuclick2.play();
            this.scene.menuMusic.stop();
        }

        if(this.job == 'gotoMenu'){ 
            this.scene.scene.start('menuScene'), this.menuclick1.play();
            this.scene.overMusic.stop();
        }
    }
}