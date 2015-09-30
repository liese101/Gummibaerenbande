/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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
