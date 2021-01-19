/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-25 10:36:19
 * @LastEditors: cy
 * @LastEditTime: 2020-12-25 13:49:17
 */
/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-25 10:36:19
 * @LastEditors: cy
 * @LastEditTime: 2020-12-25 11:55:13
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.shadowMapEnabled = true;
scene.fog = new THREE.Fog(0xaaaaaa, .010 ,200)
renderer.shadowMapEnabled = true
// camera.position.set(-20,15, 45)
camera.position.x = -20;
camera.position.y = 15;
camera.position.z = 45;
camera.lookAt(new THREE.Vector3(10,0,0))
renderer.setClearColor(new THREE.Color(0xaaaaff, 1.0));
renderer.setSize(window.innerWidth, window.innerHeight);

var plane = createGroups();
var sphere = createSphere();
var cube = createCube();

var spotLight = createSpotLight();
var hemiLight = createHemiLight();
createDirLight();
function createGroups() {
    var textureGrass = THREE.ImageUtils.loadTexture('../assets/texture/ground/grasslight-big.jpg');
    textureGrass.wrapS = THREE.RepeatWrapping;
    textureGrass.wrapT = THREE.RepeatWrapping;
    textureGrass.repeat.set(4, 4);
    var geometry = new THREE.PlaneGeometry(1000, 200, 20, 20);
    var material = new THREE.MeshLambertMaterial({ map: textureGrass });
    var plane = new THREE.Mesh(geometry, material);
    plane.receiveShadow = true;

    plane.rotation.x = -.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.receiveShadow = true;
    scene.add(plane);
    return plane;
}

function createCube() {
    var geometry = new THREE.BoxGeometry(4,4,4);
    var material = new THREE.MeshLambertMaterial({ color: 0xcc7700 });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(30, 5, 0);
    cube.castShadow = true;
    scene.add(cube);
    return cube;
}

function createSphere() {
    var geometry = new THREE.SphereGeometry(3, 10, 20);
    var material = new THREE.MeshLambertMaterial({ color: 0xff3333 });
    var sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    sphere.position.set(0,5,0)
    scene.add(sphere);
}

function createSpotLight() {
    var light = new THREE.SpotLight(0xcccccc);
    light.position.set(-40,60,-10);
    console.log('spotLight', light.lookAt)
    light.castShadow = true;
    light.lookAt(plane);
    scene.add(light);
    return light;
}
// 创建半球光光源
function createHemiLight() {
    var light = new THREE.HemisphereLight(0x0000ff,0x00ff00, .6);
    light.position.set(0, 500, 0);
    scene.add(light);
    return light;
}

function createDirLight() {

}

render()
var step = 0;
function render() {
    requestAnimationFrame(render);
    step += .05;
    cube.rotation.x = step;
    cube.rotation.y = step;
    renderer.render( scene, camera )
}

var options = {
    light: {
        hemi: false,
        intensity: 0.6,
    }
}

var gui = new dat.GUI();
gui.add(options.light, 'hemi').onChange(function(e) {
    if (e) {
        hemiLight.intensity = options.light.intensity;
    } else {
        hemiLight.intensity = 0;
    }
})
gui.add(options.light, 'intensity',0, 5).onChange(function(e) {
    hemiLight.intensity = e;
})
document.getElementById('WebGL-output').appendChild(renderer.domElement);

