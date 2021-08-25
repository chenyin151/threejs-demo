/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-25 16:05:59
 * @LastEditors: cy
 * @LastEditTime: 2021-08-25 16:53:38
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000)
var renderer;
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setClearColor(new THREE.Color(0xeeeeee, 1))
webGLRenderer.setSize(window.innerWidth, window.innerHeight)
webGLRenderer.shadowMapEnabled = true;

camera.position.x = -20;
camera.position.y = 20;
camera.position.z = 30;
camera.lookAt(new THREE.Vector3(0, 0, 0))
renderer = webGLRenderer;

var groundGeom = new THREE.PlaneGeometry(95, 95, 1, 1);
var lm = THREE.ImageUtils.loadTexture('../assets/texture/lightmap/lm-1.png');
var wood = THREE.ImageUtils.loadTexture('../assets/texture/general/floor-wood.jpg');
var groundMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x777777,
    lightMap: lm,
    map: wood
})
groundGeom.faceVertexUvs[1] = groundGeom.faceVertexUvs[0];
var groundMesh = new THREE.Mesh(groundGeom, groundMaterial);
groundMesh.rotation.x = -Math.PI / 2;
groundMesh.position.y = 0;
scene.add(groundMesh)

var cubeGeometry = new THREE.CubeGeometry(12, 12, 12);
var cubeGeometry2 = new THREE.CubeGeometry(6, 6, 6);
var meshMaterial = new THREE.MeshBasicMaterial();
meshMaterial.map = THREE.ImageUtils.loadTexture('../assets/texture/general/stone.jpg');
var cube = new THREE.Mesh(cubeGeometry, meshMaterial);
var cube2= new THREE.Mesh(cubeGeometry2, meshMaterial);
cube.position.set(0.9, 6, -12);
cube2.position.set(-13.2, 3, -6);
scene.add(cube);
scene.add(cube2)
var ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);
render();
document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement)
function render() {
    requestAnimationFrame(render)
    renderer.render(scene, camera);
}