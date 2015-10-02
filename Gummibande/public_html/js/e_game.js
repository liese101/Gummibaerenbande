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
var score1, score2;
var textplayer;
var currentscale;
var hoehe, dm;
var ast = new Array(hoehe);
var astposition = new Array(hoehe);
var astabstand;
var spieler;
var topfGesammelt;
var ascore1 = 0, ascore2 = 0;
var zeitstrafe = 0;
var zeitlaeuft;
var hintergrund_sound_e;
var eingesammelt_sound_e;
var ende_sound;
var p1win, p2win, gleich;
var text3;
var width, height;
var laenge;

// Objekte der Spielszene erstellen
    //Boden
    var plane_e = new THREE.PlaneGeometry(50, 50);
    var bodentextur = THREE.ImageUtils.loadTexture("files/waldboden.JPG");
    var bodenmat = new THREE.MeshBasicMaterial({map: bodentextur});
    var boden = new THREE.Mesh(plane_e, bodenmat);
    
    //Bär(geometry1 und material1) und Topf(geometry2 und material2)
    var geometry1 = new THREE.SphereGeometry( 0.1 ); //0.1, damit möglichst klein
    var material1 = new THREE.MeshBasicMaterial( {color: 0x251d08} );
    var geometry2 = new THREE.SphereGeometry( topfsize );
    var topftextur = THREE.ImageUtils.loadTexture("files/honigtopf.JPG");
    var material2 = new THREE.MeshBasicMaterial({map: topftextur});
    
    //Baum mit Durchmesser dm
    var geometry3 = new THREE.CylinderGeometry( dm, dm, hoehe , 32 );
    var holz = THREE.ImageUtils.loadTexture("files/holz.JPG");
    var holzmaterial = new THREE.MeshBasicMaterial({map: holz});
    var stamm = new THREE.Mesh( geometry3, holzmaterial );
    
    //Generierung der Äste nach Zufallsprinzip
    function aesteErstellen(){                 
        for(i = 0; i < hoehe-3; i++) { //für Baumhöhe-3 Äste
            var geometry4 = new THREE.CylinderGeometry( 0.5, 0.1, laenge, 32 );
            var ast = new THREE.Mesh( geometry4, holzmaterial );
            
            //Berechnung der Positionen auf X- und Z-Achse
            var a = Math.random()*Math.PI*2;        //Winkel des Asts
            var x = Math.cos(a) * ((dm+laenge)/2);  //Position auf X-Achse
            var z = Math.sin(a) * ((dm+laenge)/2);  //Position auf Z-Achse
            var y = i + 2;                          //Position auf Y-Achse (immer Index+2)
            
            //Rotation und Verschiebung angewandt
            ast.rotateZ(Math.PI / 2);
            ast.rotateX(a);
            ast.position.set(x, y, -z);
            scene.add(ast);                         //Ast zur Szene hinzugefügt
            
            //Arrays zum Speichern der Positionen und ziehen der Linie zwischen Ast und Bär
            astposition[i] = new THREE.Vector3(x, y, -z);
            astabstand[i] = new THREE.Line3();
        }
    }       
            
    //Bär und Topf erstellen
    baer = new THREE.Mesh( geometry1, material1 );
    topf = new THREE.Mesh( geometry2, material2 );
    
    //Sprite für den Bären erstellen (als 2-dimensionaler Avatar)
    var spritemap = THREE.ImageUtils.loadTexture("files/kletterbaer.png");
    var spriteMaterial = new THREE.SpriteMaterial({map: spritemap});
    var baerbild = new THREE.Sprite (spriteMaterial);
    baerbild.transparent = true;
    
    //Teftfeld für Anzeige, welcher Spieler an der Reihe ist
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
    
    
//Läd die Szene und das Spiel
function loadGameThree(){
    
clearScene();   //Szene leeren

gamemoni = false;
gamedome = false;
gameelli = true;    //Spiel freischalten

//Textfelder sichtbar schalten
text3.style.opacity = 1;
textplayer.style.opacity = 1;

spieler = 1;
ascore1 = 0;
ascore1 = 0;

//Kamera in perspektivische Kamera ändern
camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 );

//Objekte positionieren
boden.rotation.x = -Math.PI/2;
stamm.position.set(0, hoehe/2-0.5, 0);
topf.position.set(0, hoehe, 0);
baer.position.set(dm, 0.5, 0);
camera.position.set(0, 2.5, 10);

//Objekte zur Szene hinzufüegen
scene.add( boden );
scene.add( baer );
scene.add( topf );
scene.add( stamm );
aesteErstellen();
baer.add( baerbild );

//Zeitmessung ausschalten (startet erst bei Beginn des Spiels)
zeitlaeuft = false;

//Soundeffekte laden
camera.add(hintergrund_sound_e);
camera.add(eingesammelt_sound_e);
camera.add(spielerwechsel_sound);
camera.add(ende_sound);

//Ausgabe in der Konsole
console.log("Game#3 erstellt");
};

//audiolistener und sound initialisieren
var listener = new THREE.AudioListener();
camera.add(listener);
console.log("Audiolistener added");
//audio

//hintergrundgeräusche
hintergrund_sound_e = new THREE.Audio(listener);
hintergrund_sound_e.load("files/wind_forest.ogg");
hintergrund_sound_e.autoplay = true;
hintergrund_sound_e.setLoop(true);

//
//Honigtopf neu positionieren (wird nach unten gesetzt, wenn er eingesammelt wurde)
//
var setTopf = function() {
        // Topf ist oben, wird erreicht.
    if (topf.position.y === hoehe){
        topfGesammelt = true;
        eingesammelt_sound_e = new THREE.Audio(listener);
        eingesammelt_sound_e.load("files/schmatzen.ogg");
        eingesammelt_sound_e.autoplay = true;
        topf.position.y = 0;
    }
        // Topf ist unten und wurde eingesammelt
    else if (topf.position.y === 0 && topfGesammelt){
        topf.position.y = hoehe;
        topfGesammelt = false;
        spielerwechsel();
    }
        // Topf ist unten, wurde jedoch nicht eingesammelt (sollte nie vorkommen)
    else if (topf.position.y === 0) {
        topf.position.y = hoehe;
    }
};

//
//Zählt Zeitstrafpunkte hoch und aktuallisiert Textfelder
//
var zeit = function() {
    if (zeitlaeuft) {
        zeitstrafe += 0.005;
        if (spieler === 1){
            sc1 = scoreberechnen();
        }else if(spieler === 2){
            sc2 = scoreberechnen();
        }
    }
    textplayer.innerHTML = "Spieler: " + spieler + " spielt.";
};

//
//Wechselt von Spieler1 auf Spieler2 und beendet das Spiel
//
var spielerwechsel = function() {
    //wenn Spieler1 die Runde beendet
    if (spieler === 1){
        zeitlaeuft = false;
        ascore1 = scoreberechnen(); //aktueller Score von Spieler 1
        score = 0;
        zeitstrafe = 0;
        
        //Soundeffekt
        spielerwechsel_sound = new THREE.Audio(listener);
        spielerwechsel_sound.load("files/klingel.ogg");
        spielerwechsel_sound.autoplay = true;
        
        spieler = 2; //Spieler 2 beginnt...
        textplayer.innerHTML = "Spieler 2 spielt.";
        text3.style.opacity = 1; //Textfeld zum Spielbeginn wird wieder eingeblendet
        
    //wenn Spieler 2 die Runde beendet    
    }else if(spieler === 2){
        zeitlaeuft = false;
        ascore2 = scoreberechnen(); //aktueller Score von Spieler 2
        spieler = 0;
        
        //END OF GAME:
        //Wer hat gewonnen?
        if(sc1 > sc2) {
            gameelli = false;
            clearScene();
            scene.add(p1win);
        } else if (sc1 < sc2) {
            gameelli = false;
            clearScene();
            scene.add(p2win);
        } else {
            gameelli = false;
            clearScene();
            scene.add(gleich);
        }
            //Soundeffekt
            ende_sound = new THREE.Audio(listener);
            ende_sound.load("files/applaus.ogg");
            ende_sound.autoplay = true;
            camera.add(ende_sound);
            
        //Score setzen    
        sc1 = 0;
        sc2 = 0;
        score1 += ascore1;
        score2 += ascore2;
    }
};

//
//Score wird berechnet (20 Punkte abzüglich Fehler- und Zeitstrafe)
//
var scoreberechnen = function() {
    sc = Math.round(score);
    sc -= Math.round(zeitstrafe);
    sc += 20;
    if(sc < 0) {
        sc = 0;
    }
    return sc;
};

//
//Abstand prüfen (Bär und Honigtopf, Bär und Äste)
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
        baer.position.y -= 0.1; //Bär spring zurück
        score -= 0.1;           //Strafpunkte werden hinzugefügt/abgezogen
            //Soundeffekt:
            ast_sound = new THREE.Audio(listener);
            ast_sound.load("files/trommel tief.ogg");
            ast_sound.autoplay = true;
            camera.add(ast_sound);
    }
    if(moved) {
        baer.position.y += 0.1;
        score -= 0.1;
    }
    if(rolll) {
        baer.rotation.y -= rspeed;
        baer.rotation.y %= Math.PI*2;
        baer.position.x = Math.cos(baer.rotation.y)* dm;   
        baer.position.z = Math.sin(baer.rotation.y)* dm;
        score -= 0.1;
    }
    if(rollr) {
        baer.rotation.y += rspeed;
        baer.rotation.y %= Math.PI*2;
        baer.position.x = Math.cos(baer.rotation.y)* dm;
        baer.position.z = Math.sin(baer.rotation.y)* dm;
        score -= 0.1;
    }
};

//
//Positionen Aktualisieren / Linien ziehen (nur nach Bewegung)
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
//Bewegung und Rotation
//
var e_move = function(){

//Bewegung (mit W-A-S-D), wenn das Spiel (die Zeit) läuft
    if (moveu && zeitlaeuft) {
        if(baer.position.y <= hoehe) {
            baer.position.x += Math.sin(-(baer.rotation.z)) * mspeed;
            baer.position.y += Math.cos(-(baer.rotation.z)) * mspeed;
            camera.position.x += Math.sin(-(baer.rotation.z)) * mspeed;
            camera.position.y += Math.cos(-(baer.rotation.z)) * mspeed;
        }       
    }

    if (moved && zeitlaeuft) {
        if(baer.position.y >= 0) {
            baer.position.x -= Math.sin(-(baer.rotation.z)) * mspeed;
            baer.position.y -= Math.cos(-(baer.rotation.z)) * mspeed;
            camera.position.x -= Math.sin(-(baer.rotation.z)) * mspeed;
            camera.position.y -= Math.cos(-(baer.rotation.z)) * mspeed;
        }
    }
    
//Rotation/Seitwärtsbewegung
    if (rolll && zeitlaeuft) {
        baer.rotation.y += rspeed;
        baer.rotation.y %= Math.PI*2;
        baer.position.x = Math.cos(baer.rotation.y)* dm;
        baer.position.z = Math.sin(baer.rotation.y)* dm;
    }

    if (rollr && zeitlaeuft) {
        baer.rotation.y -= rspeed;
        baer.rotation.y %= Math.PI*2;
        baer.position.x = Math.cos(baer.rotation.y)* dm;   
        baer.position.z = Math.sin(baer.rotation.y)* dm;
    }
};

//
//Kamera bewegt/dreht sich mit dem Bär
//
var kameraBewegen = function() {
    camera.rotation.y = (-(baer.rotation.y) + Math.PI/2)%(Math.PI*2); //Drehung in Richtung des Bärs
    camera.position.set(baer.position.x * 10, baer.position.y + 2, baer.position.z * 10);
};