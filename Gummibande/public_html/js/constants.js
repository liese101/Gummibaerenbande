/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var width = 600;
var height = 400;

var FONT = "bold 20px sans-serif";
var posx = 100;
var posy = 100;
var score = 0;

var mspeed = 0.1;
var rspeed = 0.1;
var movel, mover, moveu, moved, rollr, rolll, reset, auf, ab, links, rechts = false;

var ballsize = 0.1;
var globsize = 0.075;
var currentscale = 1;


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

var ballposition = new THREE.Vector3(0, 0, 0);
//var globposition = new THREE.Vector3(Math.random()*11 - 5.5, Math.random()*7 - 3.5, 0);
var globposition = new THREE.Vector3(0, 0, 0);
var abstand = new THREE.Line3(ballposition, globposition);

