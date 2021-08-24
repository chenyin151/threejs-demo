/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-24 10:17:01
 * @LastEditors: cy
 * @LastEditTime: 2021-08-24 10:59:29
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setClearColor(new THREE.Color(0x000000, 1.0));
webGLRenderer.setSize(window.innerWidth, window.innerHeight);

camera.position.x = 20;
camera.position.y = 0;
camera.position.z = 150;
var cloud;
createParticles(10, true, .5, true, true, 0x00ff00)
document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement);
/**
 * 
 * @param {*} size 该属性指定粒子的大小，默认值为1
 * @param {*} transparent 如果该属性设置为true，那么粒子在渲染时会根据opacity属性的值来确定其透明度，默认值为false
 * @param {*} opacity 该属性与transparent一起使用，用来设置粒子的透明度，默认值为1
 * @param {*} vertexColors 通常THREE.PointCloud中的所有粒子都拥有相同颜色，如果该属性设置为THREE.VertexColors，并且
 *                         几何体的颜色数组也有值，那就会使用颜色数组中的值，默认为THREE.NoColors
 * @param {*} sizeAttenuation 如果该属性值设置为false，那么所有粒子都将拥有相同的尺寸，无论他们距离摄像机有多远，如果设置
 *                            为true，粒子的大小取决于其距离摄像机的远近，默认true
 * @param {*} color ParticleSystem中所有粒子的颜色，将vertexColors属性设置为true，并且通过颜色属性指定了几何体的颜色，那么将
 *                  覆盖该属性值
 */
function createParticles(size, transparent, opacity, vertexColors, sizeAttenuation, color) {
    var geom = new THREE.Geometry();
    var material = new THREE.PointCloudMaterial({ 
        size: size, 
        transparent: transparent, 
        vertexColors: vertexColors, 
        opacity: opacity, 
        sizeAttenuation: sizeAttenuation, 
        color: color
    });
    var range = 500;
    for (var i = 0; i < 15000; i++) {
        var particle = new THREE.Vector3(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
        geom.vertices.push(particle);
        var color = new THREE.Color(0x00ff00);
        color.setHSL(color.getHSL().h, color.getHSL().s, color.getHSL().l);
        geom.colors.push(color);
    }
    cloud = new THREE.PointCloud(geom, material);
    cloud.name = 'particles';
    scene.add(cloud);
}
var step = 0;
render();
function render() {
    cloud.rotation.x = step;
    cloud.rotation.z = step;
    step += .01;
    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera)
}