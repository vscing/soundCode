// 手写promise 加状态
const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 完成
const REJECTED = 'rejected'; // 失败

function MyPromise(fn){
  let self = this;
  self.value = null; // Promise成功的值
  self.error = null; // Promise失败的值

  self.onResolvedCallback = null; // Promise的 resolve回调
  self.onRejectedCallback = null; // Promise的 reject回调
}