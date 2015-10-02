//audiolistener und sound initialisieren
var listener = new THREE.AudioListener();
camera.add(listener);
console.log("Audiolistener added");
//audio

hintergrund_sound = new THREE.Audio(listener);
hintergrund_sound.load("files/models/hintergrund_sound.ogg");
hintergrund_sound.autoplay = true;
hintergrund_sound.setLoop(true);
camera.add(hintergrund_sound);


