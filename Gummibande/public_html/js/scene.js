/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    var THREE;

    var scene = new THREE.Scene(); // Scene erstellt
    var camera = new THREE.PerspectiveCamera( 45, width/height, 0.1, 1000 ); //Kamera erstellt
//    var camera = new THREE.OrthographicCamera( width / - 80, width / 80, height / 80, height / - 80, 1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );
    
    loader = new THREE.JSONLoader();
    loader.load('files/models/bear2.json', addModel);
    
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.castShadow = true;
    spotLight.position.set (20, 35, 40);
    scene.add(spotLight);

    var geometry1 = new THREE.SphereGeometry( ballsize );
    var geometry2 = new THREE.SphereGeometry( globsize );
    var material1 = new THREE.MeshBasicMaterial( {color: 0xff0000});
    var material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00});
    
    var ball = new THREE.Mesh( geometry1, material1 );
    var glob = new THREE.Mesh( geometry2, material2 );
     
    scene.add( ball );
    scene.add( glob );

    camera.position.z = 3;
    camera.lookAt(ballposition);            //zentriert auf den Player
//    camera.rotation.x = Math.PI/12;       //fixe Rotation
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
    
    function addModel( geometry,  materials ){
        var material = new THREE.MeshFaceMaterial( materials );
        bear_1 = new THREE.Mesh( geometry, material );
        scene.add( bear_1 );
        bear_1.position.z = -20;
    }
    
    function clearScene() {
        var i;
        for( var i = scene.children.length - 1; i >= 2; i--) {
             obj = scene.children[i];
             scene.remove(obj);
        }
    }