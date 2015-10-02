var THREE;
var renderer, camera, camera2, scene;
var actionStart, actionStop;
var size, growth, rspeed, mspeed;
var rollr, rolll, moveu, moved, mover, movel, reset;
var glob, ball, globsize, ballsize;
var ball1position;
var ball2position; 
var globposition;
var abstand1;
var abstand2;
var score;
var text1;
var text2;
var currentscale;
var follow = true;

//#######//
//Rendern//
//#######//
var render = function () {
    requestAnimationFrame( render );
    
    text1.innerHTML = " Score Spieler 1 // " + "Aktuell: " + sc1 + " // Gesamt: " + score1;
    text2.innerHTML = "  Score Spieler 2 // " + "Aktuell: " + sc2 + " // Gesamt: " + score2;
    
//game_moni
    if (gamemoni){
    move();
    moveTwo();
    testBorder();
    collect();
    radar();
    abstandCheck();
    }
    
    //game_dome
    if (gamedome){
    movePuk();
    checkBorder();
    checkPlayers();
    dMove();
    }
    
    if (gameelli){
    e_move();
    kameraBewegen();
    e_positionSet();
    collision();
    zeit();
    }

    renderer.render(scene, camera);
};
