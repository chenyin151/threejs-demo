/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-27 16:27:09
 * @LastEditors: cy
 * @LastEditTime: 2021-08-30 11:58:05
 */
var sceneCube = new THREE.Scene();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000)
var cameraCube = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setClearColor(new THREE.Color(0xeeeeee, 1))
webGLRenderer.setSize(window.innerWidth, window.innerHeight)
webGLRenderer.shadowMapEnabled = false;
webGLRenderer.autoClear = false;

var textureCube = createCubeMap();
var shader = THREE.ShaderLib["cube"];
shader.uniforms["tCube"].value = textureCube;
var material = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
});
cubeMesh = new THREE.Mesh(new THREE.BoxGeometry(100,100,100), material);
sceneCube.add(cubeMesh);

var sphere1 = createMesh(new THREE.SphereGeometry(10, 15, 15), "plaster.jpg");
sphere1.material.envMap = textureCube;
sphere1.rotation.y = -0.5;
sphere1.position.x = 12;
sphere1.position.y = 5;
scene.add(sphere1);

camera.position.x = 0;
camera.position.y = -12;
camera.position.z = 5;
camera.lookAt(new THREE.Vector3(0, 0, 0));

var ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

var light = new THREE.SpotLight();
light.position.set(0, 30, 30);
light.intensity = 1.2;
scene.add(light);

var pointColor = '#ff5808';
var directionalLight = new THREE.DirectionalLight(pointColor);
directionalLight.intensity = 4.5;
scene.add(directionalLight)



document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement)
render();
function createCubeMap() {
    var path = '../assets/texture/cubemap/parliament/';
    var format = '.jpg';
    var urls = [
        path + 'posx' + format, path + 'negx' + format,
        path + 'posy' + format, path + 'negy' + format,
        path + 'posz' + format, path + 'negz' + format
    ]
    var textureCube = THREE.ImageUtils.loadTextureCube(urls);
    return textureCube;
}

var mouseX = 0;
    var mouseY = 0;

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    function onDocumentMouseMove(event) {

        mouseX = ( event.clientX - window.innerWidth / 2 ) * 10;
        mouseY = ( event.clientY - window.innerHeight / 2 ) * 10;

    }

function render() {
    requestAnimationFrame(render);
    webGLRenderer.render(sceneCube, cameraCube);
    webGLRenderer.render(scene, camera)
    camera.lookAt(scene.position)
    cameraCube.rotation = camera.rotation;
    camera.position.x = (mouseX * .018);
            camera.position.y = 6 + (mouseY * .018);
}

function createMesh(geom, texture, normal) {

    geom.computeVertexNormals();

    if (normal) {
        var t = THREE.ImageUtils.loadTexture("../assets/texture/general/" + texture);
        var m = THREE.ImageUtils.loadTexture("../assets/texture/general/" + normal);
        var mat2 = new THREE.MeshPhongMaterial({
            map: t,
            normalMap: m
        });
        var mesh = new THREE.Mesh(geom, mat2);
        return mesh;
    } else {
        var t = THREE.ImageUtils.loadTexture("../assets/texture/general/" + texture);
        var mat1 = new THREE.MeshPhongMaterial({});
        var mesh = new THREE.Mesh(geom, mat1);
        return mesh;
    }


    // create a multimaterial
//            geom.computeTangents();


    return mesh;
}
