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