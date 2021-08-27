/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2021-08-27 16:27:09
 * @LastEditors: cy
 * @LastEditTime: 2021-08-27 16:34:27
 */
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000)
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.setClearColor(new THREE.Color(0xeeeeee, 1))
webGLRenderer.setSize(window.innerWidth, window.innerHeight)
webGLRenderer.shadowMapEnabled = true;

function createCubeMap() {
    var path = '../assets/textures/cubemap/parlinament';
    var format = '.jpg';
    var urls = [
        path + 'posx' + format, path + 'negx' + format,
        path + 'posy' + format, path + 'negy' + format,
        path + 'posz' + format, path + 'negz' + format
    ]
    var textureCube = THREE.ImageUtils.loadTexture(urls, new THREE.CubeRefractionMapping());
    return textureCube;
}
