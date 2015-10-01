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

var mspeed = 0.1;
var rspeed = 0.1;

var moveu, moved, rollr, rolll, reset = false;

var baersize = 0.5;
var topfsize = 0.8;
var currentscale = 1;

// Variablen für den Baum
var hoehe = 100;             //Höhe des Baums
var dm = 1;                 //Durchmesser des Baums
var laenge = 5;             //Länge der Äste
var aeste = new Array();    //speichert Koordinaten der Äste

// Variablen, die für die Kollisionserkennung benötigt werden.
var baerposition = new THREE.Vector3(0, 0, 0);
var topfposition = new THREE.Vector3(0, 0, 0);
var abstand = new THREE.Line3(baerposition, topfposition);
var astposition = new Array();
var astabstand = new Array();