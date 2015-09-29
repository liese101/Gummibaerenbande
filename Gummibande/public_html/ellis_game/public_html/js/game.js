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

//  unbedingt nochmal nachschauen, wie Array in ja funktionieren!!!
//  irgendwas mach ich echt falsch!
var astposition = new Array();
var astabstand = new Array();

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
//    text1.innerHTML = "distanceToPoint: " + abstand.distance();
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

//
//Kollision mit Ästen prüfen
//
//var kollision = function(){
//    for(i = 0;i < anzahlAeste;i++){
//       if (astabstand[i].distance() < (ballsize+0.25)){   //0.25 weil Ast 0.5 breit ist
//        // tu was!
//         }
//    }
//};

//
//Positionen Aktualisieren / Linie ziehen (nur nach Bewegung)
//      muss wahrscheinlich noch überarbeitet werden!!!
//
var positionSet = function(){
    
    ballposition.set(ball.position.x, ball.position.y, 0); 
    globposition.set(glob.position.x, glob.position.y, 0);
    abstand.set(ballposition, globposition);
    
//    for(i = 0;i < anzahlAeste;i++){
//        astposition[i].set(aeste[i].koordinaten.x, aeste[i].koordinaten.y, aeste[i].koordinaten.z);
//       astabstand[i].set(ballposition, astposition[i]);
//    }
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
        ball.rotation.y %= 6.28;}

    if (rollr === true) {
        ball.rotation.y += rspeed;
        ball.rotation.y %= 6.28;}

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
        
    collect();
    
    //kollision();

    renderer.render(scene, camera);
    
    
///////////
//    glob.position.x = 5.8;
//    glob.position.y = -3.9;
//    ball.position.x = 5;
//    ball.position.y += 0.1;
    
    
};
