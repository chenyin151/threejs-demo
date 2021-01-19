/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-22 13:18:12
 * @LastEditors: cy
 * @LastEditTime: 2020-12-22 15:11:29
 */
function addScript(url){
    var script = document.createElement('script');
    script.setAttribute('type','text/javascript');
    script.setAttribute('src',url);
    document.getElementsByTagName('head')[0].appendChild(script);
}
addScript('./libs/three.min.js');
window.addEventListener('resize', ()=> {
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0, 0, 0))
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
camera.lookAt(scene.position)

var planeGeometry = new THREE.PlaneGeometry(60, 20);
var planeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.rotation.x = -.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.castShadow = true;
spotLight.position.set(-40, 60, -10);
scene.add( spotLight)
scene.add(camera);
scene.add(plane);
renderer.render(scene, camera)
document.getElementById('WebGL-output').appendChild(renderer.domElement);
function addCube() {
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
    cube.position.y = Math.round((Math.random() * 5));
    cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));
    cube.castShadow = true;
    cube.name = 'cube-' + scene.children.length;
    scene.add(cube);
    renderer.render(scene, camera)

    console.log('通过getObjectByName获取：', scene.getObjectByName('cube-10'))
}

function removeCube() {
    // 获取场景中所有子对象列表
    var allChildren = scene.children;
    var lastObject = allChildren[allChildren.length - 1];
    if (lastObject instanceof THREE.Mesh) {
        // 从场景中移除
        scene.remove(lastObject);
        this.numberOfObjects = scene.children.length;
    }
    renderer.render(scene, camera)
}


var btnAdd = document.createElement('button');
btnAdd.setAttribute('style', 'position: absolute; top: 0; right: 0;')
var txt = document.createElement('text');
txt.innerHTML = '添加';
btnAdd.appendChild(txt)
document.body.appendChild(btnAdd)

var btnRem = document.createElement('button');
btnRem.setAttribute('style', 'position: absolute; top: 0; right: 50px;')
var txt = document.createElement('text');
txt.innerHTML = '移除';
btnRem.appendChild(txt)
document.body.appendChild(btnRem)

btnAdd.addEventListener("click", () => {
    addCube();
})
btnRem.addEventListener('click', () => {
    console.log('rem')
    removeCube();
})
render();
function render() {
    var allChildren = scene.children;
    scene.traverse($e => {
        if ($e instanceof THREE.Mesh && $e != plane) {
            $e.rotation.x += .1;
            $e.rotation.y += .1;
            $e.rotation.z += .1;
        }
    })
    requestAnimationFrame(render);
    renderer.render(scene, camera)
}

