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
    }

    create(data) {
        this.road = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'road').setOrigin(0, 0);
        this.road.tilePositionX = data.roadX;
        this.cone1 = new Cone(this, 648, 65, 'cone', 0, 65).setOrigin(0, 0);
        this.cone2 = new Cone(this, 704, 265, 'cone', 0, 265).setOrigin(0, 0);
        this.egg = new Egg(this, 1134, 175, 'egg', 0).setOrigin(0, 0);
        this.cabin = new Cabin(this, 156, 152, 'cabin', 0).setOrigin(0, 0);
        this.trailer = new Trailer(this, 12, 152, 'trailer', 0).setOrigin(0, 0);
        
        this.cargo = 0;
        let cargoStyle = {
            fontFamily: 'Righteous',
            fontSize: '48px',
            color: '#ffbf00',
            align: 'right'
        }
        this.cargoText = this.add.text(84, 171, this.cargo, cargoStyle).setOrigin(0.5);

        this.speed = 4;

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        this.road.tilePositionX += this.speed;

        this.cone1.update();
        this.cone2.update();
        this.egg.update();
        this.cabin.update();
        this.trailer.update();
        this.cargoText.y = this.trailer.y + 19;

        if(this.checkCollision(this.cone1, this.cabin) && this.cone1.isCollidable) {
            this.cone1.alpha = 0;
            this.cone1.isCollidable = false;
            if(this.cargo > 0) {
                this.cargo--;
                this.cargoText.text = this.cargo;
            }
        }
        if(this.checkCollision(this.cone1, this.trailer) && this.cone1.isCollidable) {
            this.cone1.alpha = 0;
            this.cone1.isCollidable = false;
            if(this.cargo > 0) {
                this.cargo--;
                this.cargoText.text = this.cargo;
            }
        }
        if(this.checkCollision(this.cone2, this.cabin) && this.cone2.isCollidable) {
            this.cone2.alpha = 0;
            this.cone2.isCollidable = false;
            if(this.cargo > 0) {
                this.cargo--;
                this.cargoText.text = this.cargo;
            }
        }
        if(this.checkCollision(this.cone2, this.trailer) && this.cone2.isCollidable) {
            this.cone2.alpha = 0;
            this.cone2.isCollidable = false;
            if(this.cargo > 0) {
                this.cargo--;
                this.cargoText.text = this.cargo;
            }
        }
        if(this.checkCollision(this.egg, this.cabin) && this.egg.isCollidable) {
            this.egg.alpha = 0;
            this.egg.isCollidable = false;
            this.cargo++;
            this.cargoText.text = this.cargo;
        }
        if(this.checkCollision(this.egg, this.trailer) && this.egg.isCollidable) {
            this.egg.alpha = 0;
            this.egg.isCollidable = false;
            this.cargo++;
            this.cargoText.text = this.cargo;
        }
    }

    checkCollision(obj1, obj2) {
        if(obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x && obj1.y < obj2.y + obj2.height && obj1.height + obj1.y > obj2.y) {
            return true;
        } else {
            return false;
        }
    }
}