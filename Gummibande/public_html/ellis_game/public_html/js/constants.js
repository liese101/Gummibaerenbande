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
var moveu, moved, rollr, rolll, reset = false;

var ballsize = 0.1;
var globsize = 0.5;
var currentscale = 1;

// Variablen für den Baum
var anzahlAeste = 15;       //Anzahl der Äste
var hoehe = 20;             //Höhe des Baums
var dm = 0.9;               //Durchmesser des Baums
var laenge = 5;             //Länge der Äste
var aeste = new Array();    //speichert Koordinaten der Äste


var ballposition = new THREE.Vector3(0, 0, 0);
//var globposition = new THREE.Vector3(Math.random()*11 - 5.5, Math.random()*7 - 3.5, 0);
var globposition = new THREE.Vector3(0, 0, 0);
var abstand = new THREE.Line3(ballposition, globposition);

var astposition = new Array();
var astabstand = new Array();