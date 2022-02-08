let Vue;

export class Store {
  constructor(options = {}) {
    // 获取state数据源
    this.allStore = new Vue({
      data() {
        state: options.state
      }
    })

    // 定义实例上的 getters
    this.getters = {}
    // 遍历所有的对象中的方法名
    Object.keys(options.getters).forEach(key => {
      // 重新构造 this.getters 对象
      Object.defineProperty(this.getters, key, {
        get: () => {
          return options.getters[key](this.state, this.getters)
        }
      })
    })

    //  定义 muations
    let mutations = {}

    Object.keys(options.mutations).forEach(key => {
      mutations[key] = (payload) => {
        options.mutations[key](this.state, payload)
      }
    })

    // 提供commit 方法
    this.commit = (key, payload) => {
      mutations[key](payload)
    }

    // 收集 actions
    let actions = {}
 
    Object.keys(options.actions).forEach(key => {
      actions[key] = payload => {
        options.actions[key](this, payload)
      }
    })
    this.dispatch = (key, payload) => {
      actions[key](payload)
    }

    // 插件和是否use strict严格模式
    const {
      plugins = [],
      strict = false
    } = options

    // 循环插件列表绑定this
    plugins.forEach(plugin => plugin(this))
  }

  // es6的class get set属性
  get state () {
    return this.allStore.state
  }

  set state (v) {
    if (__DEV__) {
      assert(false, `use store.replaceState() to explicit replace store state.`)
    }
  }

}

// Vue.use注册插件
const install = (_vue, option) => {
  // 用一个变量接收 _Vue 构造器
  Vue = _vue;

  Vue.mixin({
    beforeCreate() {
      // 1.判断根实列有没有store，有就挂载到实例的$store
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store
      } else {
        // 2. 子组件去取父级组件的$store属性
        this.$store = this.$parent && this.$parent.$store
      }
    },
  });
}

// 生成store快照
const myPluginWithSnapshot = store => {
  let prevState = _.cloneDeep(store.state)
  store.subscribe((mutation, state) => {
    let nextState = _.cloneDeep(state)

    // 比较 prevState 和 nextState...

    // 保存状态，用于下一次 mutation
    prevState = nextState
  })
}

export default {
  install,
  Store
}

