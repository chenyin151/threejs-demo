var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(133, 133, 133));
scene.fog = new THREE.Fog( 0xffffff, 0.015, 100);
var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
// var material = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true });
var materials = [
    new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true }),
    new THREE.MeshLambertMaterial({ color: 0xff00ff }) 
]
// var plane = new THREE.Mesh(planeGeometry, material);
var plane = new THREE.SceneUtils.createMultiMaterialObject(planeGeometry, materials);
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position)

plane.rotation.x = -.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

scene.add(camera);
scene.add(plane);
var cube = createCube();
function createCube() {
    var cubeGeometry = new THREE.CubeGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xffeedd });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 6;
    scene.add(cube);
    return cube;
}

function setCube($rotX, $rotY, $rotZ, $scale, $translateX){
    this.cube.rotation.x = $rotX * (Math.PI / 180);
    this.cube.rotation.y = $rotY * (Math.PI / 180);
    this.cube.rotation.z = $rotZ * (Math.PI / 180);
    this.cube.scale.set($scale, $scale, $scale);
    this.cube.translateX($translateX)
}

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set(-40, 60, 10);
scene.add(spotLight);
function setPlanePos($x, $y, $z, $visible, $scale) {
    // plane.position.x = $x;
    // plane.position.y = $y;
    // plane.position.z = $z;
    // 也可以直接设置position.set或者 Vector3的形式设置
    plane.position.set($x, $y, $z)
    plane.visible = $visible;
    plane.scale.set($scale, $scale, $scale);

}

var options = {
    plane: {
        x : 0,
        y : 0,
        z : 0,
        scale: 1,
        visible: true
    },
    cube: {
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scale: 1,
        translateX: 0,
        color: '#ffae23',
        color1: [0,128,155]
    },
    test: {
        type: 'two',
        speed: 50
    }
}

function render() {
    requestAnimationFrame(render);
    setPlanePos(options.plane.x, options.plane.y, options.plane.z, options.plane.visible, options.plane.scale);
    setCube(options.cube.rotationX, options.cube.rotationY, options.cube.rotationZ, options.cube.scale, options.cube.translateX);
    renderer.render(scene, camera)
}
render();
document.getElementById('WebGL-output').appendChild(renderer.domElement);

var gui = new dat.GUI();
var f1 = gui.addFolder('plane位置控制')
f1.add(options.plane, 'x', 0, 100)
f1.add(options.plane, 'y', -50, 20);
f1.add(options.plane, 'z', -500, 500);
f1.add(options.plane, 'visible', true);
f1.add(options.plane, 'scale', 1, 3)
var f2 = gui.addFolder('cube设置');
f2.add(options.cube, 'rotationX', 0, 360);
f2.add(options.cube, 'rotationY', 0, 360);
f2.add(options.cube, 'rotationZ', 0, 360);
f2.add(options.cube, 'scale', 1, 3);
var f2_1 = f2.addFolder('translate');
f2_1.add(options.cube, 'translateX', -4, 4);
f2_1.addColor(options.cube, 'color').name('CSS颜色值')
f2_1.addColor(options.cube, 'color1').name('RGB颜色值')
f2_1.add(options.test, 'type', ['one', 'two', 'three'])
var control0 = f2_1.add(options.test, 'speed', { slow: 1, '中速':20, fast: 50})
f2_1.open()

control0.onChange(function($val) {
    console.log('onChange', $val)

})





