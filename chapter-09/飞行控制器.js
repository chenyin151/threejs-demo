/*
 * @Author: your name
 * @Date: 2021-03-06 01:20:59
 * @LastEditTime: 2021-03-06 01:40:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \threejs-demo\chapter-09\飞行控制器.js
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();
camera.position.set(500,50,-210);
camera.lookAt(scene.position)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(new THREE.Color(0x000, 1))


var flyControl = new THREE.FlyControls(camera)
flyControl.movementSpeed = 25;
flyControl.rollSpeed = Math.PI / 24;
// flyControl.autoForward = true;
var clock = new THREE.Clock();
render();
function render() {
    var delta = clock.getDelta();
    flyControl.update(delta)
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
}

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set(300,300,300);
scene.add(spotLight)