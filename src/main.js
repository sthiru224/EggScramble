let config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 1000,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
// reserve keyboard vars
let keyLEFT, keyRIGHT, keyUP, keyDOWN;
let borderUISize = game.config.height / 50;
let borderPadding = borderUISize / 10;