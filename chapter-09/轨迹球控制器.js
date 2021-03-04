/*
 * @Author: your name
 * @Date: 2021-03-05 00:29:47
 * @LastEditTime: 2021-03-05 00:48:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \threejs-demo\chapter-09\轨迹球控制器.js
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xaaaaff));
renderer.setSize(window.innerWidth, window.innerHeight)

scene.add(camera);
render();
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
document.getElementById('WebGL-output').appendChild(renderer.domElement);

var load = function(object) {
    var scale = chroma.scale(['red', 'green', 'blue']);
    mesh = object;
    scene.add(mesh);
}
var loader = new THREE.OBJMTLLoader();
var texture = THREE.ImageUtils.loadTexture('../assets/texture/metro01.JPG');
// loader.load('../assets/model/city.obj', '../assets/models/city.mtl', load);