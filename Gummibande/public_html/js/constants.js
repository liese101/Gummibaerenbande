/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var width = window.innerWidth;
var height = window.innerHeight;

var FONT = "bold 20px sans-serif";
var posx = 100;
var posy = 100;
var score = 0;
var rspeed = 0.1;
var radarsize = 0.2;

var mspeed = 0.1;
var rspeed1 = 0.005;
var rspeed2 = 0.005;
var movel, mover, moveu, moved, rollr, rolll, reset, auf, ab, links, rechts, pukgo = false;

var ball1, ball2, glob;

var ballsize = 0.2;
var globsize = 1;
var currentscale = 1;

var score1, score2 = 0;
var sc1 = 0;
var sc2 = 0;


//game_moni
var gamemoni = false;

//game_claudi
var gameclaudi = false;

//game_elli
var gameelli = false;

//game_dome
var pukspeed = 0.1;
var fieldwidth = 7;
var fieldheight = 4;
var pukposition = new THREE.Vector3(0, 0, 0);
var pukabstand = new THREE.Line3();
var gamedome = false;
var belongs = true;

var ball1position = new THREE.Vector3(0, 0, 0);
var ball2position = new THREE.Vector3(0, 0, 0);
//var globposition = new THREE.Vector3(Math.random()*11 - 5.5, Math.random()*7 - 3.5, 0);
var globposition = new THREE.Vector3(0, 0, 0);
var abstand1 = new THREE.Line3(ball1position, globposition);//((ball1.position.x, ball1.position.y, ball1.position.z), (glob.position.x, glob.position.y, glob.position.z));
var abstand2 = new THREE.Line3(ball2position, globposition);//((ball2.position.x, ball2.position.y, ball2.position.z), (glob.position.x, glob.position.y, glob.position.z));


