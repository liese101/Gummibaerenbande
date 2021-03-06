/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Alle Variablen werden zur Fehlerbehebung geladen
var THREE;
var renderer, camera, scene;
var actionStart, actionStop;
var size, growth, rspeed, mspeed;
var rollr, rolll, moveu, moved, mover, movel, auf, ab, links, rechts, reset;
var globsize;
var ballsize;
var ball1position, ball2position, globposition, abstand1, abstand2, schleifensize, radarposition;
var score;
var text2, text1;
var currentscale;
var sc1 , sc2;
var follow = true;
var Sounds;

//soundfiles alle von www.bigsoundbank.com kosten- und lizenzfrei heruntergeladen
var hintergrund_sound;
var eingesammelt_sound;
var ende_sound;

//Geometries
var geometry1 = new THREE.SphereGeometry( ballsize );
var geometry3 = new THREE.SphereGeometry( ballsize );
var geometry2 = new THREE.SphereGeometry( globsize );
var geometry4 = new THREE.SphereGeometry( schleifensize);
//Materials  
var material1 = new THREE.MeshBasicMaterial( {transparent: true, opacity: 0});
var material2 = new THREE.MeshBasicMaterial( {color: 0x0000ff});
var material3 = new THREE.MeshBasicMaterial({transparent: true, opacity: 0});
var material4 = new THREE.MeshBasicMaterial({color: 0x00ffff});
//Textur für Bär
var bearmap = new THREE.ImageUtils.loadTexture("files/bear.png");
var bearmat = new THREE.MeshBasicMaterial({map:bearmap, transparent:true});
var beargeo = new THREE.BoxGeometry(1, 1.6, 0.1);

//Textur für springenden Radarpunkt    
//    var radarmap = new THREE.ImageUtils.loadTexture("files/punkt.png");
//    var radarmat = new THREE.MeshBasicMaterial({map:radarmap, transparent: true});
//    var radargeo = new THREE.BoxGeometry(0.5, 0.5, 0.1);

//Textur für Schleife von Spieler1
var schleife1map = new THREE.ImageUtils.loadTexture("files/schleife1.png");
var schleife1mat = new THREE.MeshBasicMaterial({map:schleife1map, transparent: true});
var schleife1geo = new THREE.BoxGeometry(0.3, 0.3, 0.2);
//Textur für Schleife von Spieler2 
var schleife2map = new THREE.ImageUtils.loadTexture("files/schleife2.png");
var schleife2mat = new THREE.MeshBasicMaterial({map:schleife2map, transparent: true});
var schleife2geo = new THREE.BoxGeometry(0.3, 0.3, 0.1);
//Textur für Boden  
var groundgeo = new THREE.PlaneGeometry(17, 11);
var groundmap = new THREE.ImageUtils.loadTexture("files/gras.jpg");
var groundmat = new THREE.MeshBasicMaterial({map:groundmap});

//Meshs
var ball1 = new THREE.Mesh( geometry1, material1 );
var ball2 = new THREE.Mesh( geometry3, material3 );
var glob = new THREE.Mesh( geometry2, material2 );
var schleife1 = new THREE.Mesh ( schleife1geo, schleife1mat);
var schleife2 = new THREE.Mesh ( schleife2geo, schleife2mat);
var ground = new THREE.Mesh (groundgeo, groundmat);
var bearp1 = new THREE.Mesh (beargeo, bearmat);
var bearp2 = new THREE.Mesh (beargeo, bearmat);

//Rotation
    bearp1.rotation.z = 3.1415/2;
    bearp2.rotation.z = 3.1415/2;
    schleife1.position.z = 1.7;
    schleife2.position.z = 1.7;
    
    ball1.position.x = -1;
    ball2.position.x = 1;
    
// Rotation für Radar
//    r1.position.x = - 7.99;
//    r1.position.y = 3;
//    r2.position.x = 7.99;
//    r2.position.y = 3;
//    r1.position.z = -1;
//    r2.position.z = -1;

    glob.position.set(0,0,0);
     
     
//Function, zum Einsammeln von Objekten und Hinzufügen von Audio

function collect()
{
    if (abstand1.distance() < (ballsize+globsize))
    {
        globPlace();
        sc1 += 1;
        eingesammelt_sound = new THREE.Audio(listener);
        eingesammelt_sound.load("files/plopp 1.ogg");
        eingesammelt_sound.autoplay = true;
        checkWinner();
    }
    if( abstand2.distance() < (ballsize+globsize))
    {
        globPlace();
        sc2 += 1;
        eingesammelt_sound = new THREE.Audio(listener);
        eingesammelt_sound.load("files/plopp 1.ogg");
        eingesammelt_sound.autoplay = true;
        checkWinner();
    }
};


//Function, die den Abstand zwischen Spielfigur und unsichtbaren Objekt misst

function abstandCheck()
{
    
    ball1position.set(ball1.position.x, ball1.position.y, 0);
    ball2position.set(ball2.position.x, ball2.position.y, 0);
    
    abstand1.set(ball1position, globposition);
    abstand2.set(ball2position, globposition);   
};



//Function, die due Spielfigur am Rand stoppen lässt

function testBorder(){
    
    if (ball1.position.x < -8)
    {
        ball1.position.x = -7.99;
    }
    if (ball1.position.x > 8)
    {
        ball1.position.x = 7.99;
    }
    if (ball1.position.y > 3.5)
    {
        ball1.position.y = 3.49;
    }
    if (ball1.position.y < -3.5)
    {
        ball1.position.y = -3.49;
    }
    if  (ball2.position.x < -8)
    {
        ball2.position.x = -7.99;
    }
    if (ball2.position.x > 8)
    {
        ball2.position.x = 7.99;
    }
    if (ball2.position.y > 3.5)
    {
        ball2.position.y = 3.49;
    }
    if (ball2.position.y < -3.5)
    {
        ball2.position.y = -3.49;
    }
};


//Function: Bewegung in rotierte Richtung und Rotation von Spieler1

function move()
{ 
    if (moveu) 
    {
        ball1.position.x += Math.sin(-(ball1.rotation.z)) * mspeed;
        ball1.position.y += Math.cos(-(ball1.rotation.z)) * mspeed;
    }

    if (moved) 
    {
        ball1.position.x -= Math.sin(-(ball1.rotation.z)) * mspeed;
        ball1.position.y -= Math.cos(-(ball1.rotation.z)) * mspeed;
    }
    if (rollr === true) 
    {
        ball1.rotation.z -= rspeed;
        ball1.rotation.z %= 6.28;
    }

    if (rolll === true) 
    {
        ball1.rotation.z += rspeed;
        ball1.rotation.z %= 6.28;
    }
};

//Function: Bewegung in rotierte Richtung und Rotation von Spieler2
function moveTwo(){

    if (auf) 
    {
        ball2.position.x += Math.sin(-(ball2.rotation.z)) * mspeed;
        ball2.position.y += Math.cos(-(ball2.rotation.z)) * mspeed;
    }

    if (ab) 
    {
        ball2.position.x -= Math.sin(-(ball2.rotation.z)) * mspeed;
        ball2.position.y -= Math.cos(-(ball2.rotation.z)) * mspeed;
    }
    
    //Rotation2
    if (rechts === true) {
        ball2.rotation.z -= rspeed;
        ball2.rotation.z %= 6.28;}

    if (links === true) {
        ball2.rotation.z += rspeed;
        ball2.rotation.z %= 6.28;}

};

//Function, die random unsichtbare Objekte verteilt
function globPlace(){
    
    globposition.set(Math.random()*16-8, Math.random()*7-3.5, 0);
    glob.position.set(globposition);   
}

//Test-Function: bevor Schleifen kamen, wurde mit schneller springenden Bällen gezeigt, wie weit der Spieler vom Objekt entfernt ist
//function spring(){
//    
//    if(r1.position.z >= -0.5 || r1.position.z < -1.5)
//    {
//        rspeed1 *= -1; 
//    }
//    
//    if(r2.position.z >= -0.5 || r2.position.z < -1.5)
//    {
//        rspeed2 *= -1;
//    }
//    
//    r1.position.z += 2*rspeed1*(22 - abstand1.distance());
//    r2.position.z += 2*rspeed2*(22 - abstand2.distance());    
//}
//
//
//Function zur Vergrößerung der Schleife, wenn der Abstand zum Zielobjekt (Glob) geringer ist.
function radar(){ 
    schleife1.scale.x=1+(13-abstand1.distance())/3;  
    schleife1.scale.y=1+(13-abstand1.distance())/3;  
    
    schleife2.scale.x=1+((13-abstand2.distance())/3);       
    schleife2.scale.y=1+((13-abstand2.distance())/3);
}



//audiolistener und sound initialisieren
var listener = new THREE.AudioListener();
camera.add(listener);
console.log("Audiolistener added");
//audio

//hintergrund_sound = new THREE.Audio(listener);
//hintergrund_sound.load("files/wiese.ogg");
//hintergrund_sound.autoplay = true;
//hintergrund_sound.setLoop(true);



//Function zum Laden des Spiels; Variablen werden geladen und Objekte der Scene hinzugefügt
function loadGameTwo(){
    clearScene();
    gamedome = false;
    gamemoni = true;
    gameelli = false;
    
    scene.add(glob);
    scene.add(ball1);
    ball1.add(bearp1);
    ball1.add( schleife1 ); 
    scene.add(ball2);
    ball2.add(bearp2);
    ball2.add (schleife2 ); 
//    test springen
//    scene.add(r1);
//    scene.add(r2);
    scene.add(ground);
    ground.position.z = -1;
    globPlace();
    camera.add(hintergrund_sound);
    camera.add(eingesammelt_sound);
    camera.add(ende_sound);
    console.log("Game#2 erstellt");
}
