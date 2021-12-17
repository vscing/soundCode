### js加深学习
#### 基础部分
- 数据基本类型 string number bigint boolean null undefined symbol（ES 2016新增）
- 基本引用类型 object （ Function，Date，Array，Set，Map，WeakSet，WeakMap，JSON，[...](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) ）
- 基本包装类型 string number boolean
```javascript
- 原始类型也称为基本类型或简单类型，因为其占据空间固定，是简单的数据段，为了便于提升变量查询速度，将其存储在栈(stack)中(按值访问)
- 引用类型由于其值的大小会改变，所以不能将其存放在栈中，否则会降低变量查询速度，因此其存储在堆(heap)中，存储在变量处的值是一个指针，指向存储对象的内存处(按址访问)
- [注意]对于引用类型的值，可以为其添加属性和方法，也可以改变和删除其属性和方法；但基本类型不可以添加属性和方法
- Undefined类型只有一个值，就是undefined。当声明的变量未初始化时，该变量的默认值是undefined
- Null类型只有一个值，就是null。逻辑角度看，null值表示一个空对象指针，如果定义的变量将用于保存对象，最好将该变量初始化为null。实际上undefined值是派生自null值的，所以undefined == null
- [注意]null是空对象指针，而[]是空数组，{}是空对象，三者不相同
- [注意]因为undefined和null不是构造器类型，所以不能添加自定义属性

console.log(null == undefined) true

/**
 * 包装类型 解析为什么字符串能调用方法和属性
*/
var str = 'abc';
var str2 = str.length();

/** 实现过程 */
var strObj = new String(str); // 创建一个String实例
str2 = strObj.length(); // 在实例上调用指定方法或属性
strObj = null; // 销毁实例

- [注意]引用类型和基本包装类型的主要区别是对象的生存期。使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。这意味着不能在运行时为基本类型值添加属性和方法

/** 显式创建包装类型共两种方式 */
var str = new Object('abc'); // Object方式
str = new String('abc'); // 构造函数方式


- [注意]使用new调用基本包装类型的构造函数与直接调用同名的转型函数是不一样的
var number = Number('123');
console.log(typeof number); // number
number = new Number('123');
console.log(typeof number); // object

```

#### 数据类型判断
- typeof判断数据类型
```javascript
var obj = {
    a: 123
}
function func(){
    conosle.log('the is function');
}
var arr = [1,2,3]
var sl = Symbol();
console.log(typeof 1); // number
console.log(typeof '1'); // string
console.log(typeof false); // boolean
console.log(typeof null); // object
console.log(typeof undefined); // undefined
console.log(typeof sl); // symbol
console.log(typeof obj); // object
console.log(typeof arr); // object
console.log(typeof func); // function
/** 
 * typeof可以测试出number、string、boolean、Symbol、undefined及function，而对于null及数组、对象，typeof均检测出为object，不能进一步判断它们的类型。
*/
```
- instanceof是一个操作符，返回值是一个布尔值 instanceof是检测引用数据类型，而不能检测基本数据类型
- instanceof运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上,返回值为布尔值，用于指示一个变量是否属于某个对象的实例。
```javascript
var arr = [4,5,6];
console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true
// 数组arr的原型
const proto1 = Object.getPrototypeOf(arr);
console.log(proto1); // []
// 数组arr的原型的原型
const proto2 = Object.getPrototypeOf(proto1);
console.log(proto2); // []
// Object的prototype
console.log(Object.prototype);
// 判断arr的原型是否与Object的prototype相等
console.log(proto1 === Object.prototype); // false
// 判断arr的原型的原型是否与Object的prototype相等
console.log(proto2 === Object.prototype); // true
```

- constructor
- null 和 undefined 是无效的对象，因此是不会有 constructor 存在的，这两种类型的数据需要通过其他方式来判断。
- 函数的 constructor 是不稳定的，这个主要体现在自定义对象上，当开发者重写 prototype 后，原有的 constructor 引用会丢失，constructor 会默认为 Object
```javascript
const val1 = 1;
console.log(val1.constructor); // [Function: Number]
const val2 = 'abc';
console.log(val2.constructor); // [Function: String]
const val3 = true;
console.log(val3.constructor); // [Function: Boolean]
```

- 在任何值上调用 Object 原生的 toString() 方法，都会返回一个 [object NativeConstructorName] 格式的字符串。需要注意的是，但是它不能检测非原生构造函数的构造函数名。
- 参数不为 null 或 undefined，则将参数转为对象，再作判断。对于原始类型，转为对象的方法即装箱。
- 对象可以Object.prototype.toString()通过定义一个 Symbol.toStringTag属性来改变行为，从而导致意想不到的结果。[文档](https://zhuanlan.zhihu.com/p/118793721)
```javascript
/** 不能检测非原生构造函数的构造函数名 */
function Dog(name) {
  this.name = name;
}

const dog1 = new Dog('Gabby');

Dog.prototype.toString = function dogToString() {
  return `${this.name}`;
};

console.log(dog1.toString());

/** 基本类型判断 */
Object.prototype.toString.call(null);       // => "[object Null]"
Object.prototype.toString.call(undefined);  // => "[object Undefined]"

const toString = Object.prototype.toString;

toString.call(new Date);    // [object Date]
toString.call(new String);  // [object String]
toString.call(Math);        // [object Math]

/** Symbol.toStringTag */
const myDate = new Date();
Object.prototype.toString.call(myDate);     // [object Date]

myDate[Symbol.toStringTag] = 'myDate';
Object.prototype.toString.call(myDate);     // [object myDate]

Date.prototype[Symbol.toStringTag] = 'prototype polluted';
Object.prototype.toString.call(new Date()); // [object prototype polluted]
```


#### 对象、[原型、原型链](https://www.zhihu.com/question/56770432/answer/315342130)
- 创建对象
```javascript
/** new Object */
var obj = new Object();
obj.name = 123;

/** 字面形式 */
var obj = {
    name: 123
}

/** 
 * 工厂模式 
 * 工厂模式解决了重复实例化多个对象的问题，但没有解决对象识别的问题
 * （但是工厂模式却无从识别对象的类型，因为全部都是Object，不像Date、Array等，本例中，得到的都是obj对象，对象的类型都是Object，因此出现了构造函数模式）
 * */
function createObj(name){
    var obj = new Object();
    obj.name = name;
    obj.age = function(){
        console.log(this.name)
    }
    return obj;
}

var person1 = createObj("lisi"); //instanceof无法判断它是谁的实例，只能判断他是对象（构造函数模式都可以判断出）
var person2 = createObj("wangwu");
console.log(person1 instanceof Object); //true

/** 
 * 构造函数模式 构造函数名大写
 * 构造函数也有其缺陷，每个实例都包含不同的Function实例（ 构造函数内的方法在做同一件事，但是实例化后却产生了不同的对象，方法是函数 ，函数也是对象），因此产生了原型模式。
 * 对比工厂模式有以下不同之处：1、没有显式地创建对象 2、直接将属性和方法赋给了 this 对象 3、没有 return 语句
*/
function ObjConstructor(name) {
    this.name = name;
    this.say = function(){
        console.log(this.name);
    }
}

var person1 = new ObjConstructor("lisi1");
var person2 = new ObjConstructor("lisi2");
console.log(person1 instanceof Object); //true
console.log(person1 instanceof ObjConstructor); //true
console.log(person2 instanceof Object); //true
console.log(person2 instanceof ObjConstructor); //true
console.log(person1.constructor); //constructor 属性返回对创建此对象的数组、函数的引用

/** 
 * 原型模式的好处是所有对象实例共享它的属性和方法（即所谓的共有属性）。
 * 此外还可以如设置实例自己的属性（方法）（即所谓的私有属性），可以覆盖原型对象上的同名属性（方法）。
*/
function ObjPrototype(name) {
    this.name = name;
}
ObjPrototype.prototype.say = function(){
    console.log(this.name);
}

var p1 = new ObjPrototype('p1');
p1.age = 18;
var p2 = new ObjPrototype('p2');
p2.age2 = 19;
p2.say = function(){
    console.log(this.age2);
}

/** 
 * 混合模式（构造函数模式+原型模式）
 * 构造函数模式用于定义实例属性，原型模式用于定义方法和共享的属性
 * 混合模式共享相同方法的引用，又保证了每个实例有自己的私有属性。最大限度的节省了内存。
*/
function ObjUnion(name,age,family) {
    this.name = name;
    this.age = age;
    this.family = family;
}

ObjUnion.prototype = {
    constructor: ObjUnion,  //每个函数都有prototype属性，指向该函数原型对象，原型对象都有constructor属性，这是一个指向prototype属性所在函数的指针
    say: function(){
        console.log(this.name);
    }
}

var person1 = new ObjUnion("lisi",21,["lida","lier","wangwu"]);
console.log(person1);
var person2 = new ObjUnion("wangwu",21,["lida","lier","lisi"]);
console.log(person2);

/** 
 * 动态原型模式 
 * 混合模式（构造函数模式组合原型模式）在目前看来已经很完美了，硬要挑出它的缺点的话就是封装性差了点，动态原型模式正是致力于解决这个问题的一个方案
*/
function ObjDynamic(name,age) {
    this.name = name;
    this.age = age;
    if(typeof this.sleep !== 'function'){
        ObjDynamic.prototype = {
            constructor: this,
            sleep: function(){
                console.log(this.name);
            }
        }
    }
}

var p = new ObjDynamic('p', 18);
var p1 = new ObjDynamic('p1', 20);
console.log(p.sleep())
console.log(p1.sleep());

/** 
 * 寄生构造函数模式
 * 关于寄生构造函数模式，有一点需要说明：首先，返回的对象与构造函数或构造函数的原型属性之间没有关系；也就是说，构造函数返回的对象与在构造函数外部创建 对象没有什么不同。
 * 为此，不能依赖instranceof操作符来确定对象类型。由于 存在 上述问题，我们建议在可以使用其他模式的情况下，不要使用这种模式。
*/
function ObjParasite(name) {
    var arr = new Array();

    arr.name = name;

    arr.getName = function() {
        console.log(this.name);
    }

    return arr;
}

var obj = new ObjParasite('ObjParasite');
console.dirxml(obj);


/** 
 * 稳妥构造函数模式
 * 所谓稳妥模式，就是没有公共属性，而且其方法也不引用this对象
 * 稳妥模式最适合一些安全环境（这些环境会禁用this和new）或防止属性数据被改动
 * 与寄生构造函数不同：
 * 1，新建的实例对象不引用this
 * 2，不使用new操作符调用构造函数
 */
function ObjStable(name){
    var obj = new Object();
    // 定义一些其他变量

    obj.say = function() {
        console.log(name)
    }

    return obj;
}
var obj = ObjStable('obj');
obj.say()
console.log(obj.name);
console.log(obj);

/** 
 * prototype 指向一块内存，这个内存里面有共用属性
 * __proto__ 指向同一块内存
 * prototype 和 __proto__ 的不同点在于prototype 是构造函数的属性，而 __proto__ 是对象的属性难点在于……构造函数也是对象！
 * 如果没有 prototype，那么共用属性就没有立足之地如果没有 __proto__，那么一个对象就不知道自己的共用属性有哪些。
*/
// 让我们从一个函数里创建一个对象o，它自身拥有属性a和b的：
let f = function () {
   this.a = 1;
   this.b = 2;
}
/* 这么写也一样
function f() {
  this.a = 1;
  this.b = 2;
}
*/
let o = new f(); // {a: 1, b: 2}

// 在f函数的原型上定义属性
f.prototype.b = 3;
f.prototype.c = 4;

// 不要在 f 函数的原型上直接定义 f.prototype = {b:3,c:4};这样会直接打破原型链
// o.[[Prototype]] 有属性 b 和 c
//  (其实就是 o.__proto__ 或者 o.constructor.prototype)
// o.[[Prototype]].[[Prototype]] 是 Object.prototype.
// 最后o.[[Prototype]].[[Prototype]].[[Prototype]]是null
// 这就是原型链的末尾，即 null，
// 根据定义，null 就是没有 [[Prototype]]。
```

#### 对象继承
```javascript
/** 
 * 构造函数继承
 * 缺点：我们可以看出，这种方式的继承只能继承父类构造函数中的属性和方法，对于原型对象无法继承。
*/
function person(){
 this.kind="person"; 
}
person.prototype.eat=function(food){
 console.log(this.name+" is eating "+food);
}

function student(name) {
 person.apply(this,arguments)
 this.name=name;
}
var martin=new student("martin");
console.log(martin.kind); //person
martin.eat("apple"); //报错


/** 
 * 原型实例继承
*/
function student1(name) {
 this.name=name;
}
student1.prototype=new person();
student1.prototype.construct=student1；
var martin=new student1("martin");
martin.eat("apple"); //martin is eating apple
console.log(martin.kind);//person


/** 
 * 原型直接继承
 * 缺点：我们可以看出，这种方式无法继承父类构造函数中的属性与方法，但是可以继承父类构造函数的原型对象。
*/
student1.prototype=person.prototype;
student1.prototype.constructor=student1; //注意这一行产生的变化
var martin=new student1("martin");
martin.eat("apple"); //martin is eating apple
console.log(martin.kind); //undefined

/** 
 * es6 extends 继承
*/
class person {
 constructor(){
 this.kind="person"
 }
 eat(food){
 console.log(this.name+" "+food);
 }
}
class student extends person{
 constructor(name){
    super();
    this.name=name;
 }
}
var martin=new student("martin");
console.log(martin.kind); //person
martin.eat("apple"); //martin apple

/** 
 * 深拷贝继承
 * 这种方式主要通过对象间的深拷贝来实现继承。
*/
function deepCopy(parent,child) {
 var child = child || {};
 for(var i in parent){
    if(typeof parent[i] === "object"){
        child[i]=parent[i].constructor==="Array"?[]:{};
        deepCopy(parent[i],child[i]); //递归
    }else{
        child[i]=parent[i];
    }
 }
 return child
}
var parent={
 name:"martin",
 say(){
    console.log("say"+this.name);
 }
};
var child={
 name:"lucy",
 kind:"person",
 eat(){
    console.log("eating"+this.name);
 }
};
deepCopy(parent,child);
console.log(child);

```

#### polyfill  脏检查 https://china-dev.cn/  https://www.zhihu.com/question/391604647 https://juejin.cn/post/7022917788838658056
#### https://www.zhihu.com/column/study-fe