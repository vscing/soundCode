function getUrlParam(sUrl, sKey) {
  // 首先判断网址
  if(typeof sUrl !== 'string') {
    throw new TypeError('网址错误');
  }
  // 判断是否有?的下标
  const index = sUrl.indexOf("?");
  let obj = {};
  if(index !== -1) { 
    // 结构返回key val
    sUrl = sUrl.substring(index+1);
    (sUrl.split('&') || []).forEach(el => {
      const [key, val] = el.split('=');
      obj[key] = val;
    });
  }
  return obj[sKey] ?? "";
}

console.log(getUrlParam('https://www.baidu.com/path?a=1&b=2', 'a'));
console.log(getUrlParam('https://www.baidu.com/path?a=1&b=2', 'c'));


function getKeyMax(arr, key) {
  if(typeof key !== 'number' || Object.is(key, NaN)) {
    throw new TypeError('请输入正确数字');
  }
  for(i=0; i<arr.length-1; i++){
    for(j=0; j< arr.length-1-i; j++){
     if(arr[j] > arr[j+1]){
      var temp=arr[j];
      arr[j]=arr[j+1];
      arr[j+1]=temp;
     }
    }
  }
  return arr[key-1];
}

const arr = [8, 15, 6, 3, 20, 25];