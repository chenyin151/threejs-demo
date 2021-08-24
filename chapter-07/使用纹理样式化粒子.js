/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-24 15:24:53
 * @LastEditors: cy
 * @LastEditTime: 2021-08-24 16:43:48
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setClearColor(new THREE.Color(0x000000, 1.0));
webGLRenderer.setSize(window.innerWidth, window.innerHeight)

camera.position.x = 20;
camera.position.y = 40;
camera.position.z = 110;
camera.lookAt(new THREE.Vector3(20, 30, 0));
var cloud;
document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement);
createPointCloud(4, true, .5, true, 0x00ff00);
render();
function render() {
    requestAnimationFrame(render)
    webGLRenderer.render(scene, camera)
    var vertices = cloud.geometry.vertices;
    vertices.forEach(function(v) {
        v.y = v.y - (v.velocityY);
        v.x = v.x - (v.velocityX);
        // 如果v.y位置低于0，就把雨滴放回顶部
        if (v.y <= 0) v.y = 60;
        if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
    })
}

function createPointCloud(size, transparent, opacity, sizeAttenuation, color) {
    var texture = THREE.ImageUtils.loadTexture('../assets/texture/particles/raindrop-2.png');
    var geom = new THREE.Geometry();
    var material = new THREE.PointCloudMaterial({
        size: size,
        transparent: transparent,
        opacity: opacity,
        map: texture,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: sizeAttenuation,
        color: color
    })
    var range = 40;
    for (var i = 0; i < 1000; i++) {
        var particle = new THREE.Vector3(
            Math.random() * range - range / 2,
            Math.random() * range * 1.5,
            Math.random() * range - range / 5
        );
        // 给每个粒子定义额外的两个属性-velocityY和velocityX,第一个属性定义粒子如何水平移动
        // 第二个属性定义雨滴以多块的速度下落
        particle.velocityY = .1 + Math.random() / 5;
        particle.velocityX = (Math.random() - .5) / 3;
        geom.vertices.push(particle);
    }
    // ParticleSystem等同于pointCloud
    cloud = new THREE.PointCloud(geom, material);
    cloud.sortParticles = true;
    scene.add(cloud);
}