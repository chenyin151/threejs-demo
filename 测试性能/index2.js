/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2022-02-25 16:39:02
 * @LastEditors: cy
 * @LastEditTime: 2022-02-25 17:28:32
 */
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import Stats from 'three/examples/jsm/libs/stats.module'

const scene = new THREE.Scene()
// scene.add(new THREE.AxesHelper(5))

const light = new THREE.SpotLight()
light.position.set(12.5, 12.5, 12.5)
light.castShadow = true
// light.shadow.map.size.width = 1024
// light.shadow.map.size.height = 1024
scene.add(light)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(15, 15, 15)

const renderer = new THREE.WebGLRenderer()
renderer.shadowMapEnabled = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new THREE.OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true

const pickableObjects= []
let intersectedObject = [];
const originalMaterials = {}
const highlightedMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0x00ff00
})

var loader = new THREE.OBJMTLLoader();
var texture = THREE.ImageUtils.loadTexture('./assets/texture/metro01.JPG')
loader.load('./assets/models/city.obj', './assets/models/city.mtl', (e) => {
    let m = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    e.material = m;
    console.log('mox')
    scene.add(e)
    pickableObjects.push(e)
});

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

// const raycaster = new THREE.Raycaster()
let intersects

renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, true)
function onDocumentMouseMove(event) {
    // raycaster.setFromCamera(
    //     {
    //         x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
    //         y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
    //     },
    //     camera
    // )
    let vector = new THREE.Vector3({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
    }).unproject(camera);
    const raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize())
    intersects = raycaster.intersectObjects(pickableObjects, false)
        console.log('intersects', intersects, pickableObjects)
    if (intersects.length > 0) {
        intersectedObject = intersects[0].object
    } else {
        intersectedObject = null
    }
    pickableObjects.forEach((o, i) => {
        if (intersectedObject && intersectedObject.name === o.name) {
            pickableObjects[i].material = highlightedMaterial
        } else {
            pickableObjects[i].material = originalMaterials[o.name]
        }
    })
}

// const stats = Stats()
// document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)
    controls.update()

    render()

    // stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()