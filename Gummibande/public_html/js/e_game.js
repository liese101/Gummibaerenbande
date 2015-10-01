/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var THREE;
var renderer, camera, scene;
var actionStart, actionStop;
var rspeed, mspeed;
var rollr, rolll, moveu, moved, reset;
var topf, baer, topfsize, baersize;
var baerposition, topfposition, abstand;
var score;
var text2, text1, text3;
var currentscale;
var ast = new Array(hoehe);
var astposition = new Array(hoehe);

//
//Honigtopf neu positionieren
//
var setTopf = function() {
    topf.position.x = 0;
    if (topf.position.y === 20){
        topf.position.y = 0;
        text3.innerHTML = "nach unten!";
    }
    else if (topf.position.y === 0){
        topf.position.y = 20;
        text3.innerHTML = "nach oben!";
    }
    text2.innerHTML = "Score: " + score;
    text1.innerHTML = "distanceToPoint: " + abstand.distance();
    score += 1;
};

//
//Abstand Prüfen (Bär und Honigtopf, Bär und Äste)
//
var collect = function(){
    if (abstand.distance() < (baersize+topfsize)){
            setTopf();
    }
    
    i = Math.round(baer.position.y);
    if(i < 2 || i > hoehe - 1) {        //y-Positionen 2 - 19 -> Indexe 0 - 17
        keinAst();
    } else if (astabstand[i-2].distance() < 2.2){ 
        astGefunden();   
    } else {
        keinAst();
    }
};

//
//Funktionen zur Behandlung der Kollisionen Bär/Äste
//
var astGefunden = function() {
    text3.innerHTML = "Ast";
};

var keinAst = function() {
    text3.innerHTML = "kein Ast";
};

//
//Positionen Aktualisieren / Linie ziehen (nur nach Bewegung)
//
var positionSet = function(){
    baerposition.set(baer.position.x, baer.position.y, baer.position.z); 
    topfposition.set(topf.position.x, topf.position.y, topf.position.z);
    abstand.set(baerposition, topfposition);
    
    baerposition.set(baer.position.x, baer.position.y, baer.position.z); 
    for(i = 0; i < hoehe-3; i++) {
        astabstand[i].set(baerposition, astposition[i]);
    } 
};

//
//Bewegung in rotierte Richtung und Rotation
//
var move = function(){

//Bewegung (mit "C" switchen, ob Camera mitläuft oder nicht.
    if (moveu) {
        if(baer.position.y <= hoehe) {
            baer.position.x += Math.sin(-(baer.rotation.z)) * mspeed;
            baer.position.y += Math.cos(-(baer.rotation.z)) * mspeed;
            camera.position.x += Math.sin(-(baer.rotation.z)) * mspeed;
            camera.position.y += Math.cos(-(baer.rotation.z)) * mspeed;
        }       
    }

    if (moved) {
        if(baer.position.y >= 0) {
            baer.position.x -= Math.sin(-(baer.rotation.z)) * mspeed;
            baer.position.y -= Math.cos(-(baer.rotation.z)) * mspeed;
            camera.position.x -= Math.sin(-(baer.rotation.z)) * mspeed;
            camera.position.y -= Math.cos(-(baer.rotation.z)) * mspeed;
        }
    }
    
//Rotation
    if (rolll === true) {
        baer.rotation.y += rspeed;
        baer.rotation.y %= Math.PI*2;
        baer.position.x = Math.cos(baer.rotation.y)* dm;
        baer.position.z = Math.sin(baer.rotation.y)* dm;  
    }

    if (rollr === true) {
        baer.rotation.y -= rspeed;
        baer.rotation.y %= Math.PI*2;
        baer.position.x = Math.cos(baer.rotation.y)* dm;   
        baer.position.z = Math.sin(baer.rotation.y)* dm;
    }
   
//Reset
    if (reset) {
        baer.rotation.z = 0;
        baer.position.x = 0;
        baer.position.y = 0;
        baer.scale.set( 1, 1, 1);
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
    
    renderer.render(scene, camera);
};
