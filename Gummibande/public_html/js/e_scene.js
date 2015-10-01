/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    var THREE;

    var scene = new THREE.Scene(); // Scene erstellt
    var camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 1000 ); //Kamera erstellt
//    var camera = new THREE.OrthographicCamera( width / - 80, width / 80, height / 80, height / - 80, 1, 1000 );

    var renderer = new THREE.WebGLRenderer(); //Renderer erstellt
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );
    
    
    var spotLight = new THREE.SpotLight(0xffffff); //Scenenlicht erstellt
    spotLight.castShadow = true;
    spotLight.position.set (20, 35, 40);
    scene.add(spotLight);

    var geometry1 = new THREE.SphereGeometry( baersize );
    var geometry2 = new THREE.SphereGeometry( topfsize );
    var material1 = new THREE.MeshBasicMaterial( {color: 0xff0000});
    var material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00});
    
    //Baum
    var geometry3 = new THREE.CylinderGeometry( dm, dm, hoehe, 32 );
    var material3 = new THREE.MeshBasicMaterial( {color: 0xffccdd} );
    var cylinder = new THREE.Mesh( geometry3, material3 );
    cylinder.position.set(0, hoehe/2, 0);
    
    function aesteErstellen(){                 
        for(i = 0; i < hoehe-3; i++) {
            var geometry4 = new THREE.CylinderGeometry( 0.5, 0.1, laenge, 32 );
            var material4 = new THREE.MeshBasicMaterial( {color: 0xffcc00} );
            var ast = new THREE.Mesh( geometry4, material4 );
            
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
    scene.add(cylinder);
    aesteErstellen();

    camera.position.z = 10;
    camera.lookAt(baerposition);

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
    text2.style.width = 600;
    text2.style.height = 50;
    text2.style.backgroundColor = "grey";
    text2.innerHTML = "Score: 0";
    text2.style.top = 0 + 'px';
    text2.style.left = (width/2 + 50) + 'px';
    document.body.appendChild(text2);
    
    var text3 = document.createElement('div');
    text3.style.position = 'absolute';
    text3.style.width = 60;
    text3.style.height = 20;
    text3.style.backgroundColor = "grey";
    text3.innerHTML = "nach oben!";
    text3.style.top = 150 + 'px';
    text3.style.left = 150 + 'px';
    document.body.appendChild(text3);
    
    document.addEventListener("keydown", actionStart, false);
    document.addEventListener("keyup", actionStop, false);
    
    function clearScene() {
        var i;
        for( var i = scene.children.length - 1; i >= 0; i--) {
             obj = scene.children[i];
             scene.remove(obj);
        }
    }