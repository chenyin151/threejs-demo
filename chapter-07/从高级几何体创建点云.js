/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-25 11:34:54
 * @LastEditors: cy
 * @LastEditTime: 2021-08-25 13:52:57
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setClearColor(new THREE.Color(0x000000, 1.0));
webGLRenderer.setSize(window.innerWidth, window.innerHeight);
webGLRenderer.shadowMapEnabled = true;

camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 50;
camera.lookAt(new THREE.Vector3(10, 0, 0));

document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement);
var step = 0;
var knot;
var controls = new function () {
    // we need the first child, since it's a multimaterial
    this.radius = 13;
    this.tube = 1.7;
    this.radialSegments = 156;
    this.tubularSegments = 12;
    this.p = 5;
    this.q = 4;
    this.heightScale = 3.5;
    this.asParticles = false;
    this.rotate = false;

    this.redraw = function () {
        // remove the old plane
        if (knot) scene.remove(knot);
        // create a new one
        var geom = new THREE.TorusKnotGeometry(controls.radius, controls.tube, Math.round(controls.radialSegments), Math.round(controls.tubularSegments), Math.round(controls.p), Math.round(controls.q), controls.heightScale);

        if (controls.asParticles) {
            knot = createPointCloud(geom);
        } else {
            knot = createMesh(geom);
        }

        // add it to the scene.
        scene.add(knot);
    };
};
render()
var gui = new dat.GUI();
        gui.add(controls, 'radius', 0, 40).onChange(controls.redraw);
        gui.add(controls, 'tube', 0, 40).onChange(controls.redraw);
        gui.add(controls, 'radialSegments', 0, 400).step(1).onChange(controls.redraw);
        gui.add(controls, 'tubularSegments', 1, 20).step(1).onChange(controls.redraw);
        gui.add(controls, 'p', 1, 10).step(1).onChange(controls.redraw);
        gui.add(controls, 'q', 1, 15).step(1).onChange(controls.redraw);
        gui.add(controls, 'heightScale', 0, 5).onChange(controls.redraw);
        gui.add(controls, 'asParticles').onChange(controls.redraw);
        gui.add(controls, 'rotate').onChange(controls.redraw);
function render() {
    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera)
    if (knot) knot.rotation.y = step += .01;
}
function generateSprite() {
    var canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    var context = canvas.getContext('2d');
    var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(.2, 'rgba(0, 255, 255, 1)');
    gradient.addColorStop(.4, 'rgba(0, 0, 64,1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}

function createMesh(geom) {
    var meshMaterial = new THREE.MeshNormalMaterial({})
    meshMaterial.side = THREE.DoubleSide;
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);
    return mesh;
}

function createPointCloud(geom) {
    console.log('create', geom);
    var material = new THREE.PointCloudMaterial({
        color: 0xffffff,
        size: 3,
        transparent: true,
        blending: THREE.AdditiveBlending,
        map: generateSprite()
    })
    var cloud = new THREE.PointCloud(geom, material)
    cloud.sortParticles = true;
    return cloud;
}