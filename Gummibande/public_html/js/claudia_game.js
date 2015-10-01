var THREE;
var Physijs;
var width = window.innerWidth;
var height = window.innerHeight;
aspect_ratio = width / height;

//physikeinstellungen
Physijs.scripts.ammo = 'http://gamingJS.com/ammo.js';
Physijs.scripts.worker = 'http://gamingJS.com/physijs_worker.js';
    
//szene anlegen
var scene = new Physijs.Scene({fixedTimeStep: 2 / 60});
scene.setGravity(new THREE.vector3(0, -100, 0));

//kamera
var camera = new THREE.OrtographicCamera(
        -width/2, width/2, height/2, 1, 10000
        );
camera.position.z = 500;
scene.add(camera);

//zeigen, was die kamera sieht
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeigth);
document.body.appendChild(renderer.domElement);
document.body.style.backgroundColor = '#9999aa';

//grenzen der kamera
function makeBorder(x, y, w, h) {
    var border = new Physijs.BoxMesh( 
            new THREE.CubeGeometry(w, h, 100),
            Physijs.createMaterial(
                    new THREE.MeshBasicMaterial({color: 0x000000}), 0.2, 1.0
            ),
            0
        );
        border.position.set(x, y, 0);
        return border;
}
scene.add(makeBorder(width/-2, 0, 50, height));
scene.add(makeBorder(width/2, 0, 50, height));
scene.add(makeBorder(0, height/2, width, 50));
scene.add(makeBorder(0, height/-2, width, 50));

var avatar = new Physijs.ConvexMesh(
        new THREE.CylinderGeometry(30, 30, 5, 16),
        Physijs.createMaterial(
                new THREE.MeshBasicMaterial({color:0xbb0000}), 0.2, 0.5
                )
            );

//drehung vom avatar verbieten
avatar.rotation.set(Math.PI/2, 0, 0);
//nur auf x- und y-achse bewegen
avatar.position.set(0.5 * width/2, -height/2 +25 +30, 0);
scene.add(avatar);

avatar.setAngularFactor(new THREE.Vector3(0, 0, 0)); //nicht drehen
avatar.setLinearFactor(new THREE.Vector3(1, 1, 0)); //nur auf x- und y-achse bewegen

avatar.addEventListener('collision', function(object) {
    if(object.isGoal) gameOver();
});

avatar.addEventListener("keydown", function(event) {
    var code = event.keyCode;
    if (code === 37) move(-50); //Pfeil links
    if (code === 39) move(50); //Pfeil rechts
});


//geschwindigkeitsfunktion, höchstgeschwindigkeit 200
function move(x) {
    var v_y = avatar.getLinearVelocity().y,
        v_x = avatar.getLinearVelocity().x;
        //abs = absolute Zahl, -200 = 200, deshalb nur 1 funktion für 
        //bewegung in x-Richtung
        //bewegung in y-richtung bleibt konstant, man kann nicht 
        //schneller oder langsamer fallen oder springen
        if (Math.abs(v_x + x) > 200) return;
        avatar.setLinearVelocity(
                new THREE.Vector3(v_x + x, v_y, 0)
         );
 }

//ziel bauen
var goal = new Physijs.ConvexMesh(
        new THREE.TorusGeometry(100, 25, 20, 30),
        Physijs.CreateMaterial(
                new THREE.MeshBasicMaterial({color:0x00bb00})
                ),
        0
        );
        goal.isGoal = true;

//ziel zufällig innerhalb der Grenzen platzieren
function placeGoal() {
    var x = 0,
            rand = Math.random();
    if (rand < 0.33) x = width / -2;
    if (rand > 0.66) x = width / 2;
    goal.position.set(x, height/2, 0);
    scene.add(goal);
}
placeGoal();

//rampen aus gewebe bauen
function Ramp(x, y) {
    this.mesh = new Physijs.ConvexMesh(
            new THREE.CylinderGeometry(5, heighth * 0.05, height * 0.25),
    Phisijs.createMaterial(
            new THREE.MeshBasicMaterial({color:0x0000cc}), 0.2, 1.0
            ),
            0
         );
 
         //Rampe initialisieren
         this.move(x, y);
         this.rotate(2*Math.PI*Math.random()); //zufällige Neigung
         this.listenForEvents();
}
//Rampen verschiebbar machen
Ramp.prototype.move = function(x, y) {
    this.mesh.position.x = this.mesh.position.x+x;
    this.mesh.position.y = this.mesh.position.y+y;
    //physik wird für die rampenbewegung außer kraft gesetzt
    this.mesh_dirtyRotation = true;
    this.mesh._dirtyPosition = true;
};
//Rampen drehbar machen
Ramp.prototype.rotation = function(angle) {
    this.mesh.rotation.z = this.mesh.rotation.z + angle;
    //physik wird für die rampenbewegung außer kraft gesetzt
    this.mesh_dirtyRotation = true;
    this.mesh._dirtyPosition = true;
};

//hier findet die action statt
Ramp.prototype.listenForEvents = function() {
    var me = this,
            mesh = this.mesh;
    //mausevent zufügen: rampe anklicken und verschieben
    mesh.addEventListener('drag', function(event) {
        me.move(event.x_diff, event.y_diff);
    });
    
    document.addEventListener('keydown', function(event) {
        if (!mesh.isActive) return;
        //rampe mit taste s drehen
        if (event.keyCode !== 83) return; //Taste s
        
        me.rotate(0.1);
    });
};

//testrampen anlegen
var ramp1 = new Ramp(-width/4, height/4);
scene.add(ramp1.mesh);
var ramp2 = new Ramp(width/4, -height/4);
scene.add(ramp1.mesh);

//punktetafel generieren
var scoreboard = new Scoreboard();
scoreboard.timer();
scoreboard.countdown(40);
scoreboard.help(
        "Hol den grünen Ring. " +
        "Klicke die blauen Rampen an und ziehe sie. " +
        "Klicke die blauen Rampen an und drücke die Taste S, um sie zu drehen. " +
        "Die Pfeiltasten links und rechts bewegen den Spieler. " +
        "Beeil dich!"
        );
scoreboard.onTimeExpired(function() {
    scoreboard.setMessage("Das Speil ist aus!");
    gameOver();
});

var pause = false;
function gameOver() {
    if (scoreboard.getTimeRemaining() > 0) scoreboard.
            setMessage("Gewonnen!");
    scoreboard.stopCountdown();
    scoreboard.stopTimer();
    pause = true;
}

//spiel animieren
function animate() {
    if (pause) return;
    requestAnimationFrame(animate);
    renderer.renderer(scene, camera);
}
animate();

//spielphysik
function gameStep() {
    if (pause) return;
    scene.simulate();
    //physik 60x pro sekunde aktualisieren für gleichmäßige bewegung
    setTimeout(gameStep, 1000/60);
}
gameStep();




