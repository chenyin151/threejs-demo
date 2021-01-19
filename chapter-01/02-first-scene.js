/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-22 09:57:41
 * @LastEditors: cy
 * @LastEditTime: 2020-12-22 10:40:20
 */

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

// 设置场景的背景色
renderer.setClearColor(0xeeeeee);
// 设置场景大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 创建轴
var axes = new THREE.AxisHelper(20);
// 把轴添加到场景中
scene.add(axes);
// 创建宽度和高度为60 20的屏幕，
var planeGeometry = new THREE.PlaneGeometry(60, 20);
//  通过材质设置屏幕的外观，这里设置颜色为0xccccccc的基本材质
var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
// 把planeGeometry和planeMaterial合并到plane的网格中
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
// 设置平面的位置
plane.rotation.x = -.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

scene.add(plane);

var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
// 把wireframe设置为true,这样物体就不会渲染为实体
var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;

scene.add(cube);
var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff, wireframe: true });
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;

scene.add(sphere);
// 设置摄像机的位置
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set(-40, 60, -10);
// 不同材质对光源的反应是不一样的，基本材质对光源不会有反应
scene.add( spotLight );
// lookAt是指摄像机看到焦点
camera.lookAt(scene.position);

document.getElementById('WebGL-output').appendChild(renderer.domElement);
renderer.render(scene, camera);
