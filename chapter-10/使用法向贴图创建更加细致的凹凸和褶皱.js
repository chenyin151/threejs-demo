/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-25 15:32:55
 * @LastEditors: cy
 * @LastEditTime: 2021-08-25 15:52:42
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000)
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setClearColor(new THREE.Color(0xeeeeee, 1));
webGLRenderer.setSize(window.innerWidth, window.innerHeight);
webGLRenderer.shadowMapEnabled = true;
camera.position.x = 0;
camera.position.y = 5;
camera.position.z = 38;
var sphere = createMesh(new THREE.BoxGeometry(15, 15, 15), 'plaster.jpg', 'plaster-normal.jpg');
sphere.rotation.y = -.5;
sphere.rotation.x = 12;
scene.add(sphere);

var ambientLight = new THREE.AmbientLight(0x242424);
scene.add(ambientLight);

var light = new THREE.SpotLight();
light.position.set(0, 30, 30);
light.intensity = 1.2;
scene.add(light);
var step = 0;
render();
document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement);
function render() {
    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera)
    step += .1;
    light.position.x = Math.sin(step) * 10;
}
function createMesh(geom, imageFile, normal) {
    var t = THREE.ImageUtils.loadTexture('../assets/texture/general/' + imageFile);
    var m = THREE.ImageUtils.loadTexture('../assets/texture/general/' + normal);
    var mat2 = new THREE.MeshPhongMaterial();
    mat2.map = t;
    mat2.normalMap = m;
    mat2.normalScale.set(5,5)
    var mesh = new THREE.Mesh(geom, mat2);
    return mesh;
}