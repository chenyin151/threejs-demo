/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-28 17:21:27
 * @LastEditors: cy
 * @LastEditTime: 2020-12-28 17:23:10
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

camera.position.set(-30, 40, 30);
camera.lookAt(scene.position)
renderer.setClearColor(new THREE.Color(0xaaaaff, 1));
renderer.setSize(window.innerWidth, window.innerHeight)

var circleGeometry = new THREE.CircleGeometry(3, 12);

render();
function render() {
    console.log('width', mesh.children[0].geometry.parameters.height);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
document.getElementById('WebGL-output').appendChild(renderer.domElement);