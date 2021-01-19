/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-24 15:51:13
 * @LastEditors: cy
 * @LastEditTime: 2020-12-24 17:03:23
 */

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

camera.position.set(-30, 40, 30);
camera.lookAt(scene.position)
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(133,133,133))
var ground = ground();
function ground() {
    var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -.5 * Math.PI/180;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
    return plane;
}

var cube = createCube();
function createCube() {
    
    
    for (var i = 0; i < 10; i++) {
        var cubeGeometry = new THREE.CubeGeometry(4,4,4);
        var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffee });
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(-30 + 2 + i * (4 + 2), 10 - 2, 2)
        scene.add(cube);
    }
    
    return cube;
}

function setCamera($x) {
    camera.position.x = $x;
}

createLights()
function createLights() {
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set(0, 0, 1110);
    scene.add(spotLight);
}



function setPlane() {

}

document.getElementById('WebGL-output').appendChild(renderer.domElement);

var options = {
    plane: {

    },
    camera: { 
        type: 0,
        x: 0
    }
}

render();
function render() {
    requestAnimationFrame(render);
    setCamera(options.camera.x);
    renderer.render(scene, camera);
}

var gui = new dat.GUI()
var f1 = gui.addFolder('plane')
var f2 = gui.addFolder('cube')
var f3 = gui.addFolder('摄像机')
var control_0 = f3.add(options.camera, 'type', {'正交摄像机': 0, '透视摄像机': 1 }).name('类型')
f3.add(options.camera, 'x', -100, 100)

control_0.onChange(function($val) {
    if ($val == 1 && camera instanceof THREE.OrthographicCamera) {
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
        camera.position.set(120, 60, 180);
        camera.lookAt(scene.position);
    } else if ($val == 0 && camera instanceof THREE.PerspectiveCamera) {
        camera = new THREE.OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16, -200, 500);
        camera.position.set(120, 60, 180);
        camera.lookAt(scene.position);
    }
})
