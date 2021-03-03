/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-01-20 10:58:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-19 23:29:47
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setClearColor(new THREE.Color(0xaaaaff));
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 50;
camera.lookAt(new THREE.Vector3(-20, 0, 0));
var geometry = new THREE.TorusKnotGeometry(10, 1, 64, 8, 2, 3, 1)
var knot = createMesh(geometry);
scene.add(knot);
function createMesh($geometry) {
    var meshMaterial = new THREE.MeshBasicMaterial({ 
        vertexColors: THREE.VertexColors,
        color: new THREE.Color( 0xaaaaaa ),
        wireframe: true
    })
    meshMaterial.side = THREE.DoubleSide;
    var mesh = new THREE.Mesh($geometry, meshMaterial);
    return mesh;
}

render();
function render() {
    knot.rotation.x += .1;
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
document.getElementById('WebGL-output').appendChild(renderer.domElement);

var options = new function() {
    this.save = function() {
        console.log('save')
        var result = knot.toJSON();
        localStorage.setItem('json', JSON.stringify(result));
    }
    this.load = function() {
        var json = localStorage.getItem('json');
        if (json) {
            var loadedGeometry = JSON.parse(json);
            var loader = new THREE.ObjectLoader();
            loadedMesh = loader.parse(loadedGeometry);
            loadedMesh.position.x -= 50;
            scene.add(loadedMesh);
        }
    }
}
var gui = new dat.GUI();
var f = gui.addFolder('Save & Load');
f.add(options,'save').onChange(function(e) {
    // this.Options.save();
    options.save();
})
f.add(options,'load').onChange(function(e) {

})