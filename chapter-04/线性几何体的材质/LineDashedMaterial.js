/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-28 16:03:50
 * @LastEditors: cy
 * @LastEditTime: 2020-12-28 16:43:43
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
var renderer = new THREE.WebGLRenderer();

camera.position.set(-30, 40, 30);
camera.lookAt(scene.position)
renderer.setClearColor(new THREE.Color(0xaaaaff, 1));
renderer.setSize(window.innerWidth, window.innerHeight)

var points = gosper(4, 60)
var lines = new THREE.Geometry();
var colors = [];
var i = 0;
points.forEach(function(e) {
    lines.vertices.push(new THREE.Vector3(e.x, e.y, e.z));
    colors[ i ] = new THREE.Color(0xffffff);
    colors[ i ].setHSL(e.x / 100 + .5, ( e.y * 20)/300, .8);
    i++;
})
lines.colors = colors;
lines.computeLineDistances();
var material = new THREE.LineDashedMaterial({
    opacity: 1.0,
    linewidth: 1,
    color: 0xffffff,
    dashSize: 10,
    gapSize: 1,
    scale: .1,
    vertexColors: true
})
var line = new THREE.Line(lines, material);
line.position.set(25, -30, -60);
scene.add(line);
document.getElementById("WebGL-output").appendChild(renderer.domElement);

function gosper(a, b) {

    var turtle = [0, 0, 0];
    var points = [];
    var count = 0;

    rg(a, b, turtle);


    return points;

    function rt(x) {
        turtle[2] += x;
    }

    function lt(x) {
        turtle[2] -= x;
    }

    function fd(dist) {
//                ctx.beginPath();
        points.push({x: turtle[0], y: turtle[1], z: Math.sin(count) * 5});
//                ctx.moveTo(turtle[0], turtle[1]);

        var dir = turtle[2] * (Math.PI / 180);
        turtle[0] += Math.cos(dir) * dist;
        turtle[1] += Math.sin(dir) * dist;

        points.push({x: turtle[0], y: turtle[1], z: Math.sin(count) * 5});
//                ctx.lineTo(turtle[0], turtle[1]);
//                ctx.stroke();

    }

    function rg(st, ln, turtle) {

        st--;
        ln = ln / 2.6457;
        if (st > 0) {
//          ctx.strokeStyle = '#111';
            rg(st, ln, turtle);
            rt(60);
            gl(st, ln, turtle);
            rt(120);
            gl(st, ln, turtle);
            lt(60);
            rg(st, ln, turtle);
            lt(120);
            rg(st, ln, turtle);
            rg(st, ln, turtle);
            lt(60);
            gl(st, ln, turtle);
            rt(60);
        }
        if (st == 0) {
            fd(ln);
            rt(60);
            fd(ln);
            rt(120);
            fd(ln);
            lt(60);
            fd(ln);
            lt(120);
            fd(ln);
            fd(ln);
            lt(60);
            fd(ln);
            rt(60)
        }
    }

    function gl(st, ln, turtle) {
        st--;
        ln = ln / 2.6457;
        if (st > 0) {
//                    ctx.strokeStyle = '#555';
            lt(60);
            rg(st, ln, turtle);
            rt(60);
            gl(st, ln, turtle);
            gl(st, ln, turtle);
            rt(120);
            gl(st, ln, turtle);
            rt(60);
            rg(st, ln, turtle);
            lt(120);
            rg(st, ln, turtle);
            lt(60);
            gl(st, ln, turtle);
        }
        if (st == 0) {
            lt(60);
            fd(ln);
            rt(60);
            fd(ln);
            fd(ln);
            rt(120);
            fd(ln);
            rt(60);
            fd(ln);
            lt(120);
            fd(ln);
            lt(60);
            fd(ln);
        }
    }
}

render();
function render() {
    requestAnimationFrame(render);
    line.rotation.z += 0.01;
    renderer.render(scene, camera);
}