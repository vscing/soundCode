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

  fn(resolve, reject);
}

MyPromise.prototype.then = function(onFulfilled, onRejected){
  const self = this;
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


const my = new MyPromise(function(resolve, reject){
  const data = process.argv;
  if(data){
    resolve('成功');
  }else{
    reject('失败');
  }
})
