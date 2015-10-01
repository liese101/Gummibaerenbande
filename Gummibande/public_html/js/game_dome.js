/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// sämtliche Variablen laden, um Fehlermeldungen zu vermeiden
var fieldwidth, fieldheight, THREE, scene, pukposition, pukabstand, pp1, pp2, obj, belongs, pukgo, score1, score2, sc1, sc2, moveu, moved, rollr, rolll, auf, ab, links, rechts;

// Geometries / Materials definieren
var fieldgeo = new THREE.PlaneGeometry(17, 11);
var fieldmap = new THREE.ImageUtils.loadTexture("files/field.png");
var fieldmat = new THREE.MeshBasicMaterial({map:fieldmap});

var pukgeometry = new THREE.SphereGeometry(0.5, 8, 8);
var pukmap = THREE.ImageUtils.loadTexture("files/ball.jpg");
var pukmaterial = new THREE.MeshBasicMaterial({map: pukmap});

var p1geo = new THREE.BoxGeometry(0.35, 2,0.1);
var player1map = new THREE.ImageUtils.loadTexture("files/player1.png");
var p1mat = new THREE.MeshBasicMaterial ({map:player1map, transparent: true});

var p2geo = new THREE.BoxGeometry(0.35, 2,0.1);
var player2map = new THREE.ImageUtils.loadTexture("files/player2.png");
var p2mat = new THREE.MeshBasicMaterial ({map:player2map, transparent: true});

var beargeo = new THREE.BoxGeometry(1, 1.6, 0.1);
var bearmap = new THREE.ImageUtils.loadTexture("files/bear.png");
var bearmat = new THREE.MeshBasicMaterial({map:bearmap});
bearmat.transparent = true;

//Meshs erstellen
var field = new THREE.Mesh(fieldgeo, fieldmat);

var puk = new THREE.Mesh(pukgeometry, pukmaterial);
puk.rotation.z = Math.random()*1.5+1;

var bear1 = new THREE.Mesh(beargeo, bearmat);
var bear2 = new THREE.Mesh(beargeo, bearmat);

var p1 = new THREE.Mesh(p1geo, p1mat);
var p2 = new THREE.Mesh(p2geo, p2mat);


// funktion, die Spiel aufruft, Variablen entsprechend ändert und Objekte der Szene hinzufügt
function loadGameFour(){
    
clearScene();

gamemoni = false;
gameelli = false;
gamedome = true;

scene.add(field);
scene.add(puk);

bear1.position.set(-0.4, 0, 0);
p1.add(bear1);
p1.position.set(-fieldwidth+1, 0, 0);
scene.add(p1);

bear2.rotation.z = 3.1415;
bear2.position.set(+0.4, 0, 0);
p2.add(bear2);
p2.position.set(fieldwidth-1, 0, 0);
scene.add(p2);

console.log("Game#4 erstellt")
}

//Bewegung von Spieler 1 und 2
function dMove(){
//p1
    if(moveu||rolll)
        p1.position.y += 0.1;
    if(moved||rollr)
        p1.position.y -= 0.1;
    
//p2
    if(auf||rechts)
        p2.position.y += 0.1;
    if(ab||links)
        p2.position.y -= 0.1;
}

//Bewegung / Rotation vom Ball, wenn "G" gedrückt wurde
function movePuk(){
    if(pukgo){
    puk.position.x += Math.sin(-(puk.rotation.z)) * pukspeed;
    puk.position.y += Math.cos(-(puk.rotation.z)) * pukspeed;
    puk.rotation.x, puk.rotation.y += 0.1;
    }
}

//kontakt mit Spielern prüfen
function checkPlayers(){
    if(belongs){
        if(puk.position.x < -fieldwidth+1.4 && puk.position.x > -fieldwidth+0.5){
            if(puk.position.y < p1.position.y+1.3 && puk.position.y > p1.position.y){
                puk.rotation.z = -(puk.rotation.z)+0.05;
                belongs = false;
                pukspeed *= 1.05;
            }
            if(puk.position.y > p1.position.y-1.3 && puk.position.y < p1.position.y){
                puk.rotation.z = -(puk.rotation.z)-0.05;
                belongs = false;
                pukspeed *= 1.05;
            }
        }
    }
    else{
        if(puk.position.x < fieldwidth-0.5 && puk.position.x > fieldwidth-1.4){
            if(puk.position.y < p2.position.y+1.3 && puk.position.y > p2.position.y){
                puk.rotation.z = -(puk.rotation.z)-0.05;
                belongs = true;
                pukspeed *= 1.05;
            }
            if(puk.position.y > p2.position.y-1.3 && puk.position.y < p2.position.y){
                puk.rotation.z = -(puk.rotation.z)+0.05;
                belongs = true;
                pukspeed *= 1.05;
            }
        }
    }
    
}

//kontakt mit Rand / Aus prüfen
function checkBorder(){
    if (puk.position.y < -fieldheight || puk.position.y > fieldheight){
        puk.rotation.z = -(puk.rotation.z+3.1415);
        puk.rotation.z %= 6.283;
    }
    //Aus Links
    if (puk.position.x < -fieldwidth){
        belongs = true;
        puk.position.set(0,0,0);
        puk.rotation.z = Math.random()*1.5+1;
        pukspeed = 0.1;
        pukgo = false;
        sc2 += 1;
        if(sc2 === 5){
            // wechsel zum nächsten Spiel
        }
    }
    //Aus Rechts
    if(puk.position.x > fieldwidth) {
        belongs = false;
        puk.position.set(0,0,0);
        puk.rotation.z = Math.random()*-1.5-1;
        pukspeed = 0.1;
        pukgo = false;
        sc1 += 1;
        if(sc1 === 5){
            // wechsel zum nächsten Spiel
        }
    }
    
    //Verhindert, dass Spieler das Feld verlassen
    if (p1.position.y < -(fieldheight+0.5))
        p1.position.y += 0.11;
    if (p1.position.y > fieldheight+0.5)
        p1.position.y -= 0.11;
    if (p2.position.y < -(fieldheight+0.5))
        p2.position.y += 0.11;
    if (p2.position.y > fieldheight+0.5)
        p2.position.y -= 0.11;
    
}


