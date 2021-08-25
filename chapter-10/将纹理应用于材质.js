/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-25 14:14:58
 * @LastEditors: cy
 * @LastEditTime: 2021-08-25 14:40:41
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setClearColor(new THREE.Color(0x000000, 1.0));
webGLRenderer.setSize(window.innerWidth, window.innerHeight);
webGLRenderer.shadowMapEnabled = true;

camera.position.x = 0;
camera.position.y = 12;
camera.position.z = 28;

camera.lookAt(new THREE.Vector3(0, 0, 0));

var ambiLight = new THREE.AmbientLight(0x141414);
scene.add(ambiLight);

var light = new THREE.DirectionalLight();
light.position.set(0, 30, 20);
scene.add(light);

document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement);
// IcosahedronGeometry十二面体，第一个参数是半径，第二个参数是：默认是0，设置为n，几何体的面是20的n倍
var polyhedron = createMesh(new THREE.IcosahedronGeometry(5, 1));
polyhedron.position.x = 12;
scene.add(polyhedron)

var sphere = createMesh(new THREE.SphereGeometry(5, 20, 20));
scene.add(sphere)


var cube = createMesh(new THREE.CubeGeometry(5, 5, 5));
cube.position.x = -12;
scene.add(cube)

render();

function createMesh(geom, imageFile) {
    var loader = new THREE.DDSLoader();
    var texture = loader.load('../assets/texture/seafloor.dds');
    var mat = new THREE.MeshPhongMaterial();
    mat.map = texture;
    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
}
function render() {
    sphere.rotation.x += .01;
    sphere.rotation.z += .01;
    cube.rotation.x += .01;
    cube.rotation.z += .01;
    polyhedron.rotation.x += .01;
    polyhedron.rotation.z += .01;
    requestAnimationFrame(render)
    webGLRenderer.render(scene, camera)
}
