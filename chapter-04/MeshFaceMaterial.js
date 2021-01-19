/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-28 15:09:49
 * @LastEditors: cy
 * @LastEditTime: 2020-12-28 15:21:18
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0xaaaaff, 1));
camera.position.set(0, 10, 50);
scene.add(camera);
camera.lookAt(scene.position)

var box = createBox();
function createBox() {
    var geometry = new THREE.BoxGeometry(4,4,4);
    var matArray = [];
    matArray.push(new THREE.MeshBasicMaterial({ color: 0x009e60 }))
    matArray.push(new THREE.MeshBasicMaterial({ color: 0x009e60 }))
    matArray.push(new THREE.MeshBasicMaterial({ color: 0x0051ba }))
    matArray.push(new THREE.MeshBasicMaterial({ color: 0x0051ba }))
    matArray.push(new THREE.MeshBasicMaterial({ color: 0xffd500 }))
    matArray.push(new THREE.MeshBasicMaterial({ color: 0xffd500 }))
    matArray.push(new THREE.MeshBasicMaterial({ color: 0xff5800 }))
    matArray.push(new THREE.MeshBasicMaterial({ color: 0xff5800 }))
    matArray.push(new THREE.MeshBasicMaterial({ color: 0xc41e3a }))
    matArray.push(new THREE.MeshBasicMaterial({ color: 0xc41e3a }))
    matArray.push(new THREE.MeshBasicMaterial({ color: 0xffffff }))
    matArray.push(new THREE.MeshBasicMaterial({ color: 0xffffff }))
    var material = new THREE.MeshFaceMaterial(matArray)
    var box = new THREE.Mesh(geometry, material);
    scene.add(box);
    return box;
}

var step = 0;
render();
function render() {
    requestAnimationFrame(render);
    step += .005;
    box.rotation.x = step;
    renderer.render(scene, camera);
}

document.getElementById('WebGL-output').appendChild(renderer.domElement);
