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
var glob, ball, globsize, ballsize;     //glob=Honigtopf, ball=Bär
var ballposition, globposition, abstand;
var score;
var text2, text1, text3;
var currentscale;
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
//Abstand Prüfen
//
var collect = function(){
    if (abstand.distance() < (ballsize+globsize)){
            setGlob();
    }
};

var collect2 = function(){
    i = Math.round(ball.position.y);
    if(i < 2 || i > hoehe - 1) {        //y-Positionen 2 - 19 -> Indexe 0 - 17
        keinAst();
    } else if (astabstand[i-2].distance() < 2.2){ 
        astGefunden();   
    } else {
        keinAst();
    }
};

var astGefunden = function() {
    text3.innerHTML = "Ast";
    //var x = astposition[i].x;
    //var y = astposition[i].y;
    //var z = astposition[i].z;
};

var keinAst = function() {
    text3.innerHTML = "kein Ast";
};

//
//Positionen Aktualisieren / Linie ziehen (nur nach Bewegung)
//
var positionSet = function(){
    
    ballposition.set(ball.position.x, ball.position.y, ball.position.z); 
    globposition.set(glob.position.x, glob.position.y, ball.position.z);
    abstand.set(ballposition, globposition);
    
};

var positionSet2 = function(){
    
    ballposition.set(ball.position.x, ball.position.y, ball.position.z); 
    for(i = 0; i < anzahlAeste; i++) {
        astabstand[i].set(ballposition, astposition[i]);
    } 
};

//
//Bewegung in rotierte Richtung und Rotation
//
var move = function(){

//Bewegung (mit "C" switchen, ob Camera mitläuft oder nicht.
    
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
    
//Rotation
    if (rolll === true) {
        ball.rotation.y += rspeed;
        ball.rotation.y %= Math.PI*2;
                                                            //Kamera mitdrehen
        ball.position.x = Math.cos(ball.rotation.y)* dm;
        ball.position.z = Math.sin(ball.rotation.y)* dm;
            //y = (y % (hoehe-3)) + 1.5;
            //stellt sicher, dass die Äste gleichmäßig verteilt werden.
           
    }

    if (rollr === true) {
        ball.rotation.y -= rspeed;
        ball.rotation.y %= Math.PI*2;
        ball.position.x = Math.cos(ball.rotation.y)* dm;   
        ball.position.z = Math.sin(ball.rotation.y)* dm;
        //Kamera mitdrehen
    }
   
//Reset
    if (reset) {
        ball.rotation.z = 0;
        ball.position.x = 0;
        ball.position.y = 0;
        ball.scale.set( 1, 1, 1);
        camera.position.set( 0, 0, 10);
    }
};

//#######//
//Rendern//
//#######//
var render = function () {
    requestAnimationFrame( render );
    
    move();
    
    positionSet();
    
    collect();
    
    positionSet2();
    
    collect2();
    
    renderer.render(scene, camera);
};
