/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//wald erstellen



//baum erstellen
function makeTreeAt(x, z) {
        var stamm = new THREE.Mesh (
            new THREE.CylinderGeometry (50, 50, 200),
            new THREE.MeshBasicMaterial ({color: 0xA0522D})
    );
    
    var krone = new THREE.Mesh(
            new THREE.SphereGeometry (150),
    new THREE.MeshBasicMaterial ({color: 0x228B22})
    );
    
    top.position.y = 175;
    stamm.add(krone);
    stamm.position.set(x, -75, z);
    scene.add(stamm);  
}
