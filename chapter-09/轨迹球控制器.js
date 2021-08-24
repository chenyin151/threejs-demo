/*
 * @Author: your name
 * @Date: 2021-03-05 00:29:47
 * @LastEditTime: 2021-03-06 01:20:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \threejs-demo\chapter-09\轨迹球控制器.js
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.shadowMapEnabled = true;
renderer.setClearColor(new THREE.Color(0x000));
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.set(0,350, 150);
camera.lookAt(scene.position)
scene.add(camera);

var stackballControl = new THREE.TrackballControls(camera);
// 缩放的速度
stackballControl.zoomSpeed = 1;
// 旋转的速度
stackballControl.rotateSpeed =1;
// 平移的速度
stackballControl.panSpeed = 1;
var clock = new THREE.Clock();
render();
function render() {
    var delta = clock.getDelta();
    stackballControl.update(delta)
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
document.getElementById('WebGL-output').appendChild(renderer.domElement);
var mesh;
var load = function(object) {
    console.log('done')
    var scale = chroma.scale(['red', 'green', 'blue']);
    mesh = object;
    scene.add(mesh);
}
var loader = new THREE.OBJMTLLoader();
var texture = THREE.ImageUtils.loadTexture('./assets/texture/metro01.JPG');

loader.load('./assets/models/city.obj', './assets/models/city.mtl', load);

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set(300,300,300);
scene.add(spotLight)

var ambientLight = new THREE.AmbientLight(0x383838);
scene.add(ambientLight)

