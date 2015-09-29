/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var invisgeometry = new THREE.SphereGeometry(0.1);
var invismaterial = new THREE.MeshBasicMaterial({color:0x00ff00});
invismaterial.wireframe = true;

var piecegeometry = new  THREE.SphereGeometry(0.25);
var bordermaterial = new THREE.MeshBasicMaterial({color: 0xff0000});

var pukgeometry = new THREE.SphereGeometry(0.24);
var pukmaterial = new THREE.MeshBasicMaterial({color: 0x0000ff});

var puk = new THREE.Mesh(pukgeometry, pukmaterial);
puk.rotation.z = 0;
var border = new THREE.Mesh(invisgeometry, invismaterial);

//scene.add(puk);
//scene.add(border);

function loadGameElli(){
    var x = -7;
    var y = 4;

    for (var i = 0; i <= 8; i += 0.5){
        for (var j = 0; j <= 14; j += 0.5){
            if((x === -7 || x === 7) || (y === -4 || y === 4)){
            borderpiece = new THREE.Mesh(piecegeometry, bordermaterial);
            borderpiece.position.x = x;
            borderpiece.position.y = y;
            //border.add(borderpiece);
        }
            x += 0.5;
        }
        x = -7;
        y -= 0.5;
    }
};


function checkBorder(){
    for( var i = border.children.length - 1; i >= 0; i--) {
        obj = border.children[i];
        
   }
}

loadGameElli();
