/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    var THREE;

    var scene = new THREE.Scene(); // Scene erstellt
//    var camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 ); //Kamera erstellt
    var camera = new THREE.OrthographicCamera( width / - 80, width / 80, height / 80, height / - 80, 1, 1000 );

    var renderer = new THREE.WebGLRenderer(); //Renderer erstellt
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );
    
//    loader = new THREE.JSONLoader(); //laden von modellen aus blender 
//    loader.load('files/models/bear2.json', addModel);
    
    var spotLight = new THREE.SpotLight(0xffffff); //Scenenlicht erstellt
    spotLight.castShadow = true;
    spotLight.position.set (20, 35, 40);
    scene.add(spotLight);

    var geometry1 = new THREE.SphereGeometry( ballsize );
    var geometry2 = new THREE.SphereGeometry( globsize );
    var material1 = new THREE.MeshBasicMaterial( {color: 0xff0000});
    var material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00});
    var spritemap = THREE.ImageUtils.loadTexture("files/test_sprite.png");
    var spriteMaterial = new THREE.SpriteMaterial({map: spritemap});
    
    //Baum
    var geometry3 = new THREE.CylinderGeometry( dm, dm, hoehe, 32 );
    var material3 = new THREE.MeshBasicMaterial( {color: 0xffccdd} );
    var cylinder = new THREE.Mesh( geometry3, material3 );
    cylinder.position.set(0, hoehe/2, 0);
    
    function aesteErstellen(){
        for(i = 0; i < anzahlAeste; i++) {
            var geometry4 = new THREE.CylinderGeometry( 0.5, 0.1, laenge, 32 );
            var material4 = new THREE.MeshBasicMaterial( {color: 0xffcc00} );
            var ast = new THREE.Mesh( geometry4, material4 );
            var a = Math.random()*Math.PI*2;
            var x = Math.cos(a)* (dm+laenge)/2;   
            var z = Math.sin(a)* (dm+laenge)/2;   
            var y = Math.random()* (hoehe/anzahlAeste) + i * (hoehe/anzahlAeste);
            y = (y % (hoehe-3)) + 1.5;
            //stellt sicher, dass die Äste gleichmäßig verteilt werden.
            ast.rotateZ(Math.PI / 2);
            ast.rotateX(a);
            ast.position.set(x, y, z);
            scene.add(ast);
            
            //Koordinaten des Asts speichern im Array "aeste
            var koordinaten = new Object();
            koordinaten.x = x;
            koordinaten.y = y;
            koordinaten.z = z;
            koordinaten.i = i;
            // aeste.push(koordinaten);
            kollisionErstellen(koordinaten);
        }
    }
            
            
    var ball = new THREE.Mesh( geometry1, material1 );
    var glob = new THREE.Mesh( geometry2, material2 );
    var fire = new THREE.Sprite (spriteMaterial);
    fire.transparent = true;
    fire.position.z = 1;
    
    scene.add( ball );
    scene.add( glob );
    ball.add( fire );
    scene.add(cylinder);
    aesteErstellen();

    camera.position.z = 10;
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
    text2.style.top = 0 + 'px';
    text2.style.left = (width/2 + 50) + 'px';
    document.body.appendChild(text2);
    
    var text3 = document.createElement('div');
    text3.style.position = 'absolute';
    text3.style.width = 100;
    text3.style.height = 100;
    text3.style.backgroundColor = "grey";
    text3.innerHTML = "nach oben!";
    text3.style.top = 150 + 'px';
    text3.style.left = 150 + 'px';
    document.body.appendChild(text3);
    
    document.addEventListener("keydown", actionStart, false);
    document.addEventListener("keyup", actionStop, false);
    
//    function addModel( geometry,  materials ){
//        var material = new THREE.MeshFaceMaterial( materials );
//        bear_1 = new THREE.Mesh( geometry, material );
//        scene.add( bear_1 );
//        bear_1.position.z = -20;
//    }
    
    function clearScene() {
        var i;
        for( var i = scene.children.length - 1; i >= 0; i--) {
             obj = scene.children[i];
             scene.remove(obj);
        }
    }