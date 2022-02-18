/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-30 14:08:26
 * @LastEditors: cy
 * @LastEditTime: 2021-12-14 15:29:45
 */
var renderer;
var scene;
var camera, cubeCamera;

var control;
var orbit;

var sphere;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 10000);
    orbit = new THREE.OrbitControls(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000, 1.0));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var textureCube = createCubeMap();
    textureCube.format = THREE.RGBFormat;

    var shader = THREE.ShaderLib['cube'];
    shader.uniforms['tCube'].value = textureCube;
    debugger
    var material = new THREE.ShaderMaterial({
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: THREE.DoubleSide
    });
    var skybox = new THREE.Mesh(new THREE.BoxGeometry(10000, 10000, 10000), material);
    scene.add(skybox);

    // 第一个参数：近剪裁距离 第二个参数：远剪裁距离 第三个参数：立方体边缘长度
    cubeCamera = new THREE.CubeCamera(.1, 20000, 256);
    scene.add(cubeCamera);

    var sphereGeometry = new THREE.SphereGeometry(4, 15, 15);
    var boxGeometry = new THREE.BoxGeometry(5, 5, 5)
    var cylinderGeometry = new THREE.CylinderGeometry(2, 4, 10, 20, 20, false);
    var dynamicEnvMaterial = new THREE.MeshBasicMaterial({ envMap: cubeCamera.renderTarget, side: THREE.DoubleSide })
    var envMaterial = new THREE.MeshBasicMaterial({ envMap: textureCube, side: THREE.DoubleSide })

    sphere = new THREE.Mesh(sphereGeometry, dynamicEnvMaterial);
    sphere.name = 'sphere';
    scene.add(sphere);

    var cylinder = new THREE.Mesh(cylinderGeometry, envMaterial);
    cylinder.name = 'cylinder';
    scene.add(cylinder);
    cylinder.position.set(10, 0, 0);

    var cube = new THREE.Mesh(boxGeometry, envMaterial);
    cube.name = 'cube';
    scene.add(cube);
    cube.position.set(-10, 0, 0);

    camera.position.x = 0;
    camera.position.y = 5;
    camera.position.z = 33;

    document.getElementById('WebGL-output').appendChild(renderer.domElement);

    control = new function() {
        this.rotationSpeed = 0.005,
        this.scale = 1;
    }
    addControls(control);

    render();
}

function addControls(control) {
    var gui = new dat.GUI()
    gui.add(control, 'rotationSpeed', -.1, .1)
}

function createCubeMap() {
    var path = '../assets/texture/cubemap/demo/';
    var format = '.jpg';
    var urls = [
        path + 'posx' + format, path +'negx' + format,
        path + 'posy' + format, path +'negy' + format,
        path + 'posz' + format, path +'negz' + format,
    ]
    var textureCube = THREE.ImageUtils.loadTextureCube(urls);
    return textureCube;
}

function render() {
    orbit.update();
    sphere.visible = false;

    cubeCamera.updateCubeMap(renderer, scene);
    sphere.visible = true;

    renderer.render(scene, camera)
    scene.getObjectByName('cube').rotation.x += control.rotationSpeed;
    scene.getObjectByName('cube').rotation.y += control.rotationSpeed;
    scene.getObjectByName('cylinder').rotation.x += control.rotationSpeed;

    requestAnimationFrame(render)
}
window.onload=init;