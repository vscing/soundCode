import { HashHistory } from './history/hash'
import { HTML5History } from './history/html5'
import { AbstractHistory } from './history/abstract'

class HistoryRoute{
  constructor(){
    this.current = null;
  }
}

class miniVueRouter {
  constructor(options){
    this.mode = options.mode || "hash";

    switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
        break
      case 'abstract':
        this.history = new AbstractHistory(this, options.base)
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          assert(false, `invalid mode: ${mode}`)
        }
    }

    this.routes = options.routes || [];
    // 传递的路由表是数组 需要装换成{'/home':Home,'/about',About}格式
    this.routesMap = this.createMap(this.routes);
    // 路由中需要存放当前的路径  需要状态
    this.history = new HistoryRoute;
    this.init();//开始初始化操作
  }
  init(){
    if(this.mode == 'hash'){
      // 先判断用户打开时有没有hash，没有就跳转到#/
      location.hash?'':location.hash = '/';
      window.addEventListener('load',()=>{
        this.history.current = location.hash.slice(1);
      });
      window.addEventListener('hashchange',()=>{
        this.history.current = location.hash.slice(1);
      })
    }else {
      location.pathname?'':location.pathname = '/';
      window.addEventListener('load',()=>{
        this.history.current = location.pathname;
      });
      window.addEventListener('popstate',()=>{
        this.history.current = location.pathname;
      })
    }
  }
  createMap(routes){
    return routes.reduce((memo,current)=>{
      memo[current.path] = current.component
      return memo
    },{})
  }
}
//使用vue.use就会调用install方法
vueRouter.install = function(Vue,opts) {
  //每个组件都有 this.$router / this.$route 所以要mixin一下
  Vue.mixin({
    beforeCreate(){ //混合方法
      if(this.$options && this.$options.router){//定位跟组件
        this._root = this;//把当前实例挂载在_root上
        this._router = this.$options.router // 把router实例挂载在_router上
        //history中的current变化也会触发
        Vue.util.defineReactive(this,'xxx',this._router.history);
      }else {
        // vue组件的渲染顺序  父 -> 子 -> 孙子
        this._root =  this.$parent._root;//获取唯一的路由实例
      }
      Object.defineProperty(this,'$router',{//Router的实例
        get(){
          return this._root._router;
        }
      });
      Object.defineProperty(this,'$route',{
        get(){
          return {
            //当前路由所在的状态
            current:this._root._router.history.current
          }
        }
      })
    }
  });
  // 全局注册 router的两个组件
  Vue.component('router-link',{
    props:{
      to:String,
      tag:String
    },
    methods:{
      // 跳转方法
      handleClick(){      
      }
    },
    render(h){
      let mode = this._self._root._router.mode;
      let tag = this.tag;
      return <tag on-click={this.handleClick} href={mode === 'hash'?`#${this.to}`:this.to}>{this.$slots.default}</tag>
    }
  })
  Vue.component('router-view',{
    //根据当前的状态 current 对应相应的路由
    render(h){
      //将current变成动态的 current变化应该会影响视图刷新
      //vue实现双向绑定 重写Object.defineProperty
      let current = this._self._root._router.history.current;
      let routeMap = this._self._root._router.routesMap
      return h(routeMap[current])
    }
  })
}
export default miniVueRouter;