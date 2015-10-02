/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var scene; 

var text3 = document.createElement('div1');
    text3.style.position = 'absolute';
    text3.style.width = window.innerWidth;
    text3.style.height = 20;
    text3.style.backgroundColor = "yellow";
    text3.style.color = "black";
    text3.innerHTML = "PONG: " + "Dieses einzigartige Multiplayergame kennt doch jeder! Spieler 1 bedient seinen\n\
    Bär mit der Tastenkombination aus W-A-S-D und versucht so, den Ball nicht ins Aus fliegen zu lassen. Spieler 2 verfolgt natürlich das selbe Ziel\n\
und koordiniert seinen Bären mit I-K-J-L." + "<br>" + "HONIGJAGD: " + "Kannst du den Baum schneller erklimmen, wie dein Gegner? \n\
Gelangt dein Bär schneller zu seinem heißgeliebten Honigtopf? Probier es aus und erlebe das abenteuerlustige Spiel HONIGJAGD. Du und dein Gegner spielt \n\
nacheinander und versucht den Baum zu erklimmen, aber vorsicht: Dein Bär soll sich nicht den Kopf an den Ästen stoßen, sonst gibt's Punktabzug!" + "<br>" +
"HONIGSUCHE: " + "Dieses Spiel macht süchtig. Du suchst ein nicht sichtbares Objekt nur mit Hilfe der Schleife deines Bärs.\n\
Diese wächst und schrumpft umso mehr du dich dem unsichtbaren Objekt näherst oder dich entfernst. Hab die Schleife im Blick und besiege so deinen Gegner!";
    text3.style.top = 85 + 'px';
    document.body.appendChild(text3); 
    
    
    function loadPlayRules()
    {
        clearScene();
        scene.add(text3);
    }