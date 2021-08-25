/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-24 16:47:10
 * @LastEditors: cy
 * @LastEditTime: 2021-08-25 09:15:08
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setClearColor(new THREE.Color(0x000000, 1.0));
webGLRenderer.setSize(window.innerWidth, window.innerHeight);
camera.position.x = 20;
camera.position.y = 40;
camera.position.z = 110;
camera.lookAt(new THREE.Vector3(20, 30, 0));
document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement);
createPointClouds(4, true, .5, true, 0x00ff00);
render();

function createPointCloud(name, texture, size, transparent, opacity, sizeAttenuation, color) {
    var geom = new THREE.Geometry();
    var color = new THREE.Color(color);
    color.setHSL(color.getHSL().h, color.getHSL().s, Math.random() * color.getHSL().l);
    var material = new THREE.PointCloudMaterial({
        size: size,
        transparent: transparent,
        opacity: opacity,
        map: texture,
        blending: THREE.AdditiveBlending, 
        // depthWrite设置为true那么当一个粒子在另个PointCloud粒子前会看到纹理的黑色背景
        depthWrite: false,
        sizeAttenuation: sizeAttenuation,
        color: color
    })
    var range = 40;
    for (var i = 0; i < 50; i++) {
        var particle = new THREE.Vector3(
            Math.random() * range - range / 2, 
            Math.random() * range * 1.5,
            Math.random() * range - range / 2
        )
        particle.velocityX = (Math.random() - .5) / 3;
        particle.velocityY = .1 + Math.random() / 5;
        particle.velocityZ = (Math.random() - .5) / 3;
        geom.vertices.push(particle);
    }
    var system = new THREE.PointCloud(geom, material);
    system.name = name;
    system.sortParticles = true;
    return system;
}

function createPointClouds(size, transparent, opacity, sizeAttenuation, color) {
    var texture1 = THREE.ImageUtils.loadTexture('../assets/texture/particles/snowflake1.png');
    var texture2 = THREE.ImageUtils.loadTexture('../assets/texture/particles/snowflake2.png');
    var texture3 = THREE.ImageUtils.loadTexture('../assets/texture/particles/snowflake3.png');
    var texture4 = THREE.ImageUtils.loadTexture('../assets/texture/particles/snowflake4.png');
    scene.add(createPointCloud('system1', texture1, size, transparent, opacity, sizeAttenuation, color));
    scene.add(createPointCloud('system2', texture2, size, transparent, opacity, sizeAttenuation, color));
    scene.add(createPointCloud('system3', texture3, size, transparent, opacity, sizeAttenuation, color));
    scene.add(createPointCloud('system4', texture4, size, transparent, opacity, sizeAttenuation, color));
}
function render() {
    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
    scene.children.forEach(function(child) {
        if (child instanceof THREE.PointCloud) {
            var vertices = child.geometry.vertices;
            vertices.forEach(function (v) {
                v.y = v.y - (v.velocityY);
                v.x = v.x - (v.velocityX);
                v.z = v.z - (v.velocityZ)

                if (v.y <= 0) v.y = 60;
                if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
                if (v.z <= -20 || v.z >= 20) v.velocityZ = v.velocityZ * -1;
            })
        }
    })
}