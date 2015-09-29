/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var fieldwidth, fieldheight, THREE, scene, pukposition, pukabstand, pp1, pp2, obj, belongs, pukgo;

var pukgeometry = new THREE.SphereGeometry(0.24);
var pukmaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});
var p1geo = new THREE.BoxGeometry(0.35, 2,0.1);
var p1mat = new THREE.MeshBasicMaterial({color: 0x00ff00});
var p2geo = new THREE.BoxGeometry(0.35, 2,0.1);
var p2mat = new THREE.MeshBasicMaterial({color: 0xff0000});
var ppgeo = new THREE.SphereGeometry(0.20);
var ppmat = new THREE.MeshBasicMaterial({color: 0x00ffff});

var puk = new THREE.Mesh(pukgeometry, pukmaterial);
puk.rotation.z = Math.random()*1.5+1;
var p1 = new THREE.Mesh(p1geo, p1mat);
var p2 = new THREE.Mesh(p2geo, p2mat);

function loadGameFour(){
gamedome = true;
scene.add(puk);

//for (var i = -1; i <= 1; i += 0.4){
//    var pp1 = new THREE.Mesh(ppgeo, ppmat);
//    var pp2 = new THREE.Mesh(ppgeo, ppmat);
//    pp1.position.y = i;
//    pp2.position.y = i;
//    p1.add(pp1);
//    p2.add(pp2);
//}

p1.position.set(-fieldwidth+1, 0, 0);
scene.add(p1);
p2.position.set(fieldwidth-1, 0, 0);
scene.add(p2);
}

function loadGameDome(){
//    var x = -fieldwidth;
//    var y = fieldheight;
//
//    for (var i = 0; i <= fieldwidth; i += 0.5){
//        for (var j = 0; j <= 2*fieldwidth; j += 0.5){
//            if((x === -fieldwidth || x === fieldwidth) || (y === -fieldheight || y === fieldheight)){
//            borderpiece = new THREE.Mesh(piecegeometry, bordermaterial);
//            borderpiece.position.x = x;
//            borderpiece.position.y = y;
//            border.add(borderpiece);
//        }
//            x += 0.5;
//        }
//        x = -8;
//        y -= 0.5;
//    }
    
};
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

function movePuk(){
    if(pukgo){
    puk.position.x += Math.sin(-(puk.rotation.z)) * pukspeed;
    puk.position.y += Math.cos(-(puk.rotation.z)) * pukspeed;
    }
}

//function checkPlayers(){
//    if (puk.position.x < -fieldwidth+1.8){
//        for( var i = p1.children.length - 1; i >= 0; i--) {
//            obj = p1.children[i];
//            pukabstand.set(puk.position, obj.position);
////            console.log(obj + " --- " + pukabstand.distance);
//        if(pukabstand.distance <= 0.5){
//        puk.rotation.z = -(puk.rotation.z);  
//        }
//    }
//    }
//    if (puk.position.x > fieldwidth-1.8){
//        for ( var i = p2.children.length -1; i >= 0; i--) {
//            obj = p2.children[i];
//            pukabstand.set(puk.position, obj.position);
//            console.log(pukabstand.distance());
//            if(pukabstand.distance <= 0.5){
//                puk.rotation.z = -puk.rotation.z; 
//            }
//        }
//    }
//        
////    if(pukabstand.distance <= 0.5){
////        puk.rotation.z = -puk.rotation.z;  
////    }
//}

//kontakt mit Spielern prüfen
function checkPlayers(){
    if(belongs){
        if(puk.position.x < -fieldwidth+1.4 && puk.position.x > -fieldwidth+1){
            if(puk.position.y < p1.position.y+1.3 && puk.position.y > p1.position.y){
                puk.rotation.z = -(puk.rotation.z)+0.3;
                belongs = false;
                pukspeed *= 1.1;
            }
            if(puk.position.y > p1.position.y-1.3 && puk.position.y < p1.position.y){
                puk.rotation.z = -(puk.rotation.z)-0.3;
                belongs = false;
                pukspeed *= 1.1;
            }
        }
    }
    else{
        if(puk.position.x < fieldwidth-1 && puk.position.x > fieldwidth-1.4){
            if(puk.position.y < p2.position.y+1.3 && puk.position.y > p2.position.y){
                puk.rotation.z = -(puk.rotation.z)-0.3;
                belongs = true;
                pukspeed *= 1.1;
            }
            if(puk.position.y > p2.position.y-1.3 && puk.position.y < p2.position.y){
                puk.rotation.z = -(puk.rotation.z)+0.3;
                belongs = true;
                pukspeed *= 1.1;
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
    if (puk.position.x < -fieldwidth){
        belongs = true;
        puk.position.set(0,0,0);
        puk.rotation.z = Math.random()*1.5+1;
        pukspeed = 0.1;
        pukgo = false;
    }
                  
    if(puk.position.x > fieldwidth) {
        belongs = false;
        puk.position.set(0,0,0);
        puk.rotation.z = Math.random()*-1.5-1;
        pukspeed = 0.1;
        pukgo = false;
    }
    

    
    if (p1.position.y < -fieldheight)
        p1.position.y += 0.11;
    if (p1.position.y > fieldheight)
        p1.position.y -= 0.11;
    if (p2.position.y < -fieldheight)
        p2.position.y += 0.11;
    if (p2.position.y > fieldheight)
        p2.position.y -= 0.11;
    
}


