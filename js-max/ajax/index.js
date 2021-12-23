// https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX/Getting_Started
// https://zhuanlan.zhihu.com/p/129338242

// 第一步 实列化对象
var httpRequest = null;
if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
  httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE 6 and older
  httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}

// 第二步 等待数据响应
httpRequest.onreadystatechange = function(){
  // Process the server response here.
};

// 第三步 发送一个请求
httpRequest.open('GET', 'http://www.example.org/some.file', true);
httpRequest.send();