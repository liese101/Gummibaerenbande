/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    var THREE;

    var scene = new THREE.Scene(); // Scene erstellt
    var camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 ); //Kamera erstellt
    var renderer = new THREE.WebGLRenderer(); //Renderer erstellt
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );
    
    var spotLight = new THREE.SpotLight(0xffffff); //Scenenlicht erstellt
    spotLight.castShadow = true;
    spotLight.position.set (20, 35, 40);
    scene.add(spotLight);



    var plane = new THREE.PlaneGeometry(50, 50);
    var bodentextur = THREE.ImageUtils.loadTexture("files/waldboden.JPG");
    var bodenmat = new THREE.MeshBasicMaterial({map: bodentextur});
    var boden = new THREE.Mesh(plane, bodenmat);
    boden.rotation.x = -Math.PI/2;
    boden.position.y -= 0.1;
    scene.add(boden);
    
    var geometry1 = new THREE.SphereGeometry( 0.1 );
    var geometry2 = new THREE.SphereGeometry( topfsize );
    var material1 = new THREE.MeshBasicMaterial( {color: 0x123456} );
    var topftextur = THREE.ImageUtils.loadTexture("files/honigtopf.JPG");
    var material2 = new THREE.MeshBasicMaterial({map: topftextur});
    
    //Baum
    var geometry3 = new THREE.CylinderGeometry( dm, dm, hoehe+1 , 32 );
    var holz = THREE.ImageUtils.loadTexture("files/holz.JPG");
    var holzmaterial = new THREE.MeshBasicMaterial({map: holz});
    var stamm = new THREE.Mesh( geometry3, holzmaterial );
    stamm.position.set(0, hoehe/2-0.5, 0);
    
    function aesteErstellen(){                 
        for(i = 0; i < hoehe-3; i++) {
            var geometry4 = new THREE.CylinderGeometry( 0.5, 0.1, laenge, 32 );
            var ast = new THREE.Mesh( geometry4, holzmaterial );
            
            //Berechnung der Positionen auf X- und Z-Achse
            var a = Math.random()*Math.PI*2;
            var x = Math.cos(a) * ((dm+laenge)/2);
            var z = Math.sin(a) * ((dm+laenge)/2);
            var y = i + 2;
            
            //Rotation und Verschiebung
            ast.rotateZ(Math.PI / 2);
            ast.rotateX(a);
            ast.position.set(x, y, -z);
            scene.add(ast);
            
            //Speichern der Positionen und ziehen der Linie zwischen Ast und Bär
            astposition[i] = new THREE.Vector3(x, y, -z);
            astabstand[i] = new THREE.Line3();
        }
    }       
            
    var baer = new THREE.Mesh( geometry1, material1 );
    var topf = new THREE.Mesh( geometry2, material2 );
    scene.add( baer );
    scene.add( topf );
    scene.add( stamm );
    aesteErstellen();
    
    //Sprite für den Bären
    var spritemap = THREE.ImageUtils.loadTexture("files/kletterbaer.png");
    var spriteMaterial = new THREE.SpriteMaterial({map: spritemap});
    var fire = new THREE.Sprite (spriteMaterial);
    fire.transparent = true;
    fire.position.x = baer.position.x;
    fire.position.y = baer.position.y;
    fire.position.z = baer.position.z;
    baer.add( fire );
    
    topf.position.y = hoehe;
    baer.position.x = dm;
    camera.position.z = 10;

    var textplayer = document.createElement('div');
    textplayer.style.position = 'absolute';
    textplayer.style.width = 200;
    textplayer.style.height = 20;
    textplayer.style.backgroundColor = "grey";
    textplayer.innerHTML = "Spieler: " + spieler + " spielt.";
    textplayer.style.top = 50 + 'px';
    textplayer.style.left = 20 + 'px';
    document.body.appendChild(textplayer);
    
    var textscore = document.createElement('div');
    textscore.style.position = 'absolute';
    textscore.style.width = 200;
    textscore.style.height = 20;
    textscore.style.backgroundColor = "grey";
    textscore.innerHTML = "Punkte: " + Math.round(score);
    textscore.style.top = 80 + 'px';
    textscore.style.left = 20 + 'px';
    document.body.appendChild(textscore);
    
    
    document.addEventListener("keydown", actionStart, false);
    document.addEventListener("keyup", actionStop, false);
    
    function clearScene() {
        var i;
        for( var i = scene.children.length - 1; i >= 0; i--) {
             obj = scene.children[i];
             scene.remove(obj);
        }
    }