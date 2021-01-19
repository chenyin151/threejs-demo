/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-01-19 17:00:49
 * @LastEditors: cy
 * @LastEditTime: 2021-01-19 17:34:40
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setClearColor(new THREE.Color(0, 0, 0));
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0,50,100)
camera.lookAt(scene.position)
scene.add(camera)
let light = spotLight();
scene.add(light)
for (var i = 0; i < 500; i++) {
    var cube = addCube();
    
}
function addCube() {
    console.log('addCube')
    var geometry = new THREE.BoxGeometry(4,4,4);
    var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
    var cube = new THREE.Mesh(geometry, material);
    cube.rotation.set(-Math.PI / 2, 0, 0)
    cube.position.set(randArea(-100, 100), 0, randArea(-100,100))
    scene.add(cube);
    return cube;
}
function spotLight() {
    var light = new THREE.SpotLight( 0xcccccc );
    light.lookAt(scene.position);
    light.position.set(0, 160, 100);
    return light;
}

render();
function render() {
    requestAnimationFrame(render)
    scene.traverse($e => {
        if ($e instanceof THREE.Mesh) {
            $e.rotation.x += .1;
            $e.rotation.y += .1;
            $e.rotation.z += .1;
        }
    })
    renderer.render(scene, camera);
}
document.getElementById('WebGL-output').appendChild(renderer.domElement);