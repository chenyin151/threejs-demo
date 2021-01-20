/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-01-20 10:58:21
 * @LastEditors: cy
 * @LastEditTime: 2021-01-20 13:04:11
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setClearColor(new THREE.Color(0xaaaaff));
var geometry = new THREE.TorusKnotGeometry()
function createMesh($geometry) {
    var meshMaterial = new THREE.MeshBasicMaterial({ 
        vertexColors: new THREE.vertexColors,
        color: new THREE.Color( 0xaaaaaa ),
        wireframe: true
    })
    meshMaterial.side = THREE.DoubleSide;
    var mesh = new THREE.Mesh($geometry, meshMaterial);
    return mesh;
}

render();
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
document.getElementById('WebGL-output').appendChild(renderer.domElement);

var control = {
    rotationSpeed : 0.02
}
var gui = new dat.GUI();
var f = gui.addFolder('Save & Load');
f.add(button, 'rotationSpeed', 3, 5);