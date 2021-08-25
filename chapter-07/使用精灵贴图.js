/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-25 09:43:09
 * @LastEditors: cy
 * @LastEditTime: 2021-08-25 10:53:34
 */
var scene = new THREE.Scene();
var sceneOrtho = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000)
var cameraOrtho = new THREE.OrthographicCamera(0, window.innerWidth, window.innerHeight, 0, -10, 10);
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setClearColor(new THREE.Color(0x000000, 1.0));
webGLRenderer.setSize(window.innerWidth, window.innerHeight);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 50;

document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement);

var material = new THREE.MeshNormalMaterial();
var geom = new THREE.SphereGeometry(15, 20, 20);
var mesh = new THREE.Mesh(geom, material);
scene.add(mesh);

var getTexture = function() {
    var texture = new THREE.ImageUtils.loadTexture('../assets/texture/particles/sprite-sheet.png');
    return texture;
}
var spriteNumber = 0;
createSprites(64, true, .6, 0xfff, spriteNumber);
function createSprites(size, transparent, opacity, color, spriteNumber) {
    var spriteMaterial = new THREE.SpriteMaterial({ 
        opacity: opacity,
        color: color,
        transparent: transparent,
        map: getTexture()
    })
    spriteMaterial.map.offset = new THREE.Vector2(1/5 * spriteNumber, 0);
    // 因为offset只是设置在U坐标上偏移到的起始坐标，没有设置裁剪区域大小，所以单单设置此值
    // 只会让从此点到最后的多个图形压缩在一起，必须通过repeat指定放大区域的图形填满指定区域
    spriteMaterial.map.repeat = new THREE.Vector2(1/5, 1);
    spriteMaterial.blending = THREE.AdditiveBlending;
    // depthTest深度测试
    spriteMaterial.depthTest = false;
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(size, size, size);
    sprite.position.set(100, 50, 0);
    sprite.velocityX = 5;
    sceneOrtho.add(sprite);
}
var step = 0;
render();
function render() {
    camera.position.y = Math.sin(step += .01) * 20;
    requestAnimationFrame(render)
    sceneOrtho.children.forEach(function(e) {
        if (e instanceof THREE.Sprite) {
            e.position.x += e.velocityX;
            
            if (e.position.x > window.innerWidth) {
                if (spriteNumber >= 5) {
                    spriteNumber = 0;
                } else {
                    spriteNumber += 1;
                }
                
                e.velocityX = -5;
                console.log('xxx')
                e.material.map.offset.set(1/5 * spriteNumber, 0);
            }
            if (e.position.x < 0) {
                e.velocityX = 5;
            }
        }
    })
    webGLRenderer.render(scene, camera)
    webGLRenderer.autoClear = false;
    webGLRenderer.render(sceneOrtho, cameraOrtho)
}