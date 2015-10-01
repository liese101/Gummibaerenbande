//var scene = new THREE.scene();

//kamera
//var aspect_ratio = window.innerWidth / window.innerHeighth;
//var camera = new THREE.PerspectiveCamera(75, aspect_ratio, 1, 10000);
//camera.position.z = 500;
////scene.add(camera);

//kamerasicht auf den bildschirm bringen
//var renderer = new THREE.CanvasRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);


//verbotene bereiche sammeln
var not_allowed = [];

//marker für objekte
var marker = new THREE.Object3D();
scene.add(marker);

//avatar-platzhalter erstellen
var cover = new THREE.MeshDepthMaterial();
var body = new THREE.SphereGeometry(100);
var avatar = new THREE.Mesh(body, cover);
scene.add(avatar);
////kopf
//var head = new THREE.SphereGeometry(75);
//var my_head = new THREE.Mesh(head, cover);
//avatar.add(my_head);
//hände
var hand = new THREE.SphereGeometry(50);
var right_hand = new THREE.Mesh(hand, cover);
right_hand.position.set(-150, 0, 0);
avatar.add(right_hand);
//hand ist dem betrachter entgegengestreckt
//right_hand.position.z = 100;
var left_hand = new THREE.Mesh(hand, cover);
left_hand.position.set(150, 0, 0);
avatar.add(left_hand);
//hand zeigt vom betrachter 
//left_hand.position.z = -100;

//füße
var foot = new THREE.SphereGeometry(50);
var right_foot = new THREE.Mesh(foot, cover);
right_foot.position.set(-75, -125, 0);
avatar.add(right_foot);
var left_foot = new THREE.Mesh(foot, cover);
left_foot.position.set(75, -125, 0);
avatar.add(left_foot);

marker.add(camera);

//avatar animieren

//3D-Uhr als Timer für Animation
var clock = new THREE.clock(true);
function animate() {
    
    requestAnimationFrame(animate);
    walk();
    acrobatics();
    turn();
    jump();
    renderer.render(scene, camera);
}
animate();

//laufen, hände und füße bewegen
function walk(){
    //falls avatar gerade nicht geht, funktion verlassen
    if (!isWalking()) return;
    //math.sin*10 generiert zahl zwischen 1 und -1, 
    //*100 ändert position-wert zwischen 100 und -100
    var position = Math.sin(clock.getElapsedTime()*10)*100;
    right_hand.position.z = position;
    left_hand.position.z = -position;
    right_foot.position.z = -position;
    left_foot.position.z = position;
}
//springen
function jump() {
    //checkFortreasure();
    animateJump();
}
//springen animieren
function animateJump() {
    new TWEEN
            .Tween({jump: 0})
            .to({jump: Math.PI}, 500)
            .onUpdate(function  () {
                marker.position.y = 200*Math.sin(this.jump);
    })
            .start();
}

//turnen
//räder schlagen lassen
var is_cartwheeling = false;
//salto machen
var is_flipping = false;
function acrobatics(){
    if (is_cartwheeling) {
        avatar.rotation.z = avatar.rotation.z +0.05;
    }
    if (is_flipping) {
        avatar.rotation.x = avatar.rotation.x +0.05;
    }
}

var is_moving_right, is_moving_left, is_moving_forward, is_moving_back;
function isWalking() {
    if (is_moving_right) return true;
    if (is_moving_left) return true;
    if (is_moving_forward) return true;
    if (is_moving_back) return true;
    return false;
}

//avatar schaut in die richtung, in die er geht
function turn () {
    var direction = 0;
    if (is_moving_forward) direction = Math.PI;
    if (is_moving_back) direction = 0;
    if (is_moving_right) direction = Math.PI/2;
    if (is_moving_left) direction = -Math.PI/2;
    //avatar.rotation.y = direction;
    
    spinAvatar(direction);
}
//drehung animieren
function spinAvatar(direction) {
    new TWEEN.
            Tween({y: avatar.rotation.y}).
            to({y: direction}, 100).
            onUpdate(function() {
                avatar.rotation.y = this.y;
    }). 
    start();
}



//testwald erstellen
makeTreeAt(500, 0);
makeTreeAt(-500, 0);
makeTreeAt(750, -1000);
makeTreeAt(-750, -1000);

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
    
    krone.position.y = 175;
    stamm.add(krone);
    
    //verbotene zone hinzufügen: avatar kann nicht durch den baum laufen
    //sperrkreis wird unter den baum gelegt
    var boundary = new THREE.Mesh(
            new THREE.CircleGeometry(300),
            new THREE.MeshNormalMaterial()
            );
    boundary.position.y = -100;
    boundary.rotation.x = -Math.PI/2;
    stamm.add(boundary);
    //in die liste verbotener bereiche speichern
    not_allowed.push(boundary);
    
    //krone auf den stamm setzen
    stamm.position.set(x, -75, z);
    scene.add(stamm);  
}

//kollisionen erkennen
function detectCollisions() {
    //vektor nach unten
    var vector = new THREE.Vector3(0, -1, 0);
    //strahl = vektor durch den marker-punkt
    var ray = new THREE.Ray(marker.position, vector);
    //grenzen eines verbotenen gebiets erkennen
    var intersects = ray.intersectsObjects(not_allowed);
    if(intersects.length > 0) return true;
    return false;
}

//entscheidung, was passiert, wenn der avatar an eine grenze stößt
avatar.addEventListener('collision', function(object) {
    if (object.isGoal) gameOver();
});



//tasten funtionen zuweisen
document.addEventListener('keydown', function(event) {
    var code = event.keyCode;
    //Pfeil links
    if (code === 37) {
        //move(-50);
        marker.position.x = marker.position.x-5;
        is_moving_left = true;
    }
    //Pfeil oben
    if (code === 38) {
        marker.position.z = marker.position.z-5;
        is_moving_forward = true;
    }
    //Pfeil rechts
    if (code === 39) {
        //move(50);
        marker.position.x = marker.position.x-5;
        is_moving_right = true;
    }
    //Pfeil unten
    if (code === 40) {
        marker.position.z = marker.position.z-5;
        is_moving_back = true;
    }
    //Taste C
    if (code === 67) is_cartwheeling = !is_cartwheeling;
    //Taste F
    if (code === 70) is_flipping = !is_flipping;    
    //leertaste
    if (code === 32) jump();
    
    //falls kollision erkannt, prüfe bewegungsrichtung. 
    //falls bewegung nach links, gehe um den selben betrag in die entgegengesetzte richtung
    if (detectCollisions()) {
        if(is_moving_left) marker.position.x = marker.position.x+5;
        if(is_moving_right) marker.position.x = marker.position.x-5;
        if(is_moving_forward) marker.position.z = marker.position.z+5;
        if(is_moving_back) marker.position.z = marker.position.z+5;
    }
});

document.addEventListener('keyup', function(event) {
    var code = event.keyCode;
    if (code === 37) is_moving_left = false;
    if (code === 38) is_moving_forward = false;
    if (code === 39) is_moving_right = false;
    if (code === 40) is_moving_back = false;
});



