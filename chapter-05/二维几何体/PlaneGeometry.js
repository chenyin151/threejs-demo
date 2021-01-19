/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-28 17:01:47
 * @LastEditors: cy
 * @LastEditTime: 2020-12-28 17:17:40
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

camera.position.set(-30, 40, 30);
camera.lookAt(scene.position)
renderer.setClearColor(new THREE.Color(0xaaaaff, 1));
renderer.setSize(window.innerWidth, window.innerHeight)

var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 6);
var basicMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
var normalMaterial = new THREE.MeshNormalMaterial();
basicMaterial.side = THREE.DoubleSide;
var mesh = new THREE.SceneUtils.createMultiMaterialObject(planeGeometry, [basicMaterial, normalMaterial]);
scene.add(mesh);

render();
function render() {
    console.log('width', mesh.children[0].geometry.parameters.height);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
document.getElementById('WebGL-output').appendChild(renderer.domElement);