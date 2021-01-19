/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-22 09:57:41
 * @LastEditors: cy
 * @LastEditTime: 2020-12-22 11:41:55
 */
window.addEventListener('resize', onResize, false);
function onResize() {
    // aspect表示屏幕的长宽比，对于渲染器需要改变他的尺寸
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addScript(url){
    var script = document.createElement('script');
    script.setAttribute('type','text/javascript');
    script.setAttribute('src',url);
    document.getElementsByTagName('head')[0].appendChild(script);
}
addScript('./libs/three.min.js');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setClearColor(new THREE.Color(255, 255, 255));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
var axes = new THREE.AxesHelper(20);
scene.add(axes);
var planeGeometry = new THREE.PlaneGeometry(60, 20);
var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
plane.receiveShadow = true;
scene.add(plane);

var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });

var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;

scene.add(cube);
cube.castShadow = true;
var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;

scene.add(sphere);
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set(-40, 60, -10);
scene.add( spotLight );
spotLight.castShadow = true;
camera.lookAt(scene.position);

document.getElementById('WebGL-output').appendChild(renderer.domElement);
renderer.render(scene, camera);
renderScene()
var step = 0;
function renderScene() {
    cube.rotation.x += .03;
    cube.rotation.y += .03;
    cube.rotation.z += .03;
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);

    step += .1;
    sphere.position.x = 20 + (10 * Math.cos(step));
    sphere.position.y = 2 + ( 10 * Math.abs(Math.sin(step)));
}
