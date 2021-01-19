/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-28 09:24:40
 * @LastEditors: cy
 * @LastEditTime: 2020-12-28 11:33:46
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 130);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x000000, 1.0));

camera.position.x = -50;
camera.position.y = 40;
camera.position.z = 50;
camera.lookAt(scene.position);
scene.add(camera);
var box = createBox();
var light = createSpotLight();
function createBox() {
    for(let i = 0; i < 100; i++) {
        var geometry = new THREE.BoxGeometry(4,4,4);
        var material = new THREE.MeshLambertMaterial({ color: 0xff00ee });
        var box = new THREE.Mesh(geometry, material);
        box.rotation.x = -10 * Math.PI / 180;
        box.position.set(-60 + Math.round(Math.random() * 100), Math.round(Math.random() * 10), -100 + Math.round(Math.random() * 150));
        scene.add(box);
    }
    return box;
}

function createSpotLight() {
    var spotLight = new THREE.SpotLight( 0xffffff );
    scene.add(spotLight);
}
// 使用这个材质外表是由物体到摄像机的距离决定的
scene.overrideMaterial = new THREE.MeshDepthMaterial();

var options = {
    near: 0
}
render();
function render() {
    requestAnimationFrame(render);
    console.log('render', options.near);
    camera.near = options.near;
    renderer.render(scene, camera)
    scene.traverse(function(e) {
        if (e instanceof THREE.Mesh) {
            e.rotation.x += .1;
            e.rotation.y += .1;
            e.rotation.z += .1;
        }
        
    })
}
document.getElementById('WebGL-output').appendChild(renderer.domElement);

var gui = new dat.GUI();
var f = gui.addFolder('摄像机');
f.add(options, 'near', 0, 50);