/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-22 09:57:41
 * @LastEditors: cy
 * @LastEditTime: 2021-12-16 10:38:09
 */
console.log
function addScript(url){
    var script = document.createElement('script');
    script.setAttribute('type','text/javascript');
    script.setAttribute('src',url);
    document.getElementsByTagName('head')[0].appendChild(script);
}
addScript('./libs/three.min.js');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

// 设置场景的背景色
renderer.setClearColor(0xeeeeee);
// 设置场景大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 创建轴
var axes = new THREE.AxisHelper(20);
// 把轴添加到场景中
scene.add(axes);

var geometry = new THREE.BufferGeometry();
var vertices = new Float32Array( [
	-1.0, -1.0,  1.0,
	 1.0, -1.0,  1.0,
	 1.0,  1.0,  1.0,

	 1.0,  1.0,  1.0,
	-1.0,  1.0,  1.0,
	-1.0, -1.0,  1.0
] );
geometry.addAttribute('position', new THREE.BufferAttribute( vertices, 3 ));
var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;

camera.lookAt(scene.position)
document.getElementById('WebGL-output').appendChild(renderer.domElement);
renderer.render(scene, camera);
console.log('hello', vertices)
