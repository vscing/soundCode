// 手写promise 加then链式调用
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

MyPromise.prototype.then = function(onFulfilled, onRejected){
  if(this.status === PENDING){
    this.onFulfilledCallback.push(onFulfilled);
    this.onRejectedCallback.push(onRejected);
  }else if(this.status === FULFILLED){
    onFulfilled(this.value);
  }else{
    onRejected(this.error);
  }
  return this;
}

const my = new MyPromise(function(resolve, reject){
  const data = process.argv;
  if(data){
    resolve('成功');
  }else{
    reject('失败');
  }
})

my.then(function(res){
  console.log(res); // 成功
}, function(err){
  console.log(err);
}).then(function(res){
  console.log(res); // 成功
}, function(err){
  console.log(err);
});

my.then(function(res){
  console.log(res); // 成功
}, function(err){
  console.log(err);
});