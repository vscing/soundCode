var a = 123;
// 闭包
function func() {
  let a = 456;
  let b = function (){
    console.log(a);
  }
  return b;
}

var b = func();

setTimeout(function(){
  console.log(b);
}, 30*1000)
