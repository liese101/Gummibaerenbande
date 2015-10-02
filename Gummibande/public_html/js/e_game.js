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
var score = 0;
var textscore, textplayer;
var currentscale;
var hoehe, dm;
var ast = new Array(hoehe);
var astposition = new Array(hoehe);
var astabstand;
var spieler, score1, score2;
var topfGesammelt;
var score1 = 0, score2 = 0;
var zeitstrafe = 0;

// Szene (alles, was das Spiel braucht)
    var plane_e = new THREE.PlaneGeometry(50, 50);
    var bodentextur = THREE.ImageUtils.loadTexture("files/waldboden.JPG");
    var bodenmat = new THREE.MeshBasicMaterial({map: bodentextur});
    var boden = new THREE.Mesh(plane_e, bodenmat);
    
    var geometry1 = new THREE.SphereGeometry( 0.1 );
    var geometry2 = new THREE.SphereGeometry( topfsize );
    var material1 = new THREE.MeshBasicMaterial( {color: 0x123456} );
    var topftextur = THREE.ImageUtils.loadTexture("files/honigtopf.JPG");
    var material2 = new THREE.MeshBasicMaterial({map: topftextur});
    
    //Baum
    var geometry3 = new THREE.CylinderGeometry( dm, dm, hoehe+1 , 32 );
    var holz = THREE.ImageUtils.loadTexture("files/holz.JPG");
    var holzmaterial = new THREE.MeshBasicMaterial({map: holz});
    var stamm = new THREE.Mesh( geometry3, holzmaterial );
    
    function aesteErstellen(){                 
        for(i = 0; i < hoehe-3; i++) {
            var geometry4 = new THREE.CylinderGeometry( 0.5, 0.1, laenge, 32 );
            var ast = new THREE.Mesh( geometry4, holzmaterial );
            
            //Berechnung der Positionen auf X- und Z-Achse
            var a = Math.random()*Math.PI*2;
            var x = Math.cos(a) * ((dm+laenge)/2);
            var z = Math.sin(a) * ((dm+laenge)/2);
            var y = i + 2;
            
            //Rotation und Verschiebung
            ast.rotateZ(Math.PI / 2);
            ast.rotateX(a);
            ast.position.set(x, y, -z);
            scene.add(ast);
            
            //Speichern der Positionen und ziehen der Linie zwischen Ast und Bär
            astposition[i] = new THREE.Vector3(x, y, -z);
            astabstand[i] = new THREE.Line3();
        }
    }       
            
    baer = new THREE.Mesh( geometry1, material1 );
    topf = new THREE.Mesh( geometry2, material2 );
    
    //Sprite für den Bären                                                      //Hier stimmt was nicht!
    var spritemap = THREE.ImageUtils.loadTexture("files/kletterbaer.png");
    var spriteMaterial = new THREE.SpriteMaterial({map: spritemap});
    var baerbild = new THREE.Sprite (spriteMaterial);
    baerbild.transparent = true;
    
    
    textplayer = document.createElement('div');
    textplayer.style.position = 'absolute';
    textplayer.style.width = 200;
    textplayer.style.height = 20;
    textplayer.style.backgroundColor = "grey";
    textplayer.innerHTML = "Spieler: " + spieler + " spielt.";
    textplayer.style.top = 150 + 'px';
    textplayer.style.left = 20 + 'px';
    document.body.appendChild(textplayer);
    textplayer.style.opacity = 0;
    
    textscore = document.createElement('div');
    textscore.style.position = 'absolute';
    textscore.style.width = 200;
    textscore.style.height = 20;
    textscore.style.backgroundColor = "grey";
    textscore.innerHTML = "Punkte: " + Math.round(score);
    textscore.style.top = 180 + 'px';
    textscore.style.left = 20 + 'px';
    document.body.appendChild(textscore);
    textscore.style.opacity = 0;
    if(gameelli) {
        textscore.style.opacity = 1;
    } else {
        textscore.style.opacity = 0;
    }

function loadGameThree(){
    
clearScene();

textscore.style.opacity = 1;
textplayer.style.opacity = 1;

gamemoni = false;
gamedome = false;
gameelli = true;

camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );
scene.add( boden );
scene.add( baer );
scene.add( topf );
scene.add( stamm );
aesteErstellen();
baer.add( baerbild );

boden.rotation.x = -Math.PI/2;
boden.position.y -= 0.1;
stamm.position.set(0, hoehe/2-0.5, 0);
topf.position.set = (0, hoehe, 0);
baer.position.set(dm, 0, 0);
camera.position.set(0, 10, 0);
//baerbild.position.x = baer.position.x;
baerbild.position.y = baer.position.y;
//baerbild.position.z = baer.position.z;

console.log("Game#3 erstellt");
}

//
//Honigtopf neu positionieren
//
var setTopf = function() {
        // Topf ist oben, und wird erreicht.
    if (topf.position.y === hoehe){
        topfGesammelt = true;
        score += 20;
        scoreAnzeigen();
        topf.position.y = 0;
    }
        // Topf ist unten, und wird erreicht.
    else if (topf.position.y === 0 && topfGesammelt){
        score += 20;
        spielerwechsel();
        topf.position.y = hoehe;
        topfGesammelt = false;
    } else if (topf.position.y === 0) {
        topf.position.y = hoehe;
    }
};

var zeit = function() {
    zeitstrafe += 0.01;
};

var spielerwechsel = function() {
    if(spieler === 2){
        score2 += scoreberechnen();
        //spieler = 1;
        //score = sc1;
        scoreAnzeigen();
        sc1 += score1;
        sc2 += score2;
        endGame();
    }else{
        score1 += scoreberechnen();
        spieler = 2;
        score = score2;
        zeitstrafe = 0;
        scoreAnzeigen();
    }
};

var scoreberechnen = function() {
    sc = Math.round(score);
    sc -= Math.round(zeitstrafe);
    if(sc < 0) {
        sc = 0;
    }
    return sc;
}

//
//Abstand Prüfen (Bär und Honigtopf, Bär und Äste)
//
var collision = function(){
    if (abstand.distance() < (baersize+topfsize)){
            setTopf();
    }
    
    i = Math.round(baer.position.y);
    if(i < 1.5 || i > hoehe - 1.5) {      //y-Positionen 2 - 19 -> Indexe 0 - 17
        // ungültige Indexe werden abgefangen
    } else if (astabstand[i-2].distance() < 2.3){ 
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
var e_positionSet = function(){
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
var e_move = function(){

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
        //baer.rotation.y = (-(baer.rotation.y) + Math.PI/2)%(Math.PI*2);
    }

    if (rollr) {
        baer.rotation.y -= rspeed;
        baer.rotation.y %= Math.PI*2;
        baer.position.x = Math.cos(baer.rotation.y)* dm;   
        baer.position.z = Math.sin(baer.rotation.y)* dm;
        //baer.rotation.y = (-(baer.rotation.y) + Math.PI/2)%(Math.PI*2);
    }
   
//Reset
    if (reset) {                                    //muss noch gemacht werden!
        baer.rotation.y = 0;
        baer.position.x = 1;
        baer.position.y = 0;
        baer.position.z = 0;
        camera.position.set( 0, 0, 10);
        camera.position.y = baer.position.y;
        camera.rotation.y = (-(baer.rotation.y) + Math.PI/2)%(Math.PI*2);
        camera.position.set(baer.position.x * 10, baer.position.y, baer.position.z * 10);
    }
};

var kameraBewegen = function() {
    camera.position.y = baer.position.y;
    camera.rotation.y = (-(baer.rotation.y) + Math.PI/2)%(Math.PI*2);
    camera.position.set(baer.position.x * 10, baer.position.y, baer.position.z * 10);
};

var scoreAnzeigen = function() {
    textscore.innerHTML = "Punkte: " + Math.round(score);
    textplayer.innerHTML = "Spieler: " + spieler + " spielt.";
};

//#######//
//Rendern//
//#######//
//var render = function () {
//    requestAnimationFrame( render );
    
//    e_move();
    
//    kameraBewegen();
    
//    e_positionSet();
    
//    collision();
    
//    renderer.render(scene, camera);
//};

