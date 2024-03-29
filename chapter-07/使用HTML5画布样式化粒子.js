/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-24 11:04:31
 * @LastEditors: cy
 * @LastEditTime: 2021-08-24 13:24:59
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var canvasRenderer = new THREE.CanvasRenderer();
canvasRenderer.setClearColor(new THREE.Color(0x000000, 1.0));
canvasRenderer.setSize(window.innerWidth, window.innerHeight);
camera.position.x = 20;
camera.position.y = 0;
camera.position.z = 150;
var getTexture = function (ctx) {
    // the body
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

};
createSprites();
document.getElementById('WebGL-output').appendChild(canvasRenderer.domElement);
render();

function createSprites() {
    var material = new THREE.SpriteCanvasMaterial({ 
        // 该属性指定一个函数，这个函数以canvas上下文为参数，当渲染粒子时，此函数会被调用，调用此二维上下文的输出
        // 将显示为粒子的外观
        program: getTexture,
        color: 0xffffff
    })
    material.rotation = Math.PI;
    var range = 500;
    for (var i = 0; i < 1000; i++) {
        var sprite = new THREE.Sprite(material);
        sprite.position.set(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
        sprite.scale.set(.1,.1,.1);
        scene.add(sprite);
    }
}

function render() {
    requestAnimationFrame(render);
    canvasRenderer.render(scene, camera);
}