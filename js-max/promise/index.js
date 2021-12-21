// 手写promise 加状态
const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 完成
const REJECTED = 'rejected'; // 失败

function MyPromise(fn){
  let self = this;
  self.value = null; // Promise成功的值
  self.error = null; // Promise失败的值
  self.status = PENDING; // 初始状态
  self.onFulfilledCallback = []; // Promise的 resolve回调
  self.onRejectedCallback = []; // Promise的 reject回调

  function resolve(value) {
    if(self.status === PENDING){
      setTimeout(function(){
        self.status = FULFILLED;
        self.value = value;
        self.onFulfilledCallback.forEach(function(callback){
          callback && callback(value);
        });
      }, 0);
    }
  }

  function reject(error) {
    if(self.status === PENDING){
      setTimeout(function(){
        self.status = REJECTED;
        self.error = error;
        self.onRejectedCallback.forEach(function(callback){
          callback && callback(error);
        });
      }, 0);
    }
  }

  // 异常处理
  try {
    fn(resolve, reject); // 执行callback并传入相应的参数
  } catch(e) {
    reject(e)
  }
}

function resolvePromise(bridgepromise, x, resolve, reject) {
  //2.3.1规范，避免循环引用
  if (bridgepromise === x) {
      return reject(new TypeError('Circular reference'));
  }
  let called = false;
  //这个判断分支其实已经可以删除，用下面那个分支代替，因为promise也是一个thenable对象
  if (x instanceof MyPromise) {
      if (x.status === PENDING) {
          x.then(y => {
              resolvePromise(bridgepromise, y, resolve, reject);
          }, error => {
              reject(error);
          });
      } else {
          x.then(resolve, reject);
      }
      // 2.3.3规范，如果 x 为对象或者函数
  } else if (x != null && ((typeof x === 'object') || (typeof x === 'function'))) {
      try {
          // 是否是thenable对象（具有then方法的对象/函数）
          //2.3.3.1 将 then 赋为 x.then
          let then = x.then;
          if (typeof then === 'function') {
          //2.3.3.3 如果 then 是一个函数，以x为this调用then函数，且第一个参数是resolvePromise，第二个参数是rejectPromise
              then.call(x, y => {
                  if (called) return;
                  called = true;
                  resolvePromise(bridgepromise, y, resolve, reject);
              }, error => {
                  if (called) return;
                  called = true;
                  reject(error);
              })
          } else {
          //2.3.3.4 如果 then不是一个函数，则 以x为值fulfill promise。
              resolve(x);
          }
      } catch (e) {
      //2.3.3.2 如果在取x.then值时抛出了异常，则以这个异常做为原因将promise拒绝。
          if (called) return;
          called = true;
          reject(e);
      }
  } else {
      resolve(x);
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected){
  console.log(this, onFulfilled, onRejected);
  const self = this;
  console.log(self.status);
  let bridgePromise = null;
  // 设置默认函数
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
  onRejected = typeof onRejected === "function" ? onRejected : error => { throw error };

  if(self.status === FULFILLED) {
    return bridgePromise = new MyPromise((resolve, reject)=>{
      setTimeout(() => {
        try{
          let x = onFulfilled(self.value);
          resolvePromise(bridgePromise, x, resolve, reject);
        }catch(err){
          reject(err)
        }
      })
    })
  }else if(self.status === REJECTED){
    return bridgePromise = new MyPromise((resolve, reject) => {
      setTimeout(()=>{
        try{
          let x = onRejected(self.error);
          resolvePromise(bridgePromise, x, resolve, reject);
        }catch(err){
          reject(err)
        }
      })
    })
  }else{
    return bridgePromise = new MyPromise((resolve, reject) => {
      self.onFulfilledCallback.push((value) => {
        try{
          let x = onFulfilled(value);
          console.log(x)
          resolvePromise(bridgePromise, x, resolve, reject);
        }catch(err){
          reject(err)
        }
      });
      self.onRejectedCallback.push((error) => {
        try{
          let x = onRejected(error);
          resolvePromise(bridgePromise, x, resolve, reject);
        }catch(err){
          reject(err)
        }
      });
    })
  }
}

// catch 的实现
MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

// finally 的实现
MyPromise.prototype.finally = function (callback) {
  return this.then(function (value) {
    return MyPromise.resolve(callback()).then(function () {
      return value
    })
  }, function (err) {
    return MyPromise.resolve(callback()).then(function () {
      throw err
    })
  })
}

// race
MyPromise.race = function(values) {
  return new MyPromise(function(resolve, reject) {
      values.forEach(function(value) {
          MyPromise.resolve(value).then(resolve, reject)
      })
  })
}
// all
MyPromise.all = function(arr) {
  var args = Array.prototype.slice.call(arr)
  return new MyPromise(function (resolve, reject) {
      if (args.length === 0) return resolve([])
      var remaining = args.length
      for (var i = 0; i < args.length; i++) {
          res(i, args[i])
      }
      function res(i, val) {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
              if (val instanceof MyPromise && val.then === MyPromise.prototype.then) {
                  if (val.currentState === FULFILLED) return res(i, val.value)
                  if (val.currentState === REJECTED) reject(val.value)
                  val.then(function (val) {
                      res(i, val)
                  }, reject)
                  return
              } else {
                  var then = val.then
                  if (typeof then === 'function') {
                      var p = new MyPromise(then.bind(val))
                      p.then(function(val) {
                          res(i, val)
                      }, reject)
                      return
                  }
              }
          }
          args[i] = val
          if (--remaining === 0) {
              resolve(args)
          }
      }
  })
}
// allSettled
MyPromise.allSettled = function (promises) {
  return new MyPromise((resolve, reject) => {
    promises = Array.isArray(promises) ? promises : []
    let len = promises.length
    const argslen = len
    // 如果传入的是一个空数组，那么就直接返回一个resolved的空数组promise对象
    if (len === 0) return resolve([])
    // 将传入的参数转化为数组，赋给args变量
    let args = Array.prototype.slice.call(promises)
    // 计算当前是否所有的 promise 执行完成，执行完毕则resolve
    const compute = () => {
      if(--len === 0) { 
        resolve(args)
      }
    }
    function resolvePromise(index, value) {
      // 判断传入的是否是 promise 类型
      if(value instanceof MyPromise) { 
        const then = value.then
        then.call(value, function(val) {
          args[index] = { status: 'fulfilled', value: val}
          compute()
        }, function(e) {
          args[index] = { status: 'rejected', reason: e }
          compute()
        })
      } else {
        args[index] = { status: 'fulfilled', value: value}
        compute()
      }
    }
 
    for(let i = 0; i < argslen; i++){
      resolvePromise(i, args[i])
    }
  })
}


const my = new MyPromise(function(resolve, reject){
  const data = process.argv;
  if(data){
    resolve('成功');
  }else{
    reject('失败');
  }
})

const my1 = function(){
  return "my1";
}

const my2 = function(){
  return new MyPromise(function(resolve, reject){
    resolve('my2');
  })
} 

const my3 = "my3";

my.then((res) => {
  return new MyPromise(function(resolve, reject){
    resolve('my2');
  })
}).then(res => {
  return 3;
})
