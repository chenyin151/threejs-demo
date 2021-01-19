/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-12-22 17:20:32
 * @LastEditors: cy
 * @LastEditTime: 2020-12-24 15:51:58
 * 参考文档：https://zhuanlan.zhihu.com/p/47752059
 */
function addScript(url){
    var script = document.createElement('script');
    script.setAttribute('type','text/javascript');
    script.setAttribute('src',url);
    document.getElementsByTagName('head')[0].appendChild(script);
}
addScript('./libs/dat.gui.js');
var controls = new function() {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
}
var gui = new dat.GUI();
gui.add(controls, 'rotationSpeed', 0, 0.5);
gui.add(controls, 'bouncingSpeed', 0, 0.5);
renderScene()
function renderScene() {
    requestAnimationFrame(renderScene)
    console.log('renderScene', controls.rotationSpeed)
}
