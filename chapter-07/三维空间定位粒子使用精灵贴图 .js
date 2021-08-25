/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-25 10:57:38
 * @LastEditors: cy
 * @LastEditTime: 2021-08-25 11:24:15
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
var getTexture = function() {
    var texture = new THREE.ImageUtils.loadTexture('../assets/texture/particles/sprite-sheet.png');
    return texture;
}
createSprites();
render();
var group;

function createSprites() {
    group = new THREE.Object3D();
    var range = 200;
    for (var i = 0; i < 400; i++) {
        group.add(createSprite(10, false, .6, 0xfff, i % 5, range));
    }
    scene.add(group)
}
function createSprite(size, transparent, opacity, color, spriteNumber, range) {
    var spriteMaterial = new THREE.SpriteMaterial({
        opacity: opacity,
        color: color,
        transparent: transparent,
        map: getTexture()
    })
    spriteMaterial.map.offset = new THREE.Vector2(.2 * spriteNumber, 0);
    spriteMaterial.map.repeat = new THREE.Vector2(1/5, 1);
    spriteMaterial.depthTest = false;
    spriteMaterial.blending = THREE.AdditiveBlending;
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(size, size, size);
    sprite.position.set(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
    sprite.velocityX = 5;
    return sprite;
}
var step = 0;
function render() {
    requestAnimationFrame(render)
    webGLRenderer.render(scene, camera)
    step += .01;
    group.rotation.x = step;
}