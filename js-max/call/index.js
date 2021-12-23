// https://zhuanlan.zhihu.com/p/158634772
// https://segmentfault.com/a/1190000018383649

var name = "Hero";
var obj = {
    "name" : "Condor"
};
//如果你看不懂Function构造函数里面的this请去复习ES5的原型链
Function.prototype._call = function(context, ...args){
    console.log(this, context, args);
    // 首先判断this指向
    if(typeof this !== 'function'){
        throw new TypeError('this 指向必须是一个函数')
    }

    // 没有context，或者传递的是 null undefined，则重置为window或global
    if(!context) context = window || global;

    // 指定唯一属性，防止 delete 删除错误
    const fn = Symbol();

    // 将 this 添加到 context的属性上
    context[fn] = this;

    // 直接调用context 的 fn
    const result = context[fn](...args);
    
    // 删除掉context新增的symbol属性
    delete context[fn];

    return result;
}
function fun(){
    console.log(this.name);
    console.log(...arguments);
}
fun._call(obj);

// 类似
const test = {
    name: 123,
    fn: function(){
        console.log(this.name);
    }
}









