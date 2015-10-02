/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
var text3;
var currentscale;
var follow = true;

//
//Ball wachsen Lassen
//
//var wachsen = function(x) {
//            ballsize *= x;
//            currentscale *= x;
//            ball.scale.set( currentscale, currentscale, currentscale);
//};

//
//Glob neu positionieren
//
//var moveGlob = function() {
//    glob.position.x = Math.random()*11 - 5.5;
//    glob.position.y = Math.random()*7 - 3.5;
//    text2.innerHTML = "Score: " + score;
////    text1.innerHTML = "distanceToPoint: " + abstand.distance();
//    score += 1;
//};

//
//Abstand Prüfen
//
//var collect = function(){
//    if (abstand.distance() < (ballsize+globsize)){
//        moveGlob();
//        wachsen(1.1);
//    }
//};

//
//Positionen Aktualisieren / Linie ziehen (nur nach Bewegung)
//
//var positionSet = function(){
//    
//    ballposition.set(ball.position.x, ball.position.y, 0); 
//    globposition.set(glob.position.x, glob.position.y, 0);
//    abstand.set(ballposition, globposition);
//};

//
//Nach dem Rand wiederholen
//
//var repeatBorder = function(){
//    
//    if (ball.position.x > 5.8){
//        ball.position.x = -5.7;}
//    if (ball.position.x < -5.8){
//        ball.position.x = 5.7;}
//    if (ball.position.y > 3.9){
//        ball.position.y = -3.8;}
//    if (ball.position.y < -3.9){
//        ball.position.y = 3.8;}
//};

//
//Bewegung in rotierte Richtung und Rotation
//
//var move = function(){

//Bewegung (mit "C" switchen, ob Camera mitläuft oder nicht.
//    if(follow) {
//        if (moveu) {
//            ball.position.x += Math.sin(-(ball.rotation.z)) * mspeed;
//            ball.position.y += Math.cos(-(ball.rotation.z)) * mspeed;
//            camera.position.x += Math.sin(-(ball.rotation.z)) * mspeed;
//            camera.position.y += Math.cos(-(ball.rotation.z)) * mspeed;
//        }
//
//        if (moved) {
//            ball.position.x -= Math.sin(-(ball.rotation.z)) * mspeed;
//            ball.position.y -= Math.cos(-(ball.rotation.z)) * mspeed;
//            camera.position.x -= Math.sin(-(ball.rotation.z)) * mspeed;
//            camera.position.y -= Math.cos(-(ball.rotation.z)) * mspeed;
//        }
//
//        if (movel) {
//            ball.position.x -= Math.cos((ball.rotation.z)) * mspeed;
//            ball.position.y -= Math.sin((ball.rotation.z)) * mspeed;
//            camera.position.x -= Math.cos((ball.rotation.z)) * mspeed;
//            camera.position.y -= Math.sin((ball.rotation.z)) * mspeed;
//        }
//
//        if (mover) {
//            ball.position.x += Math.cos((ball.rotation.z)) * mspeed;
//            ball.position.y += Math.sin((ball.rotation.z)) * mspeed;
//            camera.position.x += Math.cos((ball.rotation.z)) * mspeed;
//            camera.position.y += Math.sin((ball.rotation.z)) * mspeed;
//        }
//    }
//    else{     
//        if (moveu) {
//            ball.position.x += Math.sin(-(ball.rotation.z)) * mspeed;
//            ball.position.y += Math.cos(-(ball.rotation.z)) * mspeed;
//        }
//
//        if (moved) {
//            ball.position.x -= Math.sin(-(ball.rotation.z)) * mspeed;
//            ball.position.y -= Math.cos(-(ball.rotation.z)) * mspeed;
//        }
//
//        if (movel) {
//            ball.position.x -= Math.cos((ball.rotation.z)) * mspeed;
//            ball.position.y -= Math.sin((ball.rotation.z)) * mspeed;
//        }
//
//        if (mover) {
//            ball.position.x += Math.cos((ball.rotation.z)) * mspeed;
//            ball.position.y += Math.sin((ball.rotation.z)) * mspeed;
//        }
//    }
////Rotation
//    if (rollr === true) {
//        ball.rotation.z -= rspeed;
//        ball.rotation.z %= 6.28;}
//
//    if (rolll === true) {
//        ball.rotation.z += rspeed;
//        ball.rotation.z %= 6.28;}
//
////Reset
//    if (reset) {
//        ball.rotation.z = 0;
//        ball.position.x = 0;
//        ball.position.y = 0;
//        ball.scale.set( 1, 1, 1);
//        camera.position.set( 0, 0, 3);
//    }
//};


//#######//
//Rendern//
//#######//
var render = function () {
    requestAnimationFrame( render );
    
//    text1.innerHTML = "P1: " + moveu + " _ " + moved + " _ " + rolll + " _ " + rollr + " </br>P2: " + auf + " _ " + ab + " _ " + links + " _ " + rechts;
//    text1.innerHTML = "pukrotation: " + puk.rotation.z;
//    text2.innerHTML = "Score P1: " + sc1 + " / " + "Score P2: " + sc2;
    text1.innerHTML = " Score Spieler 1 // " + "Aktuell: " + sc1 + " // Gesamt: " + (score1 + sc1);
    text2.innerHTML = "  Score Spieler 2 // " + "Aktuell: " + sc2 + " // Gesamt: " + (score2 + sc2);
    
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
    
    
///////////
//    glob.position.x = 5.8;
//    glob.position.y = -3.9;
//    ball.position.x = 5;
//    ball.position.y += 0.1;
    
    
};
