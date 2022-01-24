/**
 * 闭包测试
 */
function func() {
  let a = 1;
  let time = (new Date).getTime();
  console.log('外', a, time);
  return function(c = 0) {
    if(c) {
      a = c;
    }
    console.log('内', a, time);
  }
}

let b1 = func();
b1(3);
b1(4);
b1(0);

/**
 * 数字1+任意类型结果
 */
console.log(1+Symbol) // 'function Symbol() { [native code] }1'
console.log(1+null) // 1
console.log(1+undefined)  // NaN
console.log(1+false) // 1
console.log(1+{}) // 1 [object object]
console.log(1+[]) // 1
console.log(1+'123') // 1123

/**
 * 字符串1+任意类型
 */
console.log('1'+Symbol) // 1function Symbol() { [native code] }
console.log('1'+null) // 1null
console.log('1'+undefined) // 1undefined
console.log('1'+false) // 1false
console.log('1'+{}) // 1 [object object]
console.log('1'+[]) // 1
console.log('1'+123) // 1123


/**
 * Function.prototype.apply.call  等同于Function.prototype.call.call
 * Function.prototype.call.apply  等同于 Function.prototype.apply.apply
 */
function testA(a){
  console.log('aaaa', a);
}  
Function.prototype.apply.call(testA, window, ['Mike']);  // aaaa Mike

var f1=function(){console.log(1)};
var f2=function(){console.log(2)};
Function.prototype.call.call(Function.prototype.call,f2); //2
Function.prototype.call.call(f1,f2); //1

Function.prototype.call.apply(function(a){return a;}, [0,4,3]);
// (function(a) {
//   return a;
// }).call(0, 4, 3);


/**
 * new.target
 * new.target属性允许你检测函数或构造方法是否是通过new运算符被调用的。
 * 在通过new运算符被初始化的函数或构造方法中，new.target返回一个指向构造方法或函数的引用。
 * 在普通的函数调用中，new.target 的值是undefined。
 */
function Foo() {
  if (!new.target) throw "Foo() must be called with new";
  console.log("Foo instantiated with new");
}

Foo(); // throws "Foo() must be called with new"
new Foo(); // logs "Foo instantiated with new"

class A {
  constructor() {
    console.log(new.target.name);
  }
}

class B extends A { constructor() { super(); } }

var a = new A(); // logs "A"
var b = new B(); // logs "B"

class C { constructor() { console.log(new.target); } }
class D extends C { constructor() { super(); } }

var c = new C(); // logs class C{constructor(){console.log(new.target);}}
var d = new D(); // logs class D extends C{constructor(){super();}}




