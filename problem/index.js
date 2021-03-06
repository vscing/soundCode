// 链式参数获取

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

/**
 *  深层合并两个对象
 * @param firstObject secondObject 两个object，不限制对象层级
 * @return newObject 深层合并后的新对象
 */
function deepObjectMerge(firstObject, secondObject) {
  for (const key in secondObject) {
    firstObject[key] = firstObject[key] && Object.prototype.toString.call(firstObject[key]) === "[object Object]" ?
    $deepObjectMerge(firstObject[key], secondObject[key]) : secondObject[key];
  }
  return firstObject;
}