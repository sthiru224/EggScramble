class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('road', './assets/road3.png');
        this.load.image('cabin', './assets/cabin1.png');
        this.load.image('trailer', './assets/trailer1.png');
        this.load.image('cone', './assets/cone1.png');
        this.load.image('egg', './assets/egg1.png');
        this.load.image('bump', './assets/bump1.png');
        this.load.image('checkpoint', './assets/checkpoint1.png');
        this.load.image('hole', './assets/hole1.png');

        this.load.spritesheet('coneexplode', './assets/conecrush.png', {frameWidth: 24, frameheight: 32, startFrame: 0, endFrame: 12});
    }

    create(data) {
        this.playMusic = this.sound.add('play_music',{volume:0.25,loop:true});
        this.playMusic.play();

        this.road = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'road').setOrigin(0, 0);
        this.road.tilePositionX = data.roadX;
        this.checkpoint = new Checkpoint(this, 99999, 50, 'checkpoint', 0).setOrigin(0, 0);
        this.hole = new Hole(this, -106, -106, 'hole', 0).setOrigin(0, 0);
        this.bump = new Bump(this, -28, 43, 'bump', 0).setOrigin(0, 0);
        this.cone1 = new Cone(this, 648, 65, 'cone', 0, 65).setOrigin(0, 0);
        this.cone2 = new Cone(this, 704, 265, 'cone', 0, 265).setOrigin(0, 0);
        this.cone2.resetter = true;
        this.egg = new Egg(this, 1134, 175, 'egg', 0).setOrigin(0, 0);
        this.cabin = new Cabin(this, 156, 152, 'cabin', 0).setOrigin(0, 0);
        this.trailer = new Trailer(this, 12, 152, 'trailer', 0).setOrigin(0, 0);
        
        this.cargo = 0;
        let cargoStyleB = {
            fontFamily: 'Righteous',
            fontSize: '48px',
            color: '#000000',
            align: 'right'
        }
        this.cargoTextB = this.add.text(84, 171, this.cargo, cargoStyleB).setOrigin(0.5);
        let cargoStyleG = {
            fontFamily: 'Righteous',
            fontSize: '40px',
            color: '#ffbf00',
            align: 'right'
        }
        this.cargoTextG = this.add.text(84, 171, this.cargo, cargoStyleG).setOrigin(0.5);

        this.score = 0;
        let scoreStyle = {
            fontFamily: 'Righteous',
            fontSize: '60px',
            color: '#FFFFFF',
            align: 'right'
        }
        this.scoreText = this.add.text(516, 24, "Score: " + this.score, scoreStyle).setOrigin(0.5);

        this.maxTime = 30;
        this.curTime = this.maxTime;
        this.timerText = this.add.text(100, 24, "0:" + this.curTime, scoreStyle).setOrigin(0.5);
        this.timer();

        this.speed = 16;

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // animation config
        this.anims.create({
            key: 'coneexplode',
            frames: this.anims.generateFrameNumbers('coneexplode', { start: 0, end: 12, first: 0}),
            frameRate: 30
            });
    }

    update() {

        this.road.tilePositionX += this.speed;

        this.checkpoint.update();
        this.hole.update();
        this.bump.update();
        this.cone1.update();
        this.cone2.update();
        this.egg.update();
        this.cabin.update();
        this.trailer.update();
        this.cargoTextB.y = this.trailer.y + 19;
        this.cargoTextG.y = this.trailer.y + 19;

        if(keyLEFT.isDown) {
            this.speed -= 0.4;
            if(this.speed < 12) this.speed = 12;
        }
        if(keyRIGHT.isDown) {
            this.speed += 0.4;
            if(this.speed > 20) this.speed = 20;
        }

        if(this.checkCollision(this.checkpoint, this.cabin) && this.checkpoint.isCollidable) {
            this.checkpoint.isCollidable = false;
            if(this.maxTime > 23) this.maxTime -= 2;
            this.curTime = this.maxTime;
            this.timerText.text = '0:' + this.curTime;
            this.score += this.cargo;
            this.cargo = 0;
            this.scoreText.text = "Score: " + this.score;
            this.cargoTextB.text = this.cargo;
            this.cargoTextG.text = this.cargo;
        }
        if(this.checkCollision(this.hole, this.cabin) && this.hole.isCollidable) {
            this.sound.play('hole');
            this.hole.isCollidable = false;
            this.playMusic.stop();
            this.scene.start('gameOverScene', {roadX: this.road.tilePositionX, score: this.score});
        }
        if(this.checkCollision(this.hole, this.trailer) && this.hole.isCollidable) {
            this.sound.play('hole');
            this.hole.isCollidable = false;
            this.playMusic.stop();
            this.scene.start('gameOverScene', {roadX: this.road.tilePositionX, score: this.score});
        }
        if(this.checkCollision(this.bump, this.cabin) && this.bump.isCollidable) {
            this.sound.play('bump1');
            this.bump.isCollidable = false;
            if(this.speed > 16 && this.cargo > 0) {
                this.cargo--;
                this.cargoTextB.text = this.cargo;
                this.cargoTextG.text = this.cargo;
            }
            this.cabin.bump();
            this.time.delayedCall(200, () => {this.trailer.bump();}, null, this);
        }
        if(this.checkCollision(this.cone1, this.cabin) && this.cone1.isCollidable) {
            this.sound.play('cone1');
            // this.cone1.alpha = 0;
            console.log('OK');
            this.coneExplode(this.cone1);
            this.cone1.isCollidable = false;
            if(this.cargo > 0) {
                this.cargo--;
                this.cargoTextB.text = this.cargo;
                this.cargoTextG.text = this.cargo;
            }
            this.cabin.bump();
            this.time.delayedCall(200, () => {this.trailer.bump();}, null, this);
        }
        if(this.checkCollision(this.cone1, this.trailer) && this.cone1.isCollidable) {
            this.sound.play('cone1');
            // this.cone1.alpha = 0;
            console.log('OK');
            this.coneExplode(this.cone1);
            this.cone1.isCollidable = false;
            if(this.cargo > 0) {
                this.cargo--;
                this.cargoTextB.text = this.cargo;
                this.cargoTextG.text = this.cargo;
            }
            this.trailer.bump();
        }
        if(this.checkCollision(this.cone2, this.cabin) && this.cone2.isCollidable) {
            this.sound.play('cone2');
            // this.cone2.alpha = 0;
            this.coneExplode(this.cone2);
            this.cone2.isCollidable = false;
            if(this.cargo > 0) {
                this.cargo--;
                this.cargoTextB.text = this.cargo;
                this.cargoTextG.text = this.cargo;
            }
            this.cabin.bump();
            this.time.delayedCall(200, () => {this.trailer.bump();}, null, this);
        }
        if(this.checkCollision(this.cone2, this.trailer) && this.cone2.isCollidable) {
            this.sound.play('cone2');
            // this.cone2.alpha = 0;
            this.coneExplode(this.cone2);
            this.cone2.isCollidable = false;
            if(this.cargo > 0) {
                this.cargo--;
                this.cargoTextB.text = this.cargo;
                this.cargoTextG.text = this.cargo;
            }
            this.trailer.bump();
        }
        if(this.checkCollision(this.egg, this.cabin) && this.egg.isCollidable) {
            this.sound.play('eggcollect');
            this.egg.alpha = 0;
            this.egg.isCollidable = false;
            this.cargo++;
            this.cargoTextB.text = this.cargo;
            this.cargoTextG.text = this.cargo;
        }
        if(this.checkCollision(this.egg, this.trailer) && this.egg.isCollidable) {
            this.sound.play('eggcollect');
            this.egg.alpha = 0;
            this.egg.isCollidable = false;
            this.cargo++;
            this.cargoTextB.text = this.cargo;
            this.cargoTextG.text = this.cargo;
        }
    }

    checkCollision(obj1, obj2) {
        if(obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x && obj1.y < obj2.y + obj2.height && obj1.height + obj1.y > obj2.y) {
            return true;
        } else {
            return false;
        }
    }

    spawnObstacle() {
        let random = Math.random();
        if(random < 0.5) {
            this.cone1.reset(-56);
            this.cone2.reset(0);
            this.cone2.resetter = true;
        } else if(random < 0.75) {
            this.cone1.reset(-134);
            this.hole.reset(0);
            this.hole.resetter = true;
        } else {
            this.bump.reset(0);
            this.bump.resetter = true;
        }
    }

    timer() {
        this.time.delayedCall(1000, () => {
            if(this.curTime == 0) {
                this.sound.play('hole');
                this.playMusic.stop();
                this.scene.start('gameOverScene', {roadX: this.road.tilePositionX, score: this.score});
            }
            this.curTime--;
            if(this.curTime > 9) this.timerText.text = '0:' + this.curTime;
            else this.timerText.text = '0:0' + this.curTime;
            this.timer();
        }, null, this);
    }

    coneExplode(cone) {
        cone.alpha = 0;
        console.log('CONE');

        let boom = this.add.sprite(cone.x, cone.y, 'coneexplode').setOrigin(0,0);
        boom.anims.play('coneexplode');
        boom.on('animationcomplete', () => {
            boom.destroy();
        });
    }
}