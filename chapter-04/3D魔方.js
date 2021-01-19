/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-28 15:25:52
 * @LastEditors: cy
 * @LastEditTime: 2020-12-28 15:35:59
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0xaaaaff, 1));
camera.position.set(0, 10, 50);
scene.add(camera);
camera.lookAt(scene.position)

var group = new THREE.Mesh();
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
var faceMaterial = new THREE.MeshFaceMaterial(matArray);
for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
        for (var z = 0; z < 3; z++) {
            var cubeGeometry = new THREE.BoxGeometry(2.9, 2.9, 2.9);
            var cube = new THREE.Mesh(cubeGeometry, faceMaterial);
            cube.position.set(x * 3 - 3, y * 3 - 3, z * 3 - 3);
            group.add(cube);
        }
    }
}
scene.add(group);
var step = 0;
render();
function render() {
    requestAnimationFrame(render);
    step += .005;
    group.rotation.x = step;
    group.rotation.y = step;
    group.rotation.z = step;
    renderer.render(scene, camera);
}

document.getElementById('WebGL-output').appendChild(renderer.domElement);
