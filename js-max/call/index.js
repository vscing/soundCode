var name = "Hero";
var obj = {
    "name" : "Condor"
};
//如果你看不懂Function构造函数里面的this请去复习ES5的原型链
Function.prototype._call = function(){
    // ctx需要绑定的上下文，如果没有就去绑定window
    ctx = arguments[0] || window;
    console.log(arguments);
    //此处的this就是fun这个函数
    //现在把这个函数，作为ctx(obj)这个对象的属性
    //执行ctx.fn()，fun函数里面的this就变成了obj
    ctx.fn = this;
    return ctx.fn();
}
function fun(){
    console.log(this.name);
    console.log(...arguments);
}
fun._call(obj);


https://segmentfault.com/a/1190000018383649

https://zhuanlan.zhihu.com/p/158634772

instanceof (考察对原型链的理解)
new (对创建对象实例过程的理解)
call&apply&bind (对this指向的理解)
手写promise (对异步的理解)
手写原生ajax (对ajax原理和http请求方式的理解，重点是get和post请求的实现)
