// 防抖
var debounce = function(fn, delayTime) {
  var timeId;
  return function() {
    var context = this, args = arguments;
    timeId && clearTimeout(timeout);
    timeId = setTimeout(function() {
      fn.apply(context, args);
    }, delayTime)
  }
}

// 立即执行版
function debounce(func, wait) {
  let timer;
  return function() {
    let context = this; // 这边的 this 指向谁?
    let args = arguments; // arguments中存着e

    if (timer) clearTimeout(timer);

    let callNow = !timer;

    timer = setTimeout(() => {
      timer = null;
    }, wait)

    if (callNow) func.apply(context, args);
  }
}

// 节流
var throttle = function(fn, delayTime) {
  var _start = Date.now();
  return function () {
    var _now = Date.now(), context = this, args = arguments;
    if(_now - _start >= delayTime) {
      fn.apply(context, args);
      _start = Date.now();
    }
  }
}

// 定时器版
function throttle(func, wait) {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args)
      }, wait)
    }
  }
}