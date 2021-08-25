/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-25 14:44:14
 * @LastEditors: cy
 * @LastEditTime: 2021-08-25 15:26:00
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000)
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setClearColor(new THREE.Color(0xeeeeee, 1))
webGLRenderer.setSize(window.innerWidth, window.innerHeight);
webGLRenderer.shadowMapEnabled = true;
camera.position.x = 0;
camera.position.y = 12;
camera.position.z = 28;
var cube = createMesh(new THREE.CubeGeometry(15, 15, 2), 'stone.jpg', 'stone-bump.jpg')
cube.rotation.y = .5;
cube.position.x = -12;
scene.add(cube)

var ambiLight = new THREE.AmbientLight(0x242424);
scene.add(ambiLight);

var light = new THREE.SpotLight();
light.position.set(0, 30, 30);
// 光照强大
light.intensity = 1.2;
scene.add(light)
render();
document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement)
function render() {
    requestAnimationFrame(render)
    webGLRenderer.render(scene, camera)
}

function createMesh(geom, imageFile, bump) {
    var texture = THREE.ImageUtils.loadTexture('../assets/texture/general/' + imageFile);
    var mat = new THREE.MeshPhongMaterial();
    geom.computeVertexNormals();
    mat.map = texture;

    var bump = THREE.ImageUtils.loadTexture('../assets/texture/general/' + bump);
    mat.bumpMap = bump;
    // 设置凹凸面高度
    mat.bumpScale = .4;
    var mesh = new THREE.Mesh(geom, mat);
    return mesh;
}
