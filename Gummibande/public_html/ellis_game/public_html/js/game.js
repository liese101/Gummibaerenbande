/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var THREE;
var renderer, camera, scene;
var actionStart, actionStop;
var size, growth, rspeed, mspeed;
var rollr, rolll, moveu, moved, reset;
var glob, ball, globsize, ballsize;     //glob=ziel, ball=bär
var ballposition, globposition, abstand;
var score;
var text2, text1, text3;
var currentscale;
var follow = true;
var ast = new Array(anzahlAeste);
var astposition = new Array(anzahlAeste);

//
//Glob neu positionieren
//
var setGlob = function() {
    glob.position.x = 0;
    if (glob.position.y === 20){
        glob.position.y = 0;
        text3.innerHTML = "nach unten!";
    }
    else if (glob.position.y === 0){
        glob.position.y = 20;
        text3.innerHTML = "nach oben!";
    }
    text2.innerHTML = "Score: " + score;
    text1.innerHTML = "distanceToPoint: " + abstand.distance();
    score += 1;
};

//
//  Hier sollen die Kollisionserkennungen für die Äste entstehen...
//
var kollisionErstellen = function(koordinaten) {
    // koordinaten.x, koordinaten.y, koordinaten.z, koordinaten.i (i ist index)
    astposition[koordinaten.i] = new THREE.Vector3(koordinaten.x, koordinaten.y, koordinaten.z);
    astabstand[koordinaten.i] = new THREE.Line3(ballposition, astposition[koordinaten.i]);
    
    //ast[koordinaten.i].x = koordinaten.x;
    //ast[koordinaten.i].y = koordinaten.y;
    //ast[koordinaten.i].z = koordinaten.z;
    
};

//
//Abstand Prüfen
//
var collect = function(){
    for(i = 0; i < anzahlAeste; i++) {
        if (abstand.distance() < (ballsize+globsize)){
            setGlob();
        }
    }
};

var collect2 = function(){
    for(i = 0; i < anzahlAeste; i++) {
        if (astabstand[i].distance() < (ballsize+globsize)){
            setGlob();
        }
        
    }
};

//
//Positionen Aktualisieren / Linie ziehen (nur nach Bewegung)
//
var positionSet = function(){
    
    ballposition.set(ball.position.x, ball.position.y, 0); 
    globposition.set(glob.position.x, glob.position.y, 0);
    abstand.set(ballposition, globposition);
    
};

//Funktioniert nicht D:
var positionSet2 = function(){
    
    ballposition.set(ball.position.x, ball.position.y, 0); 
    for(i = 0; i < anzahlAeste; i++) {
        astabstand[i].set(ballposition, astposition[i]);
    } 
};

//
//Bewegung in rotierte Richtung und Rotation
//
var move = function(){

//Bewegung (mit "C" switchen, ob Camera mitläuft oder nicht.
    if(follow) {
        if (moveu) {
            if(ball.position.y <= hoehe) {
                ball.position.x += Math.sin(-(ball.rotation.z)) * mspeed;
                ball.position.y += Math.cos(-(ball.rotation.z)) * mspeed;
                camera.position.x += Math.sin(-(ball.rotation.z)) * mspeed;
                camera.position.y += Math.cos(-(ball.rotation.z)) * mspeed;
            }
            
        }

        if (moved) {
            if(ball.position.y >= 0) {
                ball.position.x -= Math.sin(-(ball.rotation.z)) * mspeed;
            ball.position.y -= Math.cos(-(ball.rotation.z)) * mspeed;
            camera.position.x -= Math.sin(-(ball.rotation.z)) * mspeed;
            camera.position.y -= Math.cos(-(ball.rotation.z)) * mspeed;
            }
            
        }
    }
    else{     
        if (moveu) {
            ball.position.x += Math.sin(-(ball.rotation.z)) * mspeed;
            ball.position.y += Math.cos(-(ball.rotation.z)) * mspeed;
        }

        if (moved) {
            ball.position.x -= Math.sin(-(ball.rotation.z)) * mspeed;
            ball.position.y -= Math.cos(-(ball.rotation.z)) * mspeed;
        }
    }
//Rotation
    if (rolll === true) {
        ball.rotation.y -= rspeed;
        ball.rotation.y %= 6.28;
        //Kamera mitdrehen
    }

    if (rollr === true) {
        ball.rotation.y += rspeed;
        ball.rotation.y %= 6.28;
        //Kamera mitdrehen
    }

//Reset
    if (reset) {
        ball.rotation.z = 0;
        ball.position.x = 0;
        ball.position.y = 0;
        ball.scale.set( 1, 1, 1);
        camera.position.set( 0, 0, 3);
    }
};





//#######//
//Rendern//
//#######//
var render = function () {
    requestAnimationFrame( render );
    
    //text1.innerHTML = puk.rotation.z + " ___ " + border.children.length;
    
    move();
    
    positionSet();  
    positionSet2();
        
    collect();
    collect2();

    renderer.render(scene, camera);
    
    
///////////
//    glob.position.x = 5.8;
//    glob.position.y = -3.9;
//    ball.position.x = 5;
//    ball.position.y += 0.1;
    
    
};
