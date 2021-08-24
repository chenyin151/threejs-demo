/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-24 09:00:07
 * @LastEditors: cy
 * @LastEditTime: 2021-08-24 11:03:42
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var canvasRenderer = new THREE.WebGLRenderer();
canvasRenderer.setClearColor(new THREE.Color(0x000000, 1.0));
canvasRenderer.setSize(window.innerWidth, window.innerHeight);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 150;
document.getElementById('WebGL-output').appendChild(canvasRenderer.domElement);
// createSprites();
createPointCloud();
render();
// 创建粒子
function createSprites() {
    
    for (var x = -5; x < 5; x++) {
        for (var y = -5; y < 5; y++) {
            var material = new THREE.SpriteMaterial({color: Math.random() * 0xff0000});
            var sprite = new THREE.Sprite(material);
            sprite.position.set(x * 10, y * 10, 0);
            scene.add(sprite);
        }
    }
}
// 创建粒子云/点云
function createPointCloud() {
    var geom = new THREE.Geometry();
    // size指定粒子的大小，color指定粒子系统的所有粒子颜色，将vertexColors属性设置为true，并且通过颜色属性指定了
    // 几何体颜色，那么将覆盖该属性（更准确地说，顶点的颜色将乘以此值以确定最终颜色），默认值为0xffffff
    // vertexColors:通常THREE.PointCloud中的所有粒子都将有相同的颜色，如果该属性设置为THREE.VertexColors，并且
    // 几何体的数组也有值，那么会使用颜色数组中的值，默认值为THREE.NoColors
    var material = new THREE.PointCloudMaterial({ size: 4, vertexColors: true, color: 0xffffff });
    for (var x = -5; x < 5; x++) {
        for (var y = -5; y < 5; y++) {
            var particle = new THREE.Vector3(x * 10, y * 10, 0);
            geom.vertices.push(particle);
            geom.colors.push(new THREE.Color(Math.random() * 0x00ffff));
        }
    }
    var cloud = new THREE.PointCloud(geom, material)
    scene.add(cloud);
}
function render() {
    requestAnimationFrame(render);
    canvasRenderer.render(scene, camera);
}