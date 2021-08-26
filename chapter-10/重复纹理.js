/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-26 16:15:48
 * @LastEditors: cy
 * @LastEditTime: 2021-08-26 17:24:48
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000)
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setClearColor(new THREE.Color(0xeeeeee, 1))
webGLRenderer.setSize(window.innerWidth, window.innerHeight);
webGLRenderer.shadowMapEnabled = true;

camera.position.x = 0;
camera.position.y = 12;
camera.position.z = 20;
camera.lookAt(new THREE.Vector3(0, 0, 0))

var ambientLight = new THREE.AmbientLight(0x141414);
scene.add(ambientLight);

var light = new THREE.DirectionalLight();
light.position.set(0, 30, 20);
scene.add(light);

document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement)

var sphere = createMesh(new THREE.SphereGeometry(5, 20, 20), 'floor-wood.jpg');
scene.add(sphere);
sphere.position.x = 7;

var step = 0;
render();

function render() {
    requestAnimationFrame(render)
    webGLRenderer.render(scene, camera)
}

var controls = new function() {
    this.repeatX = 1;
    this.repeatY = 1;
    this.repeatWrapping = true;
    this.updateRepeat = function(e) {
        sphere.material.map.repeat.set(controls.repeatX, controls.repeatY);
        if (controls.repeatWrapping) {
            sphere.material.map.wrapS = THREE.RepeatWrapping;
            sphere.material.map.wrapT = THREE.RepeatWrapping;
        } else {
            sphere.material.map.wrapS = THREE.ClampToEdgeWrapping;
            sphere.material.map.wrapT = THREE.ClampToEdgeWrapping;
        }
        sphere.material.map.needsUpdate = true;
    }
}

var gui = new dat.GUI();
gui.add(controls, 'repeatX', -4, 4).onChange(controls.updateRepeat);
gui.add(controls, 'repeatY', -4, 4).onChange(controls.updateRepeat);
gui.add(controls, 'repeatWrapping').onChange(controls.updateRepeat);

function createMesh(geom, texture) {
    var texture = THREE.ImageUtils.loadTexture('../assets/texture/general/' + texture);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    geom.computeVertexNormals();
    var mat = new THREE.MeshPhongMaterial();
    mat.map = texture;

    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
}

