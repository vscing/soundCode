const name = "张三";
const obj = {
  name: "王五"
}

Function.prototype._apply = function(context, args = []){
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

const nonFunctions = [true, false, [], {}, 42, 'foo', NaN, /a/g, null, undefined, Array, Date];

// 测试
for (var i = 0; i < nonFunctions.length; ++i) {
  try { 
    Function.prototype._apply.call(nonFunctions[i]); 
  } catch (err) {
    console.log(err);
  }
}