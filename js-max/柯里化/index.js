// 柯里化就是把具有较多参数的函数转换成具有较少参数的函数的过程。
// 参数复用
// 延迟执行
// 函数的柯里化，是 Javascript 中函数式编程的一个重要概念。它返回的，是一个函数的函数。其实现方式，需要依赖参数以及递归，通过拆分参数的方式，来调用一个多参数的函数方法，以达到减少代码冗余，增加可读性的目的。
// 形参数量固定


// 最容易理解的方法, 固定值方案
function curryFn(fn, arr) {
  return function() {
    let args = [].slice.call(arguments);

    if(arr !== undefined) {
      args = args.concat(currArgs);
    }

    // 递归调用
    if (args.length < fn.length) {
      return curryFn(fn, args);
    }

    // 递归出口
    return fn.apply(null, args);
  }
}

function sum(a, b, c) {
  console.log(a + b + c);
}

const fn1 = curry(sum);
fn1(1, 2, 3); // 6
fn1(1, 2)(3); // 6
fn1(1)(2, 3); // 6
fn1(1)(2)(3); // 6

// 优化 参考https://www.jianshu.com/p/c87242cd2f6c
const curry = ( fn, arr = []) => {
  return (...args) => { 
    //判断参数总数是否和fn参数个数相等
    if([...arr, ...args].length === fn.length){
        return fn(...arr, ...args) //拓展参数，调用fn
    }else{
        return curry(fn,[...arr, ...args]) //迭代，传入现有的所有参数
    }
  }
}