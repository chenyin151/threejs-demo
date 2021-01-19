/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-25 13:56:45
 * @LastEditors: cy
 * @LastEditTime: 2020-12-25 15:27:18
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLDeferredRenderer({
    width: window.innerWidth,
    height: window.innerHeight,
    scaling: 1,
    antialias: true,
    brightness: 2.5,
    tonemapping: THREE.FilmicOperator
})
camera.position.set(20, 30, 21);
camera.lookAt(new THREE.Vector3(0, 0, -20));
var plane = createGround(70,70);
spotLight(-40, 60, -10);
var areaLight1 = createAreaLight(0xff0000, -10, 10, -35)
var areaLight2 = createAreaLight(0x00ff00, 0, 10, -35)
var areaLight3 = createAreaLight(0x0000ff, 10, 10, -35)
createBox(4,10,0, areaLight1.position, 0xff0000)
createBox(4,10,0, areaLight2.position, 0x00ff00)
createBox(4,10,0, areaLight3.position, 0x0000ff)
function createGround($width, $height, $wSeg = 1, $hSeg = 1, $pos){
    var geometry = new THREE.PlaneGeometry($width, $height, $wSeg, $hSeg);
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff, specular: 0xffffff, shininess: 200 });
    var plane = new THREE.Mesh(geometry, material);

    plane.rotation.x = -.5 * Math.PI;
    plane.position = $pos;
    scene.add(plane);
    return plane;
}

function createBox($l, $w, $h, $pos, $color) {
    var geometry = new THREE.BoxGeometry($l, $w, $h);
    var material = new THREE.MeshBasicMaterial({ color: $color });
    var plane = new THREE.Mesh(geometry, material);
    plane.position.copy($pos)
    scene.add(plane);
}

function createAreaLight($color, $x, $y, $z) {
    // 第一个参数是光的颜色，第二个参数是光的强度
    var light = new THREE.AreaLight($color, 3);
    light.position.set($x, $y, $z);
    light.rotation.set(-Math.PI / 2, 0, 0);
    light.width = 4;
    light.height = 9.9;
    scene.add(light);
    return light;
}

function spotLight($x, $y, $z) {
    var light = new THREE.SpotLight(0xcccccc);
    light.position.set($x, $y, $z);
    light.intensity =.1;
    light.lookAt(plane);
    scene.add(light);
    return light;
}
scene.add(camera)
render() 
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

document.getElementById('WebGL-output').appendChild(renderer.domElement);
