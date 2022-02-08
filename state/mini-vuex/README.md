# 状态管理

- Vuex是借鉴Flux、Redux 和 The Elm Architecture。Vue.js 设计的状态管理库。
- Vue.use先挂载Vuex插件（其它插件也是这样）里面options合并到到Vue构造上的options属性。
- new Vue时候会用当前options合并vue构造的options属性。
- new Vue实例的时候会传入Store的实例，挂载到options，于是根实例就挂载了options.store属性。
- 其余子组件实例都是在解析模板时候生成的，绑定了parent到根实例，所以子组件可以parent.options.store公用store了。
- store数据不是响应式的，new Vue传入store，生成响应式数据，如何造成的视图更新呢？
- 是把store放到计算属性, store值变化都会重新求取计算属性，并且触发更新相关联的 DOM。

```js
export function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (__DEV__) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}

# applyMixin
export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
```
