/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var THREE;
var renderer, camera, scene;
var actionStart, actionStop;
var size, growth, rspeed, mspeed;
var rollr, rolll, moveu, moved, mover, movel, auf, ab, links, rechts, reset;
var globsize;
var ballsize;
var ball1position, ball2position, globposition, abstand1, abstand2, schleifensize, radarposition;
var score;
var text2, text1;
var currentscale;
var sc1 , sc2;
var follow = true;

    var geometry1 = new THREE.SphereGeometry( ballsize );
    var geometry3 = new THREE.SphereGeometry( ballsize );
    var geometry2 = new THREE.SphereGeometry( globsize );
    var geometry4 = new THREE.SphereGeometry( schleifensize);
    var material1 = new THREE.MeshBasicMaterial( {transparent: true, opacity: 0});
    var material2 = new THREE.MeshBasicMaterial( {color: 0x0000ff});
    var material3 = new THREE.MeshBasicMaterial({transparent: true, opacity: 0});
    var material4 = new THREE.MeshBasicMaterial({color: 0x00ffff});
    var bearmap = new THREE.ImageUtils.loadTexture("files/bear.png");
    var bearmat = new THREE.MeshBasicMaterial({map:bearmap, transparent:true});
    var beargeo = new THREE.BoxGeometry(1, 1.6, 0.1);
    
//    var radarmap = new THREE.ImageUtils.loadTexture("files/punkt.png");
//    var radarmat = new THREE.MeshBasicMaterial({map:radarmap, transparent: true});
//    var radargeo = new THREE.BoxGeometry(0.5, 0.5, 0.1);
    
    var schleife1map = new THREE.ImageUtils.loadTexture("files/schleife1.png");
    var schleife1mat = new THREE.MeshBasicMaterial({map:schleife1map, transparent: true});
    var schleife1geo = new THREE.BoxGeometry(0.3, 0.3, 0.2);
    
    var schleife2map = new THREE.ImageUtils.loadTexture("files/schleife2.png");
    var schleife2mat = new THREE.MeshBasicMaterial({map:schleife2map, transparent: true});
    var schleife2geo = new THREE.BoxGeometry(0.3, 0.3, 0.1);
    
    var groundgeo = new THREE.PlaneGeometry(17, 11);
    var groundmap = new THREE.ImageUtils.loadTexture("files/gras.jpg");
    var groundmat = new THREE.MeshBasicMaterial({map:groundmap});

    var ball1 = new THREE.Mesh( geometry1, material1 );
    var ball2 = new THREE.Mesh( geometry3, material3 );
    var glob = new THREE.Mesh( geometry2, material2 );
    var schleife1 = new THREE.Mesh ( schleife1geo, schleife1mat);
    var schleife2 = new THREE.Mesh ( schleife2geo, schleife2mat);
    var ground = new THREE.Mesh (groundgeo, groundmat);
    var bearp1 = new THREE.Mesh (beargeo, bearmat);
    var bearp2 = new THREE.Mesh (beargeo, bearmat);
    bearp1.rotation.z = 3.1415/2;
    bearp2.rotation.z = 3.1415/2;
    schleife1.position.z = 1.7;
    schleife2.position.z = 1.7;
    
    
    ball1.position.x = -1;
    ball2.position.x = 1;
//    r1.position.x = - 7.99;
//    r1.position.y = 3;
//    r2.position.x = 7.99;
//    r2.position.y = 3;
//    r1.position.z = -1;
//    r2.position.z = -1;
    glob.position.set(0,0,0);
     
    
//Abstand Prüfen

var collect = function(){
    if (abstand1.distance() < (ballsize+globsize)){
        globPlace();
        sc1 += 1;
        if(sc1 === 5){
            score1 = sc1;
            sc1 = 0;
            scene.add(p1win);
        }
    }
    if( abstand2.distance() < (ballsize+globsize)){
        globPlace();
        sc2 += 1;
        if(sc2 === 5){
            score2 = sc2;
            sc2 = 0;
            scene.add(p2win);
        }
        }
    };


//Positionen Aktualisieren / Linie ziehen (nur nach Bewegung)

var abstandCheck = function(){
    
    ball1position.set(ball1.position.x, ball1.position.y, 0);
    ball2position.set(ball2.position.x, ball2.position.y, 0);
    
    abstand1.set(ball1position, globposition);
    abstand2.set(ball2position, globposition);   
};



//Am Rand stoppen

var testBorder = function(){
    
    if (ball1.position.x < -8){
        ball1.position.x = -7.99;}
    if (ball1.position.x > 8){
        ball1.position.x = 7.99;}
    if (ball1.position.y > 3.5){
        ball1.position.y = 3.49;}
    if (ball1.position.y < -3.5){
        ball1.position.y = -3.49;}
    if  (ball2.position.x < -8){
        ball2.position.x = -7.99;}
    if (ball2.position.x > 8){
        ball2.position.x = 7.99;}
    if (ball2.position.y > 3.5){
        ball2.position.y = 3.49;}
    if (ball2.position.y < -3.5){
        ball2.position.y = -3.49;}
};


//Bewegung in rotierte Richtung und Rotation

var move = function(){ 
    if (moveu) {
        ball1.position.x += Math.sin(-(ball1.rotation.z)) * mspeed;
        ball1.position.y += Math.cos(-(ball1.rotation.z)) * mspeed;
    }

    if (moved) {
        ball1.position.x -= Math.sin(-(ball1.rotation.z)) * mspeed;
        ball1.position.y -= Math.cos(-(ball1.rotation.z)) * mspeed;
    }
    if (rollr === true) {
        ball1.rotation.z -= rspeed;
        ball1.rotation.z %= 6.28;}

    if (rolll === true) {
        ball1.rotation.z += rspeed;
        ball1.rotation.z %= 6.28;}
};
var moveTwo = function(){

    if (auf) {
        ball2.position.x += Math.sin(-(ball2.rotation.z)) * mspeed;
        ball2.position.y += Math.cos(-(ball2.rotation.z)) * mspeed;
    }

    if (ab) {
        ball2.position.x -= Math.sin(-(ball2.rotation.z)) * mspeed;
        ball2.position.y -= Math.cos(-(ball2.rotation.z)) * mspeed;
    }
    
//Rotation

    
    //Rotation2
    if (rechts === true) {
        ball2.rotation.z -= rspeed;
        ball2.rotation.z %= 6.28;}

    if (links === true) {
        ball2.rotation.z += rspeed;
        ball2.rotation.z %= 6.28;}

};

function globPlace(){
    
    globposition.set(Math.random()*16-8, Math.random()*7-3.5, 0);
    glob.position.set(globposition);   
}

//function spring(){
//    
//    if(r1.position.z >= -0.5 || r1.position.z < -1.5)
//    {
//        rspeed1 *= -1; 
//    }
//    
//    if(r2.position.z >= -0.5 || r2.position.z < -1.5)
//    {
//        rspeed2 *= -1;
//    }
//    
//    r1.position.z += 2*rspeed1*(22 - abstand1.distance());
//    r2.position.z += 2*rspeed2*(22 - abstand2.distance());    
//}

function radar(){ //Vergrößerung der Schleife wenn der Abstand zum Ziel (Glob) geringer ist.
    schleife1.scale.x=1+(13-abstand1.distance())/3;  //HIER die schleife statt r1
    schleife1.scale.y=1+(13-abstand1.distance())/3;  
    
    schleife2.scale.x=1+((13-abstand2.distance())/3);       // statt r2
    schleife2.scale.y=1+((13-abstand2.distance())/3);
}


function loadGameTwo(){
    clearScene();
    gamedome = false;
    gamemoni = true;
    gameelli = false;
    
    scene.add(glob);
    scene.add(ball1);
    ball1.add(bearp1);
    ball1.add( schleife1 ); // die schleife
    scene.add(ball2);
    ball2.add(bearp2);
    ball2.add (schleife2 ); // die schleife
//    scene.add(r1);
//    scene.add(r2);
    scene.add(ground);
    ground.position.z = -1;
    globPlace();
    console.log("Game#2 erstellt");
}
