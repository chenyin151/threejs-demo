/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-27 15:20:49
 * @LastEditors: cy
 * @LastEditTime: 2021-08-27 15:46:43
 */
var video = document.createElement('video');
video.cssText = 'display: none; position: absolute; left: 15px; top: 75px;';
video.setAttribute('src', '../assets/movies/Big_Buck_Bunny_small.ogv');
video.setAttribute('controls', 'true');
video.setAttribute('autoplay', true);
document.body.appendChild(video);
document.addEventListener('click', function(e) {
    video.play();
})
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setClearColor(new THREE.Color(0xeeeeee, 1.0));
webGLRenderer.setSize(window.innerWidth, window.innerHeight);
webGLRenderer.shadowMapEnabled = true;

camera.position.x = 0;
camera.position.y = 1;
camera.position.z = 28;
camera.lookAt(new THREE.Vector3(0, 0, 0));

var ambiLight = new THREE.AmbientLight(0x141414);
scene.add(ambiLight);

var light = new THREE.DirectionalLight();
light.position.set(0, 30, 20);
scene.add(light);
document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement);

var texture = new THREE.VideoTexture(video);
var cube = createMesh(new THREE.CubeGeometry(22, 16, .2));
cube.position.y = 2;
scene.add(cube)


render();
function render() {
    cube.rotation.x += .01;
    cube.rotation.y += .01;
    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
}

function createMesh(geom) {
    var materialArray = [];
    materialArray.push(new THREE.MeshBasicMaterial({ color: 0x0051ba }));
    materialArray.push(new THREE.MeshBasicMaterial({ color: 0x0051ba }));
    materialArray.push(new THREE.MeshBasicMaterial({ color: 0x0051ba }));
    materialArray.push(new THREE.MeshBasicMaterial({ color: 0x0051ba }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture }));
    materialArray.push(new THREE.MeshBasicMaterial({ color: 0xff51ba }));
    // 给模型的每个面单独指定材质
    var faceMaterial = new THREE.MeshFaceMaterial(materialArray);
    var mesh = new THREE.Mesh(geom, faceMaterial);
    return mesh;
}