/**
 * Javascript特殊的变量作用域: 全局变量和局部变量
 * 闭包需要满足三个条件：【1】访问所在作用域；【2】函数嵌套；【3】在所在作用域外被调用
 */


/**
 * Javascript语言的特殊之处，就在于函数内部可以直接读取全局变量
 */
var a1 = 99
function func() {
  console.log(a1);
}
func(); // 99

/**
 * 在函数外部自然无法读取函数内的局部变量。
 */
function func1() {
  var a2 = 100;
}
// console.log(a2); // error无法读取

/**
 * 这里有一个地方需要注意，函数内部声明变量的时候，一定要使用var命令。如果不用的话，你实际上声明了一个全局变量！
 */
function func2() {
  a3 = 200;
}
func2();
console.log(a3); // 200

/**
 * 从外部读取局部变量
 */
function func3() {
  let a4 = 300;
  return function(){
    console.log(a4);
  }
}
console.log(func3()()); // 300

/**
 * 使用闭包的注意点
 * 
 * 1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。
 * 解决方法是，在退出函数之前，将不使用的局部变量全部删除。
 * 
 * 2）闭包会在父函数外部，改变父函数内部变量的值。
 * 所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。
 */



/**
 * 1、概念
 * 闭包函数：声明在一个函数中的函数，叫做闭包函数。
 * 闭包：内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部函数被返回（寿命终结）了之后。
 */

/**
 * 2、特点
 * 让外部访问函数内部变量成为可能；
 * 局部变量会常驻在内存中；
 * 可以避免使用全局变量，防止全局变量污染；
 * 会造成内存泄漏（有一块内存空间被长期占用，而不被释放）
 */

/**
 * 3、闭包的创建：
 * 闭包就是可以创建一个独立的环境，每个闭包里面的环境都是独立的，互不干扰。
 * 闭包会发生内存泄漏，每次外部函数执行的时 候，外部函数的引用地址不同，都会重新创建一个新的地址。
 * 但凡是当前活动对象中有被内部子集引用的数据，那么这个时候，这个数据不删除，保留一根指针给内部活动对象。
 * 闭包内存泄漏为： key = value，key 被删除了 value 常驻内存中; 局部变量闭包升级版（中间引用的变量） => 自由变量；
 */

/**
 * 4、闭包的应用场景
 * 闭包找到的是同一地址中父级函数中对应变量最终的值
 */

// 例子1
function funA(){
  var a = 10;  // funA的活动对象之中;
  return function(){   //匿名函数的活动对象;
    console.log(a);
  }
}
var b = funA();
b();  //10

// 例子2
function outerFn(){
  var i = 0; 
  function innerFn(){
      i++;
      console.log(i);
  }
  return innerFn;
}
var inner = outerFn();  //每次外部函数执行的时候,都会开辟一块内存空间,外部函数的地址不同，都会重新创建一个新的地址
inner();
inner();
inner();
var inner2 = outerFn();
inner2();
inner2();
inner2();   //1 2 3 1 2 3

// 例子3
var i = 0;
function outerFn(){
  function innnerFn(){
    i++;
    console.log(i);
  }
  return innnerFn;
}
var inner1 = outerFn();
var inner2 = outerFn();
inner1();
inner2();
inner1();
inner2();     //1 2 3 4

// 例子4
function fn(){
	var a = 3;
	return function(){
		return ++a;                                     
	}
}
alert(fn()());  //4  重新开辟了一个空间
alert(fn()());  //4  重新开辟了一个空间  

// 例子5
function outerFn(){
  var i = 0;
  function innnerFn(){
      i++;
      console.log(i);
  }
  return innnerFn;
}
var inner1 = outerFn();
var inner2 = outerFn();
inner1();
inner2();
inner1();
inner2();    //1 1 2 2

// 例子6
(function() { 
  var m = 0; 
  function getM() { return m; } 
  function seta(val) {
    console.log(m);
    m = val; 
  } 
  window.g = getM; 
  window.f = seta; 
})(); 
f(100);
console.info(g()); // 100

// 例子7
function a() { 
  var i = 0; 
  function b() { console.log(++i); } 
  return b; 
} 
var c = a();
c();      //1 
c();      //2

// 例子8
function f() { 
  var count = 0; 
  return  function() { 
      count++; 
      console.info(count); 
  } 
} 
var t1 = f();
t1();     //1 
t1();     //2 
t1();     //3 

// 例子9
var add = function(x) { 
  var sum = 1; 
  var tmp = function(x) { 
      sum = sum + x;
      console.log(sum, x)
      return tmp;    
  } 
  tmp.toString = function() {
    console.log(sum)
    return sum; 
  }
  return tmp; 
} 
console.info(add(1)(2)(3).toString());     
// add(1) 返回了一个tmp函数变量
// add(1)(2) 就是tmp(2),返回它自身，就还是那块空间不变
// add(1)(2)(3) 就是tmp(2)后tmp(3)

// 例子10
var lis = document.getElementsByTagName("li");
for(var i=0;i<lis.length;i++){
  (function(i){
      lis[i].onclick = function(){
           console.log(i);
      };
  })(i);       //事件处理函数中闭包的写法
}  

