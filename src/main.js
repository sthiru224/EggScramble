///////////////////////////////////////////////////////////////////////////////////////
// Collaborators: Ben Tingley, Alexander Nguyen, Swetha Thiru
// Game Title: Egg Scramble
// Date Completed: May 4, 2021
// Creative Tilt: 
//  
//
//
//
//
//
///////////////////////////////////////////////////////////////////////////////////////

let config = {
    type: Phaser.CANVAS,
    width: 648,
    height: 400,
    scene: [ Loading, Menu, Instructions, Play, GameOver ]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyLEFT, keyRIGHT, keyUP, keyDOWN;