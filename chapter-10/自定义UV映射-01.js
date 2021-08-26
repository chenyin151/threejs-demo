/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-26 13:26:58
 * @LastEditors: cy
 * @LastEditTime: 2021-08-26 14:37:50
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setClearColor(new THREE.Color(0xffffff, 1.0));
webGLRenderer.setSize(window.innerWidth, window.innerHeight);
webGLRenderer.shadowMapEnabled = true;

camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 50;
camera.lookAt(new THREE.Vector3(0, 0, 0))

document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement)

var step = 0;

var texture = THREE.ImageUtils.loadTexture('../assets/texture/ash_uvgrid01.jpg');
var mat = new THREE.MeshBasicMaterial({ map: texture });
var geom = new THREE.CubeGeometry(24, 24, 24);
var mesh = new THREE.Mesh(geom, mat);

mesh.rotation.z = .5 * Math.PI;
mesh.rotation.y = .2 * Math.PI;
mesh.rotation.x = .2 * Math.PI;

scene.add(mesh);

var controls = new function() {
    this.uv1 = geom.faceVertexUvs[0][0][0].x;
    this.uv2 = geom.faceVertexUvs[0][0][0].y;
    this.uv3 = geom.faceVertexUvs[0][0][1].x;
    this.uv4 = geom.faceVertexUvs[0][0][1].y;
    this.uv5 = geom.faceVertexUvs[0][0][2].x;
    this.uv6 = geom.faceVertexUvs[0][0][2].y;
}
var gui = new dat.GUI();
gui.add(controls, 'uv1', 0, 1).onChange(function(e) {
    geom.faceVertexUvs[0][0][0].x = e;
    geom.uvsNeedUpdate = true;
})
gui.add(controls, 'uv2', 0, 1).onChange(function(e) {
    geom.faceVertexUvs[0][0][0].y = e;
    geom.uvsNeedUpdate = true;
})
gui.add(controls, 'uv3', 0, 1).onChange(function(e) {
    geom.faceVertexUvs[0][0][1].x = e;
    geom.uvsNeedUpdate = true;
})
gui.add(controls, 'uv4', 0, 1).onChange(function(e) {
    geom.faceVertexUvs[0][0][1].y = e;
    geom.uvsNeedUpdate = true;
})
gui.add(controls, 'uv5', 0, 1).onChange(function(e) {
    geom.faceVertexUvs[0][0][2].x = e;
    geom.uvsNeedUpdate = true;
})
gui.add(controls, 'uv6', 0, 1).onChange(function(e) {
    geom.faceVertexUvs[0][0][2].y = e;
    geom.uvsNeedUpdate = true;
})
render();

function render() {
    // mesh.rotation.x += .01;
    // mesh.rotation.z += .01;
    requestAnimationFrame(render)
    webGLRenderer.render(scene, camera)
}