const name = "张三";
const obj = {
  name: "王五"
}

Function.prototype._apply = function(){
  // 首先判断this指向
  console.log(this);
}

const a = [1,2,3];



String._apply(obj);


https://github.com/zloirock/core-js#ecmascript-function
https://github.com/Raynos/function-bind