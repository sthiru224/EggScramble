let config = {
    type: Phaser.CANVAS,
    width: 648,
    height: 400,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyLEFT, keyRIGHT, keyUP, keyDOWN;