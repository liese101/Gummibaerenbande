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
var hoehe, dm;
var ast = new Array(hoehe);
var astposition = new Array(hoehe);
var astabstand;
var spieler, score1, score2;
var topfGesammelt;


var loadGameThree = function() {
    clearScene();
    //und so weiter
};

//
//Honigtopf neu positionieren
//
var setTopf = function() {
        // Topf ist oben, und wird erreicht.
    if (topf.position.y === hoehe){
        topfGesammelt = true;
        topf.position.y = 0;
    }
        // Topf ist unten, und wird erreicht.
    else if (topf.position.y === 0 && topfGesammelt){
        spielerwechsel();
        topf.position.y = hoehe;
        topfGesammelt = false;
    }
};

var spielerwechsel = function() {
    if(spieler === 2){
        spieler = 1;
        score = score1;
        scoreAnzeigen();
    }else{
        spieler = 2;
        score = score2;
        scoreAnzeigen();
    }
};

//
//Abstand Prüfen (Bär und Honigtopf, Bär und Äste)
//
var collision = function(){
    if (abstand.distance() < (baersize+topfsize)){
            setTopf();
    }
    
    i = Math.round(baer.position.y);
    if(i < 1.5 || i > hoehe - 1.5) {        //y-Positionen 2 - 19 -> Indexe 0 - 17
        // ungültige Indexe werden abgefangen
    } else if (astabstand[i-2].distance() < 2.2){ 
        astGefunden();   
    } else {
        // hier passiert nichts
    }
};

//
//Funktionen zur Behandlung der Kollisionen Bär/Äste
//
var astGefunden = function() {
    if(moveu) {
        baer.position.y -= 0.1;
        score -= 0.1;
        scoreAnzeigen();
    }
    if(moved) {
        baer.position.y += 0.1;
        score -= 0.1;
        scoreAnzeigen();
    }
    if(rolll) {
        baer.rotation.y -= rspeed;
        baer.rotation.y %= Math.PI*2;
        baer.position.x = Math.cos(baer.rotation.y)* dm;   
        baer.position.z = Math.sin(baer.rotation.y)* dm;
        score -= 0.1;
        scoreAnzeigen();
    }
    if(rollr) {
         baer.rotation.y += rspeed;
        baer.rotation.y %= Math.PI*2;
        baer.position.x = Math.cos(baer.rotation.y)* dm;
        baer.position.z = Math.sin(baer.rotation.y)* dm;
        score -= 0.1;
        scoreAnzeigen();
    }
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
   
   // Nur zur Überprüfung, wird nicht gebraucht.
    text2.innerHTML = "Ball Rotation: " + baer.rotation.y + "<br>X: " + baer.position.x + "<br> Z: " + baer.position.z
                    + "<br>Kamera Rotation: " + camera.rotation.y
                    + "<br>X: " + camera.position.x + "<br>Z: " + camera.position.z;
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
    if (rolll) {
        baer.rotation.y += rspeed;
        baer.rotation.y %= Math.PI*2;
        baer.position.x = Math.cos(baer.rotation.y)* dm;
        baer.position.z = Math.sin(baer.rotation.y)* dm;
        //camera.rotation.y = -(baer.rotation.y);
    }

    if (rollr) {
        baer.rotation.y -= rspeed;
        baer.rotation.y %= Math.PI*2;
        baer.position.x = Math.cos(baer.rotation.y)* dm;   
        baer.position.z = Math.sin(baer.rotation.y)* dm;
        //camera.rotation.y = -(baer.rotation.y);
    }
   
//Reset
    if (reset) {
        baer.rotation.z = 1;
        baer.position.x = 1;
        baer.position.y = 0;
        baer.scale.set( 1, 1, 1);
        camera.position.set( 0, 0, 10);
    }
};

var kameraBewegen = function() {
    camera.position.y = baer.position.y;
    camera.rotation.y = (-(baer.rotation.y) + Math.PI/2)%(Math.PI*2);
    camera.position.set(baer.position.x * 10, baer.position.y, baer.position.z * 10);
};

var scoreAnzeigen = function() {
    text3.innerHTML = "Punkte: " + Math.round(score);
    text1.innerHTML = "Spieler: " + spieler + " spielt.";
};

//#######//
//Rendern//
//#######//
var render = function () {
    requestAnimationFrame( render );
    
    move();
    
    kameraBewegen();
    
    positionSet();
    
    collision();
    
    renderer.render(scene, camera);
};
