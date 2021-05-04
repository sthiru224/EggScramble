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
    }

    create(data) {
        //bgmusic
        // let PLAYmusic = this.sound.add('play_music');
        // PLAYmusic.play();

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

        this.speed = 4;

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        //bgmusic
        // let PLAYmusic = this.sound.add('play_music');
        // PLAYmusic.stop();
        // PLAYmusic.play();
        

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
            this.speed -= 0.1;
            if(this.speed < 3) this.speed = 3;
        }
        if(keyRIGHT.isDown) {
            this.speed += 0.1;
            if(this.speed > 5) this.speed = 5;
        }

        if(this.checkCollision(this.checkpoint, this.cabin) && this.checkpoint.isCollidable) {
            this.checkpoint.isCollidable = false;
            this.score += this.cargo;
            this.cargo = 0;
            this.scoreText.text = "Score: " + this.score;
            this.cargoTextB.text = this.cargo;
            this.cargoTextG.text = this.cargo;
        }
        if(this.checkCollision(this.bump, this.cabin) && this.bump.isCollidable) {
            this.bump.isCollidable = false;
            if(this.speed > 4 && this.cargo > 0) {
                this.cargo--;
                this.cargoTextB.text = this.cargo;
                this.cargoTextG.text = this.cargo;
            }
            this.cabin.bump();
            this.time.delayedCall(200, () => {this.trailer.bump();}, null, this);
        }
        if(this.checkCollision(this.cone1, this.cabin) && this.cone1.isCollidable) {
            this.cone1.alpha = 0;
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
            this.cone1.alpha = 0;
            this.cone1.isCollidable = false;
            if(this.cargo > 0) {
                this.cargo--;
                this.cargoTextB.text = this.cargo;
                this.cargoTextG.text = this.cargo;
            }
            this.trailer.bump();
        }
        if(this.checkCollision(this.cone2, this.cabin) && this.cone2.isCollidable) {
            this.cone2.alpha = 0;
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
            this.cone2.alpha = 0;
            this.cone2.isCollidable = false;
            if(this.cargo > 0) {
                this.cargo--;
                this.cargoTextB.text = this.cargo;
                this.cargoTextG.text = this.cargo;
            }
            this.trailer.bump();
        }
        if(this.checkCollision(this.egg, this.cabin) && this.egg.isCollidable) {
            this.egg.alpha = 0;
            this.egg.isCollidable = false;
            this.cargo++;
            this.cargoTextB.text = this.cargo;
            this.cargoTextG.text = this.cargo;
        }
        if(this.checkCollision(this.egg, this.trailer) && this.egg.isCollidable) {
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
}