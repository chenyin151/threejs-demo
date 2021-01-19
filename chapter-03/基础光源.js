/*
 * @Author: your name
 * @Date: 2020-12-24 18:22:20
 * @LastEditTime: 2020-12-25 09:43:10
 * @LastEditors: cy
 * @Description: In User Settings Edit
 * @FilePath: /js-3d/chapter-03/基础光源.js
 */
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
camera.position.set(0,50,50)
camera.lookAt(scene.position)
renderer.shadowMapEnabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0, 0, 0));
scene.add(camera);

var plane = createGround();
var spotLight = createSpotLight();
var ambLight = createAmbientLight();
var sphere = createSphere();
var pointLight = createPointLight();
var lightBox = createBox(10,10,10,1);
camera.lookAt(scene.position)
function createGround() {
    var geometry = new THREE.PlaneGeometry(100, 60, 1, 1);
    var material = new THREE.MeshLambertMaterial({ color: 0xc0c0c0 });
    var plane = new THREE.Mesh(geometry, material)
        // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add(plane);
    return plane;
}

var box = createBox(20, 10, 8, 4);

function createBox($x, $y, $z, $size) {
    var geometry = new THREE.BoxGeometry($size, $size, $size);
    var material = new THREE.MeshLambertMaterial({ color: 0xcc00cc });
    var box = new THREE.Mesh(geometry, material);
    box.position.set($x,$y,$z)
    box.castShadow = true;
    scene.add(box);
    return box;
}

function createSpotLight() {
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set(-40, 60, 10);
    scene.add(spotLight);
    spotLight.density = 4;
    // exponent的值越大，光强递减越快
    spotLight.exponent = 13
    // 数值越小 光宽越窄
    spotLight.angle = 10 * Math.PI / 180;
    // spotLight.target = sphere;
    spotLight.castShadow = true;
    // 显示受光照影响、生成阴影的区域
    createBox(-40, 60, 10, 2)
    return spotLight;
}

function createSphere() {
    var geometry = new THREE.SphereGeometry(4, 20, 20);
    var material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    var sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(-10, 5, 0)
    scene.add(sphere);
    sphere.castShadow = true;
    return sphere;
}
function createAmbientLight() {
    var light = new THREE.AmbientLight( 0x0c0c0c);
    scene.add(light);
    return light;

}

function createPointLight() {
    var light = new THREE.PointLight( 0xcccccc );
    light.position.set(10, 10, 10);
    // light.intensity = 3;
    light.distance = 0;
    scene.add(light);
    return light;
}


var options = {
    camera: {
        shadowCameraVisible: true,
        shadowMapWidth: 512,
        shadowMapHeight: 10
    }
}

var step = 0;
render()
function render() {
    requestAnimationFrame(render);
    step += .05;
    pointLight.position.x = Math.sin(step) * 10;
    pointLight.position.z = Math.cos(step) * 10;
    lightBox.position.x = Math.sin(step) * 10;
    lightBox.position.z = Math.cos(step) * 10;
    spotLight.shadowCameraVisible = options.camera.shadowCameraVisible;
    spotLight.shadowMapWidth = 112;
    console.log('sja', options.camera.shadowMapWidth)
    // box.rotation.x = step;
    // box.rotation.y = step;
    // box.rotation.z = step;
    renderer.render(scene, camera);
    
}
document.getElementById('WebGL-output').appendChild(renderer.domElement);

var gui = new dat.GUI();
var f1 = gui.addFolder('摄像机');
f1.add(options.camera, 'shadowCameraVisible').name('showCameraVisible')
f1.add(options.camera, 'shadowMapWidth', -512, 1000).name('showMapWidth');
var f2 = gui.addFolder('灯光')
