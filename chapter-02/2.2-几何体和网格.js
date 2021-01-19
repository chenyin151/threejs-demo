/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-22 15:42:02
 * @LastEditors: cy
 * @LastEditTime: 2020-12-24 09:49:37
 */
function addScript(url){
    var script = document.createElement('script');
    script.setAttribute('type','text/javascript');
    script.setAttribute('src',url);
    document.getElementsByTagName('head')[0].appendChild(script);
}
addScript('./libs/dat.gui.js');
addScript('./libs/three.min.js');
var vertices = [
    new THREE.Vector3(1, 3, 1),
    new THREE.Vector3(1, 3, -1),
    new THREE.Vector3(1, -1, 1),
    new THREE.Vector3(1, -1, -1),
    new THREE.Vector3(-1, 3, -1),
    new THREE.Vector3(-1, 3, 1),
    new THREE.Vector3(-1, -1, -1),
    new THREE.Vector3(-1, -1, 1)
];
var faces = [
    new THREE.Face3(0, 2, 1),
    new THREE.Face3(2, 3, 1),
    new THREE.Face3(4, 6, 5),
    new THREE.Face3(6, 7, 5),
    new THREE.Face3(4, 5, 1),
    new THREE.Face3(5, 0, 1),
    new THREE.Face3(7, 6, 2),
    new THREE.Face3(6, 3, 2),
    new THREE.Face3(5, 7, 0),
    new THREE.Face3(7, 2, 0),
    new THREE.Face3(1, 3, 4),
    new THREE.Face3(3, 6, 4),
]
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMapEnabled = true;
var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
var planeMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
plane.receiveShadow = true;
scene.add(plane);
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(new THREE.Vector3(5, 0, 0));

renderer.setClearColor(new THREE.Color(133,133,133))
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set(-40, 60, -10);
spotLight.castShadow = true;
scene.add(spotLight);
scene.add(camera);

var geom = new THREE.Geometry();
geom.vertices = vertices;
geom.faces = faces;
geom.computeFaceNormals();

var materials = [
    new THREE.MeshLambertMaterial({opacity: 0.6, color: 0x44ff44, transparent: true}),
    new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})
];
// SceneUtils.createMultiMaterialObject可以给物体同时添加多种材质
var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials);
mesh.castShadow = true;
mesh.children.forEach(function(e) {
    e.castShadow = true;
})

// function addControl(x, y, z) {
//     var controls = new function() {
//         this.x = x;
//         this.y = y;
//         this.z = z;
//     }
//     return controls;
// }
// var controlPoints = [];
// controlPoints.push(addControl(3, 5, 3));
// controlPoints.push(addControl(3, 5, 0));
// controlPoints.push(addControl(3, 0, 3));
// controlPoints.push(addControl(3, 0, 0));
// controlPoints.push(addControl(0, 5, 0));
// controlPoints.push(addControl(0, 5, 3));
// controlPoints.push(addControl(0, 0, 0));
// controlPoints.push(addControl(0, 0, 3));

scene.add(mesh)
console.log('------------------------->', camera)
renderer.render(scene, camera)
// renderScene();
function renderScene() {
    // mesh.children.forEach(function (e) {
    //     e.geometry.vertices = vertices;
    //     e.geometry.verticesNeedUpdate = true;
    //     e.geometry.computeFaceNormals();
    // })
    
    requestAnimationFrame(renderScene);
    
}


document.getElementById('WebGL-output').appendChild(renderer.domElement);

var gui = new dat.GUI();
var controls = new function() {
    this.speed = 0
}
gui.add(controls, 'speed', 0, 1);
gui.add(new function() {
    console.log('ccc')
    this.clone = function() {
        var clonedGeometry = mesh.children[0].geometry.clone();
        var materials = [
            new THREE.MeshLambertMaterial({ opacity: .6, color: 0xff44ff, transparent: true }),
            new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true })
        ];
        var mesh2 = THREE.SceneUtils.createMultiMaterialObject(clonedGeometry, materials);
        mesh2.children.forEach(function(e) {
            e.castShadow = true;
        })
        mesh2.translateX(5);
        mesh2.translateY(5);
        scene.remove(scene.getChildByName('clone'));
        scene.add(mesh2);
    }
}, 'clone')