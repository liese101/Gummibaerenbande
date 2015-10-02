/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    var THREE;
    var ballposition;
    var abstand1;
    var abstand2; 
    var ende_sound;

    var scene = new THREE.Scene(); // Scene erstellt
    var camera = new THREE.OrthographicCamera( width / - 160, width / 160, height / 160, height / - 160, 1, 1000 );
    camera.position.set(0, 0, 6);
    camera.rotation.y = 0;

    var renderer = new THREE.WebGLRenderer(); //Renderer erstellt
    renderer.setSize( window.innerWidth, window.innerHeight*0.80 );
    document.body.appendChild( renderer.domElement );
    
    //Erstellen einer Plane und Hinzufügen von Bildern für Ereignisse (Sieg, unentschieden, Spielanleitung)
    var wingeo = new THREE.PlaneGeometry(17,11);
    var p1winmap = new THREE.ImageUtils.loadTexture("files/p1win.png");
    var p1winmat = new THREE.MeshBasicMaterial({map: p1winmap});
    var p2winmap = new THREE.ImageUtils.loadTexture("files/p2win.png");
    var p2winmat = new THREE.MeshBasicMaterial({map: p2winmap});
    var gleichmap = new THREE.ImageUtils.loadTexture("files/unentschieden.png");
    var gleichmat = new THREE.MeshBasicMaterial({map: gleichmap});
    var anleitungmap = new THREE.ImageUtils.loadTexture("files/anleitung.png");
    var anleitungmat = new THREE.MeshBasicMaterial({map: anleitungmap});
    
    //Meshs
    var p1win = new THREE.Mesh(wingeo, p1winmat);
    p1win.position.z = 4;
    var p2win = new THREE.Mesh(wingeo, p2winmat);
    p2win.position.z = 4;
    var gleich = new THREE.Mesh(wingeo, gleichmat);
    gleich.position.z = 4;
    var anleitung = new THREE.Mesh(wingeo, anleitungmat);
    



    camera.position.z = 6;
    
    //Text

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
    
    var text3 = document.createElement('div');
    text3.style.position = 'absolute';
    text3.style.width = 200;
    text3.style.height = 50;
    text3.style.backgroundColor = "lightblue";
    text3.innerHTML = "Spiel startet durch klicken von der Taste 'g'.";
    text3.style.top = 400 + 'px';
    text3.style.left = ((width/2)-200) + "px";
    document.body.appendChild(text3);
    text3.style.opacity = 0;
    
    
    //Function, die die Scene beim Übergang zum nächsten Spiel bereinigt
    function clearScene() {
        var i;
        for( var i = scene.children.length - 1; i >= 0; i--) {
             obj = scene.children[i];
             scene.remove(obj);
        }

    //Kameraeinstellungen für PONG und HONIGSUCHE  
    camera = new THREE.OrthographicCamera( width / - 160, width / 160, height / 160, height / - 160, 1, 1000 );
    camera.position.set(0, 0, 6);
    camera.rotation.y = 0;

    
    //Transperant machen
    textplayer.style.opacity = 0;
    text4.style.opacity = 0;
    text3.style.opacity = 0;
    
    //Kamera zurücksetzen
    camera = new THREE.OrthographicCamera( width / - 160, width / 160, height / 160, height / - 160, 1, 1000 );
    camera.position.set(0, 0, 6);
    camera.rotation.y = 0;
    
        console.log("Scene cleart");
    }
//Function, die der Scene das Bild der Spielanleitung hinzufügt, wenn der Button geklickt wird
function loadAnleitung(){
    clearScene();
    gameelli = false;
    gamemoni = false;
    gamedome = false;
    scene.add(anleitung);
    console.log("Anleitung geladen");
}
//Function die den Sieger ermittelt und ein Bild der Scene hinzufügt (Score:5)
function checkWinner(){
    if (sc1===5){
        score1 += sc1;
        sc1 = 0;
        score2 += sc2;
        sc2 = 0;
        scene.add(p1win);
            ende_sound = new THREE.Audio(listener);
            ende_sound.load("files/applaus.ogg");
            ende_sound.autoplay = true;
            camera.add(ende_sound);
        
    }
    if (sc2===5){
        scene.add(p2win);
        score1 += sc1;
        sc1 = 0;
        score2 += sc2;
        sc2 = 0;
            ende_sound = new THREE.Audio(listener);
            ende_sound.load("files/applaus.ogg");
            ende_sound.autoplay = true;
            camera.add(ende_sound);
    }

}