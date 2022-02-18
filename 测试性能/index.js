"use strict";
console.log('Hello world')
let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
const BLOCK_SIZE = 20;
const Colors = {
    blue: 0x2194CE
};

const boxGeometry = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
const boxMaterial = new THREE.MeshLambertMaterial({
    color: Colors.blue
});

function Block() {
    this.mesh = new THREE.Mesh(boxGeometry, boxMaterial);
}

function generateTerrain(scene) {
    const size = 33;
    let map = [];
    for (let i = 0; i < size; i++) {
        const ary = Array.apply(null, Array(size)).map(function() { return 0; })
        map.push(ary);
    }
    map[size - 1][size - 1] = 6;
    map[0][size - 1] = 3;
    map[size - 1][0] = 3;

    let subSize = size - 1;

    for (let iter = 0; iter < 2; iter++) {
        // square:
        for (let i = 0; i < size - subSize; i += subSize) {
            for (let j = 0; j < size - subSize; j += subSize) {
                const points = [map[j][i], map[j][i + subSize], map[j + subSize][i], map[j + subSize][i + subSize]];
                const avg = points.reduce((s, v) => s + v) / points.length;
                map[j + subSize / 2][i + subSize / 2] = Math.round(avg + Math.random() * subSize / 2);
            }
        }

        // diamond:
        for (let j = 0; j <= size - 1; j += subSize / 2) {
            for (let i = (subSize / 2 + j) % subSize; i <= size - 1; i += subSize) {
                let points = [[i, j - subSize / 2], [i, j + subSize / 2], [i + subSize / 2, j], [i - subSize / 2, j]];
                points = points.filter(p => p[0] >= 0 && p[1] >= 0 && p[0] < size && p[1] < size);
                const avg = points.reduce((s, v) => map[v[1]][v[0]] + s, 0) / points.length;
                map[j][i] = Math.round(avg + Math.random() * subSize / 2);
            }
        }

        subSize /= 2;
    }

    // bilinear interpolation:

    for (let y = 0; y < size; y += 8) {
        for (let x = 0; x < size; x += 8) {
            for (let i = 1; i < 8; i++) {
                const p1 = map[y][x];
                let p2, p3;
                if (x != size - 1) {
                    p2 = map[y][x + 8];
                    const valx = (i / 8) * (p2 - p1) + p1;
                    map[y][x + i] = Math.round(valx);
                }

                if (y != size - 1) {
                    p3 = map[y + 8][x];
                    const valy = (i / 8) * (p3 - p1) + p1;
                    map[y + i][x] = Math.round(valy);
                }
            }
        }
    }

    for (let y = 0; y < size - 1; y += 8) {
        for (let x = 0; x < size - 1; x += 8) {
            for (let j = 1; j < 8; j++) {
                const p1 = map[y][x + j];
                const p2 = map[y + 8][x + j];
                for (let i = 1; i < 8; i++) {
                    const val = (i / 8) * (p2 - p1) + p1;
                    map[y + i][x + j] = Math.round(val);
                }
            }
        }
    }

    // draw it:

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            for (var h = 0; h <= map[y][x]; h++) {
                const block = new Block();
                block.mesh.position.set(x * BLOCK_SIZE, h * BLOCK_SIZE, -y * BLOCK_SIZE);
                scene.add(block.mesh);
            }
            if (map[y][x] < 0) {
                const block = new Block();
                block.mesh.position.set(x * BLOCK_SIZE, map[y][x] * BLOCK_SIZE, -y * BLOCK_SIZE);
                scene.add(block.mesh);
            }
        }
    }

}

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(WIDTH, HEIGHT);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 1, 3000);
camera.rotation.order = "YXZ";

camera.position.set(75, 550, 500);
camera.rotation.x = -Math.PI / 6;
camera.rotation.y = -Math.PI / 8;

const hemisphereLight = new THREE.HemisphereLight(0xAAAAAA, 0x000000, 0.9);
const shadowLight = new THREE.DirectionalLight(0xFFFFFF, 0.9);
const ambientLight = new THREE.AmbientLight(0xDC8874, 0.3);

scene.fog = new THREE.Fog(0xF7D9AA, 550, 1500);

shadowLight.position.set(-10, 75, 25);
shadowLight.castShadow = true;


scene.add(hemisphereLight);
scene.add(shadowLight);
scene.add(ambientLight);

const keysDown = { up: false, down: false, left: false, right: false,
                   forward: false, backward: false };

document.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
        case 65: // a
        case 37:
            keysDown.left = true;
            break;
        case 68: // d
        case 39:
            keysDown.right = true;
            break;
        case 87: // w
        case 38:
            keysDown.forward = true;
            break;
        case 83: // s
        case 40:
            keysDown.backward = true;
            break;
        case 32:
            keysDown.up = true;
            break;
        case 16:
            keysDown.down = true;
            break;
        default:
            return;
    }
});

document.addEventListener("keyup", function(e) {
    switch (e.keyCode) {
        case 65: // a
        case 37:
            keysDown.left = false;
            break;
        case 68: // d
        case 39:
            keysDown.right = false;
            break;
        case 87: // w
        case 38:
            keysDown.forward = false;
            break;
        case 83: // s
        case 40:
            keysDown.backward = false;
            break;
        case 32:
            keysDown.up = false;
            break;
        case 16:
            keysDown.down = false;
            break;
        default:
            return;
    }
});

let initialPos = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };
let isDragging = false;
let pastRotation = { x: camera.rotation.x, y: camera.rotation.y };

const fps = 1000 / 30;
let then = Date.now();
let now;

let needsUpdate = true;

function update() {
    setTimeout(function() {
        requestAnimationFrame(update);
    }, fps);

    const amount = 10;
    const theta = -camera.rotation.y;
    if (keysDown.forward) {
        camera.position.x += amount * Math.sin(theta);
        camera.position.z -= amount * Math.cos(theta);
        needsUpdate = true;
    }
    if (keysDown.backward) {
        camera.position.x -= amount * Math.sin(theta);
        camera.position.z += amount * Math.cos(theta);
        needsUpdate = true;
    }
    if (keysDown.left) {
        camera.position.x -= amount * Math.cos(theta);
        camera.position.z -= amount * Math.sin(theta);
        needsUpdate = true;
    }
    if (keysDown.right) {
        camera.position.x += amount * Math.cos(theta);
        camera.position.z += amount * Math.sin(theta);
        needsUpdate = true;
    }
    if (keysDown.up) {
        camera.position.y += amount;
        needsUpdate = true;
    }
    if (keysDown.down) {
        camera.position.y -= amount;
        needsUpdate = true;
    }

    // this is my attempt at improving the preformance, but it only helps when the camera is not moving. Plus, it assumes nothing else in the scene will move which may not be true in the future
    if (needsUpdate) {
        renderer.render(scene, camera);
        needsUpdate = false;
    }
}

document.addEventListener("mousedown", function(e) {
    isDragging = true;
    initialPos = { x: e.clientX, y: e.clientY };
});

document.addEventListener("mouseup", function() {
    isDragging = false;
    pastRotation.x += currentRotation.x;
    pastRotation.y += currentRotation.y;
    currentRotation = { x: 0, y: 0 };
});

document.addEventListener("mousemove", function(e) {
    if (!isDragging) { return; }

    needsUpdate = true;

    const factor = 0.001;

    currentRotation.x = factor * (e.clientY - initialPos.y);
    currentRotation.y = factor * (e.clientX - initialPos.x);

    camera.rotation.x = pastRotation.x + currentRotation.x;
    camera.rotation.y = pastRotation.y + currentRotation.y;
});

generateTerrain(scene);

update();