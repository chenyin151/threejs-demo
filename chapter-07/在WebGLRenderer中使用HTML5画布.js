/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-24 13:26:43
 * @LastEditors: cy
 * @LastEditTime: 2021-08-24 15:17:49
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setClearColor(new THREE.Color(0x000000, 1.0));
webGLRenderer.setSize(window.innerWidth, window.innerHeight);
camera.position.x = 20;
camera.position.y = 0;
camera.position.z = 150;

document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement);
render();
var getTexture = function() { 
    var canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    var ctx = canvas.getContext('2d');
    ctx.translate(-81, -84);
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();

    // the eyes
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    // the pupils
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
    // canvas当做纹理
    var texture = new THREE.Texture(canvas);
    // 告诉GPU更新纹理
    texture.needsUpdate = true;
    return texture;

}
// 单个精灵的更容易控制，但是性能低下
function createSprites() {
    var material = new THREE.SpriteMaterial({
        map: getTexture(),
        color: 0xffffff
    })
    var range = 500;
    for (var i = 0; i < 1000; i++) {
        var sprite = new THREE.Sprite(material);
        sprite.position.set(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
        sprite.scale.set(4, 4, 4);
        scene.add(sprite);
    }
}
createSprites()
createPointCloud(4, true, true, true, 0x00ff00);
var cloud;
function createPointCloud(size, transparent, opacity, sizeAttenuation, color) {
    var geom = new THREE.Geometry();
    var material = new THREE.PointCloudMaterial({ 
        size: size,
        transparent: transparent,
        opacity: opacity,
        map: getTexture(),
        sizeAttenuation: sizeAttenuation,
        color: color
    })
    var range = 500;
    for (var i = 0; i < 5000; i++) {
        var particle = new THREE.Vector3(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
        geom.vertices.push(particle);
    }
    cloud = new THREE.PointCloud(geom, material);
    cloud.sortParticles = true;
    scene.add(cloud);
}
function render() {
    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera)
}
