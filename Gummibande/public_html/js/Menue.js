/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * Hier entsteht das Menü für die Minispiele!
 * 1. Auswahlbuttom mit Spielübersicht
 * 2. Lautstärkeregelung für Hintergrundmusik und Soundeffekte
 * 3. Erklärung der Spieler
 * 4. Ggf. Namensgebung bei Spielern
 * 5. Einbauen in einer eigenen Scene (Texture oder Hintergrundfarbe im Hintergrund
 */

var THREE;

    var scene = new THREE.Scene();
    var camera = new THREE.OrthographicCamera( width / - 80, width / 80, height / 80, height / - 80, 1, 1000 );
    var renderer = new THREE.WebGLRenderer(); //Renderer erstellt
    renderer.setSize( width, height );
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: red } );
    document.body.appendChild( renderer.domElement );


