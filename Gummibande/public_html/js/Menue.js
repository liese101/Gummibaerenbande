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
    var scene = document.getElementById("scene");
    
    function spiel_auswahl()
    function update_auswahl()
    {
    var kategorieAuswahl = document.forms.verzeichnis.kategorie;
    var unterkategorieAuswahl = document.forms.verzeichnis.unterkategorie;
    unterkategorieAuswahl.options.length = 0; // DropDown Menü entleeren

       if (kategorieAuswahl.options
    [kategorieAuswahl.selectedIndex].
    value == "Email")
    {
    unterkategorieAuswahl.options[0] = new Option("Software");
    unterkategorieAuswahl.options[1] = new Option("Anbieter");
    }
    else if (kategorieAuswahl.options
    [kategorieAuswahl.selectedIndex].
    value == "Internet")
    {
    unterkategorieAuswahl.options[0] = new Option("Internetzugang");
    unterkategorieAuswahl.options[1] = new Option("Webseiten erstellen");
    }
    }
    
    


