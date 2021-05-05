///////////////////////////////////////////////////////////////////////////////////////
// Collaborators: Ben Tingley, Alexander Nguyen, Swetha Thiru
//
// Game Title: Egg Scramble
//
// Date Completed: May 4, 2021
//
// Creative Tilt: 
// Our game has an interesting aspect to its mechanics which is the player having to 
// hold the collected eggs and maintaining it until the checkpoint for the points to 
// register to the score. We also went towards a different direction with the obstacles
// because we included ones that dealt with both the time limit and the health of the
// eggs that are in the temporary inventory, instead of simply programming obstacles that 
// subtract from a health pool.
//
// With the visuals and music, we went for a clean aesthetic that follows along the 
// egg theme that relates to the context of the game. The music, specifically, was 
// inspired by the electronic music style in the game "Geometry Dash", which overall
// adds to the aesthetics.
///////////////////////////////////////////////////////////////////////////////////////

let config = {
    type: Phaser.CANVAS,
    width: 648,
    height: 400,
    scene: [ Loading, Menu, Instructions, Credits, Play, GameOver ]
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyLEFT, keyRIGHT, keyUP, keyDOWN;