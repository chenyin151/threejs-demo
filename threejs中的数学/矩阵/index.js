/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2022-02-18 14:43:24
 * @LastEditors: cy
 * @LastEditTime: 2022-02-18 17:54:11
 * https://blog.csdn.net/qq_38701868/article/details/109149556
 */
// set方法是用行优先，内部处理是用列优先
var matrix = new THREE.Matrix3().set(1,2,3,4,5,6,7,8,9);
console.log(matrix.elements)
// 重置为3*3单位矩阵
var m1 = matrix.clone();
m1.identity();
console.log(m1.elements)

var m = new THREE.Matrix3();
// 将矩阵m的元素复制到当前矩阵中
m.copy(matrix);
console.log(m.elements)

var m3 = new THREE.Matrix3();
var m4 = new THREE.Matrix4().makeScale(2,2,2)
console.log('将当前矩阵设置为4*4矩阵，m左上3*3',m3.setFromMatrix4(m4).elements);

// 当前矩阵所有的元素乘以该缩放值
var m5 = new THREE.Matrix3();
m5.set(1,2,3,4,5,6,7,8,9);
m5.multiplyScalar(2);
console.log('当前矩阵所有的元素乘以该缩放值', m5.elements)

// 计算并返回矩阵的行列式determinant 
var m6 = new THREE.Matrix3();
m6.set(1,2,3,4,5,6,7,8,9);
console.log('计算并返回矩阵的行列式determinant', m6.determinant())

// getInverse ( m : Matrix3, throwOnDegenerate : Boolean )
// m为要求逆的矩阵，throwOnDegenerate设置为true,那么在矩阵不可逆的情况下会
// 抛出一个错误，使用逆矩阵计算方法，将当前矩阵设置为给定矩阵的逆矩阵
var m7 = new THREE.Matrix3();
var m8 = new THREE.Matrix3();
m7.set(1,2,3,4,5,6,7,8,9);
m8.set(1,1,0,0,1,1,0,0,1);
console.log('行列式值为0，所以返回0矩阵', new THREE.Matrix3().getInverse(m7).elements)
console.log('行列式值不为0，所以返回', new THREE.Matrix3().getInverse(m8).elements)

// transpose(): Matrix3 矩阵的转置
var m9 = new THREE.Matrix3();
m9.set(1,1,0,0,1,1,0,0,1);
console.log('转置前的矩阵：', m9.elements);
m9.transpose();
console.log('转置后的矩阵：', m9.elements);

// 将当前矩阵的转置Transposes存入给定的数组array : Array但不改变当前矩阵， 并返回当前矩阵
var m10 = new THREE.Matrix3();
m10.set(1,1,0,0,1,1,0,0,1);
var array = [];
m10.transposeIntoArray(array);
console.log('转置是：',array);

// fromArray( array: number[], offset?: number ): Matrix3
// 使用基于列优先格式column-major的数组来设置该矩阵
var m11 = new THREE.Matrix3();
console.log('列优先设置矩阵', m11.fromArray([1,4,7,2,5,8,3,6,9]).elements)

// multiply( m: Matrix3 ): Matrix3
// 将当前矩阵左乘m
var m12 = new THREE.Matrix3();
var m13 = new THREE.Matrix3();
m12.set(1,2,3,4,5,6,7,8,9);
m13.setFromMatrix4(new THREE.Matrix4().makeScale(.5,.5,.5));
console.log('左乘矩阵：', m12.multiply(m13).elements);

// premultiply( m: Matrix3 ): Matrix3
// 将当前矩阵右乘m
// m12.set(1,2,3,4,5,6,7,8,9);
// console.log('右乘矩阵：', m12.premultiply(m13).elements);





