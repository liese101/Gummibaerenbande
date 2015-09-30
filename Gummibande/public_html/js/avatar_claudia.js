

/* global THREE */

//avatar-platzhalter erstellen
var cover = new THREE.MeshDepthMaterial();
var body = new THREE.SphereGeometry(100);
var avatar = new THREE.Mesh(body, cover);
scene.add(avatar);
//kopf
var head = new THREE.SphereGeometry(75);
var my_head = new THREE.Mesh(head, cover);
avatar.add(my_head);
//hände
var hand = new THREE.SphereGeometry(50);
var right_hand = new THREE.Mesh(hand, cover);
right_hand.position.set(-150, 0, 0);
avatar.add(right_hand);
var left_hand = new THREE.Mesh(hand, cover);
left_hand.position.set(150, 0, 0);
avatar.add(left_hand);

//füße
var foot = new THREE.SphereGeometry(50);
var right_foot = new THREE.Mesh(foot, cover);
right_foot.position.set(-75, -125, 0);
avatar.add(right_foot);
var left_foot = new THREE.Mesh(foot, cover);
left_foot.position.set(75, -125, 0);
avatar.add(left_foot);

//avatar animieren
//räder schlagen lassen
var is_cartwheeling = false;
function animate() {
    requestAnimationFrame(animate);
    if (is_cartwheeling) {
        avatar.rotation.z = avatar.rotation.z +0.05;
    }
        renderer.render(scene, camera);
}
animate();

//salto machen
var is_flipping = false;
function animate() {
    requestAnimationFrame(animate);
    if (is_flipping) {
        avatar.rotation.x = avatar.rotation.z +0.05;
    }
        renderer.render(scene, camera);
}
animate();

//drehen
var is_turning = false;
function animate() {
    requestAnimationFrame(animate);
    if (is_turning) {
        avatar.rotation.y = avatar.rotation.z +0.05;
    }
        renderer.render(scene, camera);
}
animate();






