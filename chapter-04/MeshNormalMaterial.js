/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-28 14:11:58
 * @LastEditors: cy
 * @LastEditTime: 2020-12-28 14:59:06
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0xaaaaff, 1));
camera.position.set(0, 10, 50);
scene.add(camera);
camera.lookAt(scene.position)
var material = new THREE.MeshNormalMaterial({ color: 0x7777ff, shading: THREE.SmoothShading });
var sphere = createSphere();
function createSphere() {
    var geometry = new THREE.SphereGeometry(14, 20, 20);
    
    // var material = new THREE.MeshBasicMaterial({ color: 0x7777ff });
    var sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 3, 2);
    scene.add(sphere);
    return sphere;
}

for (var f = 0, f1 = sphere.geometry.faces.length; f < f1; f++) {
    var face = sphere.geometry.faces[f];
    // 计算质心：我们通过把构成该面的顶点相加再除以3得到
    var centroid = new THREE.Vector3(0,0,0);
    centroid.add(sphere.geometry.vertices[face.a]);
    centroid.add(sphere.geometry.vertices[face.b]);
    centroid.add(sphere.geometry.vertices[face.c]);
    centroid.divideScalar(3);

    var arrow = new THREE.ArrowHelper(face.normal, centroid, 2, 0x3333ff, 0.5, 0.5);
    sphere.add(arrow);
}
var options = {
    shading: 'smoothing'
}
var step = 0;
render();
function render() {
    requestAnimationFrame(render);
    step += .005;
    sphere.rotation.y = step;
    renderer.render(scene, camera);
}

document.getElementById('WebGL-output').appendChild(renderer.domElement);

var gui = new dat.GUI();
gui.add(options, 'shading', { flat: 'flat', smoothing: 'smoothing'}).onChange(function(e) {
    console.log('xxx', e)
    if (e == 'flat') {
        material.shading = THREE.FlatShading;
        
    } else {
        material.shading = THREE.SmoothShading;
    }
    scene.remove(sphere);
    sphere = new THREE.Mesh(sphere.geometry.clone(), material)
    scene.add(sphere);
    material.needsUpdate = true;
})