function getKeyVal(obj, key, val) {
  if(Object.prototype.toString.call(obj) !== '[object Object]') {
    throw new TypeError('类型错误');
  }

  let arr = [];
  if(key.indexOf('.') !== -1){
    arr = key.split('.');
  }
  // if(key.indexOf('[') !== -1){
  //   arr = key.split('[');
  //   arr[1].trimEnd(']');
  // }
  if(key.indexOf(']') !== -1){
    arr = key.split(']');
    arr[1].trimStart('[');
  }
}

function getListKeyVal(obj, key, val) {
  if(Object.prototype.toString.call(obj) !== '[object Object]') {
    throw new TypeError('类型错误');
  }

  key.replace('/\[/g', '.').replace('/\]/g', '').split('.').filter(item => item).reduce((valObj, item) => {

  }, val);
}

let arr =[0,1,0,2,3]