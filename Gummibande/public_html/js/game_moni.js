/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var THREE;
var renderer, camera, scene;
var actionStart, actionStop;
var size, growth, rspeed, mspeed;
var rollr, rolll, moveu, moved, mover, movel, reset;
var globsize, ballsize;
var ball1position, ball2position, globposition, abstand1, abstand2;
var score;
var text2, text1;
var currentscale;
var follow = true;

    var geometry1 = new THREE.SphereGeometry( ballsize );
    var geometry3 = new THREE.SphereGeometry( ballsize );
    var geometry2 = new THREE.SphereGeometry( globsize );
    var material1 = new THREE.MeshBasicMaterial( {color: 0xff0000});
    var material2 = new THREE.MeshBasicMaterial( {color: 0x0000ff});
    var material3 = new THREE.MeshBasicMaterial({color: 0x00ff00});
    
    var ball1 = new THREE.Mesh( geometry1, material1 );
    var ball2 = new THREE.Mesh( geometry3, material3 );
    var glob = new THREE.Mesh( geometry2, material2 );
    
    ball1.position.x = 1;
    ball2.position.x = 2;
    glob.position.x = 3;
     
    



//Ball wachsen Lassen

var wachsen = function(x) {
            ballsize *= x;
            currentscale *= x;
            ball1.scale.set( currentscale, currentscale, currentscale);
            
};

var wachsen2 = function(x) {
            ballsize *= x;
            currentscale *= x;
            ball2.scale.set( currentscale, currentscale, currentscale);
};


//Glob neu positionieren

var moveGlob = function() {
    glob.position.x = Math.random()*11 - 5.5;
    glob.position.y = Math.random()*7 - 3.5;
    text2.innerHTML = "Score: " + score;
    text1.innerHTML = "distanceToPoint: " + abstand.distance();
    score += 1;
};


//Abstand Prüfen

var collect = function(){
    if (abstand.distance() < (ballsize+globsize)){
        moveGlob();
        wachsen(1.1);
    }
};


//Positionen Aktualisieren / Linie ziehen (nur nach Bewegung)

var abstandCheck = function(){
    
    ball1position.set(ball1.position.x, ball1.position.y, 0);
    ball2position.set(ball2.position.x, ball2.position.y, 0);
    abstand1.set(ball1position, globposition);
    abstand2.set(ball2position, globposition);
    
    
    
};



//Nach dem Rand wiederholen

var repeatBorder = function(){
    
    if (ball1.position.x > 5.8){
        ball1.position.x = -5.7;}
    if (ball1.position.x < -5.8){
        ball1.position.x = 5.7;}
    if (ball1.position.y > 3.9){
        ball1.position.y = -3.8;}
    if (ball1.position.y < -3.9){
        ball1.position.y = 3.8;}
};

var repeatBorder2 = function(){
    
    if (ball2.position.x > 5.8){
        ball2.position.x = -5.7;}
    if (ball2.position.x < -5.8){
        ball2.position.x = 5.7;}
    if (ball2.position.y > 3.9){
        ball2.position.y = -3.8;}
    if (ball2.position.y < -3.9){
        ball2.position.y = 3.8;}
};


//Bewegung in rotierte Richtung und Rotation

var move = function(){

  
        if (moveu) {
            ball1.position.x += Math.sin(-(ball1.rotation.z)) * mspeed;
            ball1.position.y += Math.cos(-(ball1.rotation.z)) * mspeed;
        }

        if (moved) {
            ball1.position.x -= Math.sin(-(ball1.rotation.z)) * mspeed;
            ball1.position.y -= Math.cos(-(ball1.rotation.z)) * mspeed;
        }

        if (movel) {
            ball1.position.x -= Math.cos((ball1.rotation.z)) * mspeed;
            ball1.position.y -= Math.sin((ball1.rotation.z)) * mspeed;
        }

        if (mover) {
            ball1.position.x += Math.cos((ball1.rotation.z)) * mspeed;
            ball1.position.y += Math.sin((ball1.rotation.z)) * mspeed;
        }
        };
    var moveTwo = function(){

        if (auf) {
            ball2.position.x += Math.sin(-(ball2.rotation.z)) * mspeed;
            ball2.position.y += Math.cos(-(ball2.rotation.z)) * mspeed;
        }

        if (ab) {
            ball2.position.x -= Math.sin(-(ball2.rotation.z)) * mspeed;
            ball2.position.y -= Math.cos(-(ball2.rotation.z)) * mspeed;
        }

        if (links) {
            ball2.position.x -= Math.cos((ball2.rotation.z)) * mspeed;
            ball2.position.y -= Math.sin((ball2.rotation.z)) * mspeed;
        }

        if (rechts) {
            ball2.position.x += Math.cos((ball2.rotation.z)) * mspeed;
            ball2.position.y += Math.sin((ball2.rotation.z)) * mspeed;
        }
//Rotation
    if (rollr === true) {
        ball1.rotation.z -= rspeed;
        ball1.rotation.z %= 6.28;}

    if (rolll === true) {
        ball1.rotation.z += rspeed;
        ball1.rotation.z %= 6.28;}
    
    //Rotation2
    if (rollr === true) {
        ball2.rotation.z -= rspeed;
        ball2.rotation.z %= 6.28;}

    if (rolll === true) {
        ball2.rotation.z += rspeed;
        ball2.rotation.z %= 6.28;}

};

function loadGameTwo(){
    gamedome = false;
    gamemoni = true;
    scene.add(glob);
    scene.add(ball1);
    scene.add(ball2);
    console.log("Game#2 erstellt");
}
