// 手写promise 加状态
const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 完成
const REJECTED = 'rejected'; // 失败

function MyPromise(fn){
  let self = this;
  self.value = null; // Promise成功的值
  self.error = null; // Promise失败的值
  self.status = PENDING; // 初始状态
  self.onFulfilled = null; // Promise的 resolve回调
  self.onRejected = null; // Promise的 reject回调

  function resolve(value) {
    if(self.status === PENDING){
      setTimeout(function(){
        self.status = FULFILLED;
        self.value = value;
        self.onFulfilled && self.onFulfilled(value);
      }, 0);
    }
  }

  function reject(error) {
    if(self.status === PENDING){
      setTimeout(function(){
        self.status = REJECTED;
        self.error = error;
        self.onRejected && self.onRejected(error);
      }, 0);
    }
  }

  fn(resolve, reject);
}

MyPromise.prototype.then = function(onFulfilled, onRejected){
  if(this.status === PENDING){
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected;
  }else if(this.status === FULFILLED){
    onFulfilled(this.value);
  }else{
    onRejected(this.error);
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

my.then(function(res){
  console.log(res);
}, function(err){
  console.log(err);
})

