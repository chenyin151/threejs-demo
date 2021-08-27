/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-27 09:04:59
 * @LastEditors: cy
 * @LastEditTime: 2021-08-27 15:11:13
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setClearColor(new THREE.Color(0xbbbbbb, 1.0));
webGLRenderer.setSize(window.innerWidth, window.innerHeight);
webGLRenderer.shadowMapEnabled = true;

document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement);

var fsContainer = document.createElement('div');
fsContainer.className = 'fs-container';
var child = document.createElement('div');
child.setAttribute('id', 'canvas-output');
child.style = { float: 'left' };
fsContainer.appendChild(child);
document.body.appendChild(fsContainer);

var canvas = document.createElement("canvas");
document.getElementById('canvas-output').appendChild(canvas);
$('#canvas-output').literallycanvas({imageURLPrefix: '../libs/literally/img'});

camera.position.x = 0;
camera.position.y = 12;
camera.position.z = 28;
camera.lookAt(new THREE.Vector3(0, 0, 0));

var ambientLight = new THREE.AmbientLight(0x141414);
scene.add(ambientLight);

var light = new THREE.DirectionalLight();
light.position.set(0, 30, 20);
scene.add(light);

var step = 0;
var controls = new function() {
    this.showTexture = true;
    this.showCanvas = function() {
        if (controls.showTexture) {
            
            $('.fs-container').show();
        } else {
            $('.fs-container').hide();
        }
    }
    this.regenerateMap = function() {
        var date = new Date();
        pn = new Perlin('rnd' + date.getTime());
        fillWithPerlin(pn, ctx);
        cube.material.map.needsUpdate = true;
        $('#cv').sketch();
    }

    this.applyTexture = function() {
        cube.material.map.needsUpdate = true;
    }
}

var cube = createMesh(new THREE.CubeGeometry(10, 10, 10), 'floor-wood.jpg');
cube.position.x = 0;
scene.add(cube);

var gui = new dat.GUI();
gui.add(controls,'showTexture').onChange(controls.showCanvas);

render();
function render() {
    cube.rotation.x += .01;
    cube.rotation.z += .01;
    cube.material.map.needsUpdate = true;
    requestAnimationFrame(render)
    webGLRenderer.render(scene, camera);
}

function createMesh(geom) {
    // 以canvas为来源构造纹理，在需要的时候needsUpdate=true即可
    var canvasMap = new THREE.Texture(canvas);
    var mat = new THREE.MeshPhongMaterial();
    mat.map = canvasMap;
    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
}