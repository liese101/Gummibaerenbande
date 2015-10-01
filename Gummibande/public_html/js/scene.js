/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    var THREE;
    var ballposition;
    var abstand1;
    var abstand2; 

    var scene = new THREE.Scene(); // Scene erstellt
//    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight*0.9, 0.1, 1000 ); //Kamera erstellt
    var camera = new THREE.OrthographicCamera( width / - 160, width / 160, height / 160, height / - 160, 1, 1000 );

    var renderer = new THREE.WebGLRenderer(); //Renderer erstellt
    renderer.setSize( window.innerWidth, window.innerHeight*0.80 );
    document.body.appendChild( renderer.domElement );
    
    loader = new THREE.JSONLoader(); //laden von modellen aus blender 
    loader.load('files/models/bear2.json', addModel);
//    
//    var spotLight = new THREE.SpotLight(0xffffff); //Scenenlicht erstellt
//    spotLight.castShadow = true;
//    spotLight.position.set (20, 35, 40);
//    scene.add(spotLight);

//    var geometry1 = new THREE.SphereGeometry( ballsize );
//    var geometry2 = new THREE.SphereGeometry( globsize );
//    var material1 = new THREE.MeshBasicMaterial( {color: 0xff0000});
//    var material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00});
//    var spritemap = THREE.ImageUtils.loadTexture("files/test_sprite.png");
//    var spriteMaterial = new THREE.SpriteMaterial({map: spritemap});
//    
//    
//    var ball = new THREE.Mesh( geometry1, material1 );
//    var glob = new THREE.Mesh( geometry2, material2 );
//    var fire = new THREE.Sprite (spriteMaterial);
//    fire.transparent = true;
//    fire.position.z = 1;
    
//    scene.add( ball );
//    scene.add( glob );
//   ball.add( fire );

    camera.position.z = 6;
    //camera.lookAt(0, 0, 0);
//    camera.lookAt(ballposition2);//zentriert auf den Player
//    camera.rotation.x = Math.PI/12;       //fixe Rotation
//    camera.rotation.y =
    
    var text1 = document.createElement('div');
    text1.style.position = 'absolute';
    text1.style.width = window.innerWidth;
    text1.style.height = 20;
    text1.style.backgroundColor = "yellow";
    text1.style.color = "black";
    text1.innerHTML = "Abstand1: " + abstand1.distance;
    text1.style.top = 65 + 'px';
    document.body.appendChild(text1);
    
    var text2 = document.createElement('div');
    text2.style.position = 'absolute';
    text2.style.width = window.innerWidth;
    text2.style.height = 20;
    text2.style.backgroundColor = "yellow";
    text2.style.color = "black";
    text2.innerHTML = "Abstand2: " + abstand2.distance;
    text2.style.top = 85 + 'px';
    document.body.appendChild(text2);
    
    document.addEventListener("keydown", actionStart, false);
    document.addEventListener("keyup", actionStop, false);
    
    function addModel( geometry,  materials ){
        var material = new THREE.MeshFaceMaterial( materials );
        bear_1 = new THREE.Mesh( geometry, material );
        bear_1.scale.set(0.4, 0.4, 0.4);

        bear_2 = new THREE.Mesh( geometry, material );
        bear_2.scale.set(0.4, 0.4, 0.4);
        
        bear_3 = new THREE.Mesh( geometry, material );
        bear_3.scale.set(0.4, 0.4, 0.4);
        bear_3.rotation.z = -3.1415/2;
        bear_3.position.x = -0.5;
        
        bear_4 = new THREE.Mesh( geometry, material );
        bear_4.scale.set(0.4, 0.4, 0.4);
        bear_4.rotation.z = 3.1415/2;
        bear_4.position.x = 0.5
        
        
        
        ball1.add(bear_1);
        ball2.add(bear_2);
        p1.add(bear_3);
        p2.add(bear_4);
    }
    
    function clearScene() {
        var i;
        for( var i = scene.children.length - 1; i >= 0; i--) {
             obj = scene.children[i];
             scene.remove(obj);
        }
        console.log("Scene cleart");
    }
    
    function endGame() {
        
    }