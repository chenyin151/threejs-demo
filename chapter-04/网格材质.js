/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-25 16:46:26
 * @LastEditors: cy
 * @LastEditTime: 2020-12-25 17:20:34
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

camera.position.set(0,10,100)
camera.lookAt(scene.position)
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color( 0xaaaaff ));
scene.add(camera);
var plane = createPlane();

var option = {
    plane: {
        rotationX: 0
    }
}

function createPlane() {
    var geometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    // var material = new THREE.MeshBasicMaterial({ color: 0xff0000, name: 'material-1', opacity: .1, transparent: true });
    var material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(0xff0000)
    material.transparent = true;
    material.opacity = .1
    // material.wireframe = true;
    // material.wireframeLinewidth = 12
    material.side = THREE.DoubleSide;
    var plane = new THREE.Mesh(geometry, material);
    plane.rotation.set(-Math.PI / 2, 0, 0);
    plane.position.set(0, 0, 0);
    scene.add(plane);
    return plane;
}

render();
function render() {
    requestAnimationFrame(render);
    plane.rotation.x = option.plane.rotationX * Math.PI / 180;
    renderer.render( scene, camera);
}

var gui = new dat.GUI();
gui.add(option.plane, 'rotationX', 0, 360)

document.getElementById('WebGL-output').appendChild(renderer.domElement);
