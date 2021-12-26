// 浅拷贝可以通过Object.assign()和展开运算符...来实现。


// JSON 方式深拷贝
  // 会忽略 undefined
  // 会忽略 symbol
  // 不能序列化函数
  // 不能解决循环引用的对象
let object = {
  a: {
    b : 456,
    b1: 789
  },
  c: 789,
  d: [1,2,3,4,5],
  e: undefined, // 会忽略 undefined
  f: Symbol(), // 会忽略 symbol
  j: function() {} // 不能序列化函数
};

// 重复引用 json操作会报错
// object.a.b = object.a;
// object.a.b1 = object.d;

const newObj1 = JSON.parse(JSON.stringify(object));
// Uncaught TypeError: Converting circular structure to JSON
//     --> starting at object with constructor 'Object'
//     --- property 'b' closes the circle
//     at JSON.stringify (<anonymous>)
//     at <anonymous>:19:33


// https://github.com/ConardLi/ConardLi.github.io/blob/master/demo/deepClone/src/clone_6.js

function isObject(target) {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
  const reFlags = /\w*$/;
  const result = new targe.constructor(targe.source, reFlags.exec(targe));
  result.lastIndex = targe.lastIndex;
  return result;
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
      const param = paramReg.exec(funcString);
      const body = bodyReg.exec(funcString);
      if (body) {
          if (param) {
              const paramArr = param[0].split(',');
              return new Function(...paramArr, body[0]);
          } else {
              return new Function(body[0]);
          }
      } else {
          return null;
      }
  } else {
      return eval(funcString);
  }
}

function deepClone(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  // 初始化
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
      cloneTarget = getInit(target, type);
  } else {
      return cloneOtherType(target, type);
  }

  // 防止循环引用
  if (map.get(target)) {
      return map.get(target);
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === setTag) {
      target.forEach(value => {
          cloneTarget.add(deepClone(value, map));
      });
      return cloneTarget;
  }

  // 克隆map
  if (type === mapTag) {
      target.forEach((value, key) => {
          cloneTarget.set(key, deepClone(value, map));
      });
      return cloneTarget;
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = deepClone(target[key], map);
  });

  return cloneTarget;
}


// 结构化克隆所不能做到的
// Error 以及 Function 对象是不能被结构化克隆算法复制的；如果你尝试这样子去做，这会导致抛出 DATA_CLONE_ERR 的异常。
// 企图去克隆 DOM 节点同样会抛出 DATA_CLONE_ERR 异常。
// 对象的某些特定参数也不会被保留
// RegExp 对象的 lastIndex 字段不会被保留
// 属性描述符，setters 以及 getters（以及其他类似元数据的功能）同样不会被复制。例如，如果一个对象用属性描述符标记为 read-only，它将会被复制为 read-write，因为这是默认的情况下。
// 原形链上的属性也不会被追踪以及复制。

const original = { name: "MDN" };
original.itself = original;

const clone = structuredClone(original);

console.assert(clone !== original); // 对象不相同(不相同标识)
console.assert(clone.name === "MDN"); // 它们确实有相同的值
console.assert(clone.itself === clone); // 循环引用被保留了下来
