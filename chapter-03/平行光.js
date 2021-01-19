/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-25 09:45:17
 * @LastEditors: cy
 * @LastEditTime: 2020-12-25 10:35:30
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.shadowMapEnabled = true;
camera.position.set(0,0, 100)
camera.lookAt(scene.position)
renderer.setClearColor(new THREE.Color(133, 133, 133));
renderer.setSize(window.innerWidth, window.innerHeight);

var plane = createGroups();
var sphere = createSphere();
var spotLight = createSpotLight();
var directLight = createDirectLight();
function createGroups() {
    var geometry = new THREE.PlaneGeometry( 60, 20, 1, 1 );
    var material = new THREE.MeshLambertMaterial({ color: 0x1ce3e1 });
    var plane = new THREE.Mesh( geometry, material );
    plane.rotation.x = -55 * Math.PI / 180;
    plane.position.x = 5;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add( plane );
    return plane;
}

function createSphere() {
    var geometry = new THREE.SphereGeometry(3, 10, 20);
    var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    var sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    sphere.position.set(0,5,0)
    scene.add(sphere);
}

function createSpotLight() {
    var light = new THREE.SpotLight( 0xff00ff);
    light.position.set(-40, 60, 100);
    scene.add(light);
    light.castShadow = true;
    return light;
}

function createDirectLight() {
    var light = new THREE.DirectionalLight(0xff00ff);
    light.shadowCameraNear = 2;
    light.shadowCameraFar = 200;
    light.shadowCameraLeft = -50;
    light.shadowCameraRight = 50;
    light.shadowCameraTop = 50;
    light.shadowCameraBottom = -50;
    scene.add(light);
    light.castShadow = true;
    return light;
}
render()
function render() {
    renderer.render( scene, camera )
}

document.getElementById('WebGL-output').appendChild(renderer.domElement);