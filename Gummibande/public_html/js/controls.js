/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var actionStart = function (event) {
    var keyPressed = String.fromCharCode(event.keyCode);

    switch(keyPressed){
        case "W":
            moveu = true;
            break;
        case "S":
            moved = true;  
            break;
        case "D":
            rollr = true;
            break;
        case "A":
            rolll = true;
            break;
        case "Q":
            movel = true;
            break;
        case "E":
            mover = true;
            break;
        case "K":
            reset = true;
            break;
        case "C":
            if(follow)
                follow = false;
            else
                follow = true;
            break;
        case "1":
            clearScene();
            break
        default:
            break; 


    }
};

var actionStop = function (event) {
    var keyPressed = String.fromCharCode(event.keyCode);
    switch(keyPressed){
        case "W":
            moveu = false;
            break;
        case "S":
            moved = false;  
            break;
        case "D":
            rollr = false;
            break;
        case "A":
            rolll = false;
            break;
        case "Q":
            movel = false;
            break;
        case "E":
            mover = false;
            break;
        case "K":
            reset = false;
            break;
        default:
            break; 
    }
};
