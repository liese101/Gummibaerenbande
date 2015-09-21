/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    var geometry1 = new THREE.SphereGeometry( ballsize );
    var geometry2 = new THREE.SphereGeometry( globsize );
    var material1 = new THREE.MeshBasicMaterial( {color: 0xff0000});
    var material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00});
    
    var ball = new THREE.Mesh( geometry1, material1 );
    var glob = new THREE.Mesh( geometry2, material2 );
     
    scene.add( ball );
    scene.add( glob );


