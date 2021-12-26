// josnp 优缺点分析： 借鉴自w3cfun
// 优点：
// 1.1它不像XMLHttpRequest对象实现的Ajax请求那样受到同源策略的限制，JSONP可以跨越同源策略；
    
// 1.2它的兼容性更好，在更加古老的浏览器中都可以运行，不需要XMLHttpRequest或ActiveX的支持；
    
// 1.3在请求完毕后可以通过调用callback的方式回传结果。
// 将回调方法的权限给了调用方。这个就相当于将controller层和view层终于分开了。
// 我提供的jsonp服务只提供纯服务的数据，至于提供服务以 后的页面渲染和后续view操作都由调用者来自己定义就好了。
// 如果有两个页面需要渲染同一份数据，你们只需要有不同的渲染逻辑就可以了，
// 逻辑都可以使用同 一个jsonp服务。
// 缺点
// 2.1它只支持GET请求而不支持POST等其它类型的HTTP请求

// 2.2它只支持跨域HTTP请求这种情况，不能解决不同域的两个页面之间如何进行JavaScript调用的问题。

// 2.3 jsonp在调用失败的时候不会返回各种HTTP状态码。

// 2.4缺点是安全性。万一假如提供jsonp的服务存在页面注入漏洞，即它返回的javascript的内容被人控制的。
// 那么结果是什么？所有调用这个 jsonp的网站都会存在漏洞。
// 于是无法把危险控制在一个域名下…所以在使用jsonp的时候必须要保证使用的jsonp服务必须是安全可信的。

// html页面
function getremotedata(data) {
  console.log(data); // 接受到{message:"success"}
}
var div = document.getElementsByTagName('div');

div[0].onclick = function(){
  var url = "./getdata.js";
  var script = document.createElement('script');
  script.setAttribute('src', url);
  document.getElementsByTagName('head')[0].appendChild(script);
};

// getdata.js 里面的返回数据格式
getremotedata({message:"success"});