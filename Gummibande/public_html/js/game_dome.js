/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var fieldwidth, fieldheight, THREE, scene, pukposition, pukabstand;

var pukgeometry = new THREE.SphereGeometry(0.24);
var pukmaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});
var p1geo = new THREE.SphereGeometry(0.35);
var p1mat = new THREE.MeshBasicMaterial({color: 0x00ff00});
var p2geo = new THREE.SphereGeometry(0.35);
var p2mat = new THREE.MeshBasicMaterial({color: 0xff0000});

var puk = new THREE.Mesh(pukgeometry, pukmaterial);
puk.rotation.z = Math.random()*6.283;
var p1 = new THREE.Mesh(p1geo, p1mat);
p1.position.set(-fieldwidth+1, 0, 0);
var p2 = new THREE.Mesh(p2geo, p2mat);
p2.position.set(fieldwidth-1, 0, 0);

function loadGameFour(){
gamedome = true;
scene.add(puk);
scene.add(p1);
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
    puk.position.x += Math.sin(-(puk.rotation.z)) * pukspeed;
    puk.position.y += Math.cos(-(puk.rotation.z)) * pukspeed;
}

function checkPlayers(){
//    for( var i = border.children.length - 1; i >= 0; i--) {
//        obj = border.children[i];
//        pukabstand.set(puk.position, obj.position);
//        console.log(obj + " --- " + pukabstand.distance);
        
//        if(pukabstand.distance <= 1)
//            puk.position.set(0, 0, 0);
        
   }
//}


function checkBorder(){
    if (puk.position.y < -fieldheight || puk.position.y > fieldheight){
        puk.rotation.z = -(puk.rotation.z+3.1415);
        puk.rotation.z %= 6.283;
    }
    if (puk.position.x < -fieldwidth || puk.position.x > fieldwidth) {
        puk.rotation.z = -(puk.rotation.z);
        puk.rotation.z %= 6.283;
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


