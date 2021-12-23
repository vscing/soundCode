// 手写promise 版本1
function MyPromise(fn) {
  var self = this; // 缓存Promise实列
  self.value = null; // Promise成功的值
  self.error = null; // Promise失败的值

  self.onResolvedCallback = null; // Promise的 resolve回调
  self.onRejectedCallback = null; // Promise的 reject回调

  // resovle回调处理
  function resolve(value){
    setTimeout(function(){
      console.log('执行了resolve');
      self.value = value;
      self.onResolvedCallback && self.onResolvedCallback(value);
    }, 0);
  }

  // reject回调处理
  function reject(error){
    setTimeout(function(){
      console.log('执行了reject')
      self.error = error;
      self.onRejectedCallback && self.onRejectedCallback(error);
      // TODO cli模式不打印原理
      (function(){
        console.log('为啥不执行呢')
      })()
    }, 0);
  }

  fn(resolve, reject)
}

MyPromise.prototype.then = function(resolve, reject){
  this.onResolvedCallback = resolve;
  this.onRejectedCallback = reject;
};

const my = new MyPromise(function(resolve, reject){
  const data = process.argv;
  if(data && data[0]){
    resolve(data[0]);
  }else {
    reject('error');
  }
})

my.then(res => {
  console.log(res);
}, err => {
  console.log(err);
});


