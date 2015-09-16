/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    var THREE;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 45, width/height, 0.1, 1000 );
//    var camera = new THREE.OrthographicCamera( width / - 80, width / 80, height / 80, height / - 80, 1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.SphereGeometry( ballsize );
    var geometry2 = new THREE.SphereGeometry( globsize );
    var geometryg = new THREE.BoxGeometry ( 5, 5, 10 );
    var material = new THREE.MeshBasicMaterial( {color: 0xff0000});
    var material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00});
//    var materialg = new THREE.MeshBasicMaterial( {color: 0x0000ff, wireframe: false});
    var groundtexture = new THREE.ImageUtils.loadTexture("nachttisch.jpg");
    var materialg = new THREE.MeshBasicMaterial({
        map:groundtexture,
        side:THREE.DoubleSide
    });
    
    var ball = new THREE.Mesh( geometry, material );
    var glob = new THREE.Mesh( geometry2, material2 );
    var ground = new THREE.Mesh( geometryg, materialg );
     
    scene.add( ball );
    scene.add( glob );
    scene.add (ground);

    ground.position.z = -5;
    camera.position.z = 3;
    camera.rotation.x = Math.PI/12;
//    camera.rotation.y =
    
    var text1 = document.createElement('div');
    text1.style.position = 'absolute';
    text1.style.width = 500;
    text1.style.height = 20;
    text1.style.backgroundColor = "grey";
    text1.innerHTML = "distanceToPoint: ?";
    text1.style.top = 60 + 'px';
    text1.style.left = 20 + 'px';
    document.body.appendChild(text1);
    
    var text2 = document.createElement('div');
    text2.style.position = 'absolute';
    text2.style.width = 60;
    text2.style.height = 20;
    text2.style.backgroundColor = "grey";
    text2.innerHTML = "Score: 0";
    text2.style.top = 80 + 'px';
    text2.style.left = (width/2 + 50) + 'px';
    document.body.appendChild(text2);
    
    document.addEventListener("keydown", actionStart, false);
    document.addEventListener("keyup", actionStop, false);
    
