// https://github.com/zloirock/core-js#ecmascript-function
// https://github.com/Raynos/function-bind

// 第一种写法
Function.prototype._bind = function(context, ...args){
  console.log(this, context, args);
  const fn = this;
  // 首先判断this指向
  if(typeof fn !== 'function'){
    throw new TypeError('this 指向必须是一个函数')
  }
  if(!context) context = window || global;
  return function (...otherArgs) {
    return fn.apply(context, [...args, ...otherArgs]);
  };
}

Function.prototype._bind = function(context, ...args) {
  console.log(this, context, args);
  const fn = this;
  // 首先判断this指向
  if(typeof fn !== 'function'){
    throw new TypeError('this 指向必须是一个函数')
  }
  return function(...param) {
    let key = Symbol();
  	context[key] = _this
    let result = context[key](...[...args, ...param])
    delete context[key]
    return result
  }
}