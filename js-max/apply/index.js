const name = "张三";
const obj = {
  name: "王五"
}

Function.prototype._apply = function(context, args = []){
  // 首先判断this指向
  if(typeof this !== 'Function'){
    throw new TypeError('this 指向必须是一个函数')
  }
  // 判断绑定的值
  if(!context) context = window || global;

  // 

  console.log(this);
}

const a = [1,2,3];



String._apply(obj);


https://github.com/zloirock/core-js#ecmascript-function
https://github.com/Raynos/function-bind


dataList = [
  {
    xxxx: '',
    skuList: [
      {
        xxxx: ''
      }
    ]
  }
]