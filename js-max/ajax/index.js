// https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX/Getting_Started
// https://zhuanlan.zhihu.com/p/129338242



// url 要求为String类型的参数，（默认为当前页地址）发送请求的地址。
// type 要求为String类型的参数，请求方式（post或get）默认为get。注意其他http请求方法，例如put和delete也可以使用，但仅部分浏览器支持。
// timeout 要求为Number类型的参数，设置请求超时时间（毫秒）。
// headers 设置headers头。
// options AJAX 请求设置。所有选项都是可选的。
// async 要求为Boolean类型的参数，默认设置为true，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为false。注意，同步请求将锁住浏览器，用户其他操作必须等待请求完成才可以执行。
// cache 要求为Boolean类型的参数，默认为true（当dataType为script时，默认为false），设置为false将不会从浏览器缓存中加载请求信息。 
// data 要求为Object或String类型的参数，发送到服务器的数据。如果已经不是字符串，将自动转换为字符串格式。get请求中将附加在url后。防止这种自动转换，可以查看　　processData选项。对象必须为key/value格式，例如{foo1:"bar1",foo2:"bar2"}转换为&foo1=bar1&foo2=bar2。如果是数组，JQuery将自动为不同值对应同一个名称。例如{foo:["bar1","bar2"]}转换为&foo=bar1&foo=bar2。
// dataType 要求为String类型的参数，预期服务器返回的数据类型。如果不指定，JQuery将自动根据http包mime信息返回responseXML或responseText，并作为回调函数参数传递。可用的类型如下：
  // xml：返回XML文档，可用JQuery处理。
  // html：返回纯文本HTML信息；包含的script标签会在插入DOM时执行。
  // script：返回纯文本JavaScript代码。不会自动缓存结果。除非设置了cache参数。注意在远程请求时（不在同一个域下），所有post请求都将转为get请求。
  // json：返回JSON数据。
  // jsonp：JSONP格式。使用SONP形式调用函数时，例如myurl?callback=?，JQuery将自动替换后一个“?”为正确的函数名，以执行回调函数。
  // text：返回纯文本字符串。
// beforeSend 要求为Function类型的参数，发送请求前可以修改XMLHttpRequest对象的函数，例如添加自定义HTTP头。在beforeSend中如果返回false可以取消本次ajax请求。XMLHttpRequest对象是惟一的参数。
// complete 要求为Function类型的参数，请求完成后调用的回调函数（请求成功或失败时均调用）。参数：XMLHttpRequest对象和一个描述成功请求类型的字符串。
// success 要求为Function类型的参数，请求成功后调用的回调函数，有两个参数。
  // (1)由服务器返回，并根据dataType参数进行处理后的数据。
  // (2)描述状态的字符串。  
// error要求为Function类型的参数，请求失败时被调用的函数。该函数有3个参数，即XMLHttpRequest对象、错误信息、捕获的错误对象(可选)。


function $ajax({url="", type = "GET", timeout = 0, headers = {}, data={}, success, error, complete}) {
  // 实列化对象
  let xhr = null;
  if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // IE 6 and older
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  // 超时时间，单位是毫秒
  xhr.timeout = timeout;

  // 设置header头
  for(let key in headers) {
    xhr.setRequestHeader(key, headers[key]);
  }
  
  //判断如果数据存在, 需要转换成query形式
  if(data) {
    data = querystring(data);
  }

  // 如果请求方式为get请求，则将请求参数拼接在url后
	if(type.toLowerCase() === "get" && data !== undefined) {
		url += "?"+data;
	}

  // 发送一个请求
  xhr.open(type, url, true);

  // 如果请求方式为post请求，则修改请求消息头
	if(type.toLowerCase() === "post") {
    //增加：设置请求消息头
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  }
    
  // 发送请求
  if(type.toLowerCase() === "post" && data !== undefined) {
    xhr.send(data);
  } else {
    xhr.send(null);
  }

  // 等待数据响应
  xhr.onreadystatechange = function(){
    // Process the server response here.
    if(xhr.readyState == XMLHttpRequest.DONE) {
      //判断本次下载的状态码都是多少
      if(xhr.status == 200){
        if(success){
          // alert(2);
          success(xhr.responseText);
        }
      }else{
        if(error){
          error("Error:" + xhr.status);
        }
      }
      if(complete){
        complete();
      }  
    }
  }
}

function querystring(obj) {
  var str = "";
  for(var attr in obj){
  str += attr + "=" + obj[attr] + "&";
  }
  return str.substring(0, str.length - 1);
}