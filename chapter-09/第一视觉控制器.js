/*
 * @Author: your name
 * @Date: 2021-03-06 01:20:59
 * @LastEditTime: 2021-03-06 01:53:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \threejs-demo\chapter-09\飞行控制器.js
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();
camera.position.set(100,100,300);
camera.lookAt(new THREE.Vector3(0,0,0))
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(new THREE.Color(0x000, 1))


var rollControl 
// flyControl.autoForward = true;
var clock = new THREE.Clock();
render();
function render() {
    var delta = clock.getDelta();
    if (rollControl) rollControl.update(delta)
    requestAnimationFrame(render);
    renderer.render(scene, camera)
}
document.getElementById('WebGL-output').appendChild(renderer.domElement);

var loader = new THREE.OBJMTLLoader();
var texture = THREE.ImageUtils.loadTexture('./assets/texture/metro01.JPG')
loader.load('./assets/models/city.obj', './assets/models/city.mtl', load);

var mesh;
function load(obj) {
    mesh = obj
    scene.add(mesh)
    rollControl = new THREE.RollControls(camera)
rollControl.movementSpeed = 25;
rollControl.lookSpeed = 3;
}

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set(300,300,300);
scene.add(spotLight)