/*
 * @Author: your name
 * @Date: 2021-02-24 23:46:28
 * @LastEditTime: 2021-03-03 23:56:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \threejs-demo\chapter-08\保存和加载场景.js
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000)
camera.position.set(0, 100, 100)
camera.lookAt(scene.position)
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
scene.add(camera);
var exporter = new THREE.SceneExporter();
var sceneLoader = new THREE.SceneLoader();


var geometry = new THREE.BoxGeometry(8, 8, 8);
var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
var mesh = new THREE.Mesh(geometry, material);
// 这里导出SpotLight灯光有点问题
var spotLight = new THREE.PointLight( 0xffffff );
spotLight.position.set(0,110,110)
spotLight.lookAt(scene.position)
// light.castShadow = true;
scene.add(spotLight)
scene.add(mesh)
render();
function render() {
    mesh.rotation.x += .1;
    mesh.rotation.y += .1;
    mesh.rotation.z += .1;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
document.getElementById('WebGL-output').appendChild(renderer.domElement);

var options = {
    save : function() {
        var sceneJson = JSON.stringify(exporter.parse(scene));
        localStorage.setItem('scene2', sceneJson)
    },
    load: function() {
        var json = localStorage.getItem('scene2');
        sceneLoader.parse(JSON.parse(json), function(e) {
            scene = e.scene;
        }, '.')
    },
    clearScene: function() {

        scene =new THREE.Scene();
    }
}
var gui = new dat.GUI();
gui.add(options, 'save').name('保存场景')
gui.add(options, 'load').name('加载场景')
gui.add(options, 'clearScene').name('清空场景')
