// 先初始化vue构造，绑定options到构造。后面new Vue时传入的options跟实例绑定的options合并。

function Vue2(options) {      
  this.options = options
}

Vue2.options = Object.create(null)

Vue2.mixin = function(mixin) {
  this.options = {...this.options, mixin}
  return this
}

Vue2.mixin({a:123})
let vue2 = new Vue2({b:456})
console.dir(vue2)

// merge options
if (options && options._isComponent) {
  // optimize internal component instantiation
  // since dynamic options merging is pretty slow, and none of the
  // internal component options needs special treatment.
  initInternalComponent(vm, options)
} else {
  vm.$options = mergeOptions(
    resolveConstructorOptions(vm.constructor),
    options || {},
    vm
  )
}