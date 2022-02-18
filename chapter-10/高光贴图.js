/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-30 13:35:35
 * @LastEditors: cy
 * @LastEditTime: 2021-08-30 14:05:36
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000);
var webGLRenderer = new THREE.WebGLRenderer();

webGLRenderer.setClearColor(new THREE.Color(0x000, 1.0))
webGLRenderer.setSize(window.innerWidth, window.innerHeight)
webGLRenderer.shadowMapEnabled = true;

var sphere = createMesh(new THREE.SphereGeometry(10, 40, 40));
scene.add(sphere);

camera.position.x = 15;
camera.position.y = 15;
camera.position.z = 15;

camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
var orbitControl = new THREE.OrbitControls(camera);
orbitControl.autoRotate = true;
var clock = new THREE.Clock();

var ambientLight = new THREE.AmbientLight(0x330000);
scene.add(ambientLight);

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set(350, 350, 150);
spotLight.intensity = 0.4;

scene.add(spotLight);

document.getElementById('WebGL-output').appendChild(webGLRenderer.domElement);
var step = 0;

render();

function createMesh(geom) {
    var planetTexture = THREE.ImageUtils.loadTexture('../assets/texture/planets/Earth.png');
    var specularTexture = THREE.ImageUtils.loadTexture('../assets/texture/planets/EarthSpec.png');
    var normalTexture = THREE.ImageUtils.loadTexture('../assets/texture/planets/EarthNormal.png'); 

    var planetMaterial = new THREE.MeshPhongMaterial();
    // specularMap: 高光贴图，specularMap一般与specular配合使用，specularMap颜色值越高，表面越光滑，specular
    // 指定反光的颜色
    planetMaterial.specularMap = specularTexture;
    planetMaterial.specular = new THREE.Color(0xff0000);
    // shininess光泽度，当shininess值越大，高光的光斑越小
    planetMaterial.shininess = 2;
    planetMaterial.normalMap = normalTexture

    // 创建多个材质的网格
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [planetMaterial])
    return mesh;
}

function render() {
    var delta = clock.getDelta();
    orbitControl.update(delta);

    sphere.rotation.y += .005;
    requestAnimationFrame(render)
    webGLRenderer.render(scene, camera)
}