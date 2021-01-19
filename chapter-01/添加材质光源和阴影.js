/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-22 09:57:41
 * @LastEditors: cy
 * @LastEditTime: 2020-12-22 17:05:10
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

// 设置场景的背景色, THREE.Color RGB颜色
renderer.setClearColor(new THREE.Color(255, 255, 255));
// 设置场景大小
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
// 创建轴
var axes = new THREE.AxesHelper(20);
// 把轴添加到场景中
scene.add(axes);
// 创建宽度和高度为60 20的屏幕，
var planeGeometry = new THREE.PlaneGeometry(60, 20);
//  通过材质设置屏幕的外观，这里设置颜色为0xccccccc的基本材质
var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
// 把planeGeometry和planeMaterial合并到plane的网格中
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
// 设置平面的位置
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
// 设置摄像机的位置
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set(-40, 60, -10);

// 不同材质对光源的反应是不一样的，基本材质对光源不会有反应, 所以这里我们改成了MeshLambertMaterial,我们还得
// 设置renderer的shadowMap.enabled=true，接受阴影，还得给发射阴影的物体设置castShadow=true，要接受阴影的
// 物体设置castShadow=true才能看到效果
scene.add( spotLight );
spotLight.castShadow = true;
// lookAt是指摄像机看到焦点
camera.lookAt(scene.position);

document.getElementById('WebGL-output').appendChild(renderer.domElement);
renderer.render(scene, camera);
