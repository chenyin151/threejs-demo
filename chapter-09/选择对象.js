/*
 * @Author: your name
 * @Date: 2021-03-04 22:35:58
 * @LastEditTime: 2021-03-05 00:16:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \threejs-demo\chapter-08\选择对象.js
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( new THREE.Color(0xaaaaff));

camera.position.set(-30, 40, 30)
scene.add(camera)
render();
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
var root = document.getElementById('WebGL-output')
root.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(5, 5, 5, 3, 3, 3);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
var box = new THREE.Mesh(geometry, material);
box.position.set(-9,3,0)
scene.add(box)

camera.lookAt(scene.position)

var projector = new THREE.Projector();
document.addEventListener('mousedown', function(evt) {
    console.log('click', evt.clientX)
    var vector = new THREE.Vector3((evt.clientX / window.innerWidth) * 2 - 1, -(evt.clientY / window.innerHeight) * 2 + 1, 0.5);
    vector = vector.unproject(camera);
    // vector.sub(camera.position).normalize() vector向量减去摄像机的位置得到一个向量并标准化
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects([box]);
    console.log('xxx', intersects)
    if (intersects.length > 0) {
        console.log(intersects[0]);
        intersects[0].object.material.transparent = true;
        intersects[0].object.material.opacity = 0.1;
   }
})