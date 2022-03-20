# 追加

[micro-app](https://zeroing.jd.com/micro-app/docs.html#/)
[shadow DOM](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM)

```text
一.qiankun与single-spa的关系
qiankun基于single-spa进行了二次封装

single-spa很好地解决了路由和应用入口两个问题，但并没有解决应用加载问题，而是将该问题暴露出来由使用者实现（一般可以用system.js或原生script标签来实现）；qiankun在此基础上封装了一个应用加载方案（即import-html-entry），并给出了js隔离、css样式隔离和应用间通信三个问题的解决方案，同时提供了预加载功能。



二.single-spa的实现原理
single-spa解决的是应用加载与切换的问题，single-spa是通过监听hashChange和popState这两个原生事件来检测路由变化的，还劫持了原生的pushState和 replaceState两个方法。这是由于像scroll-restorer这样的第三方组件可能会在页面滚动时，通过调用pushState或replaceState，将滚动位置记录在state中，而页面的url实际上没有变化。这种情况下，single-spa理论上不应该去重新加载应用，但是由于这种行为会触发页面的hashChange事件，所以根据上面的逻辑，single-spa会发生意外重载

1.应用入口
single-spa采用的是协议入口，即只要实现了single-spa的入口协议规范，它就是可加载的应用。single-spa的规范要求应用入口必须暴露出以下三个生命周期钩子函数，且必须返回Promise，以保证single-spa可以注册回调函数：

bootstrap：bootstrap用于应用引导，基座应用会在子应用挂载前调用它，挂载前的准备工作
mount：mount用于应用挂载，就是一般应用中用于渲染的逻辑
unmount：用于应用卸载，我们可以在这里调用实例的destroy方法手动卸载应用，或清除某些内存占用等


2.应用加载
实际上single-spa并没有提供自己的解决方案，而是将它开放出来，由开发者提供。一般会使用system.js

三.qiankun的实现原理
1.应用加载
qiankun进行了一次封装，给出了一个更完整的应用加载方案，qiankun的作者将其封装成了npm插件import-html-entry

该方案的主要思路是允许以html文件为应用入口，然后通过一个html解析器从文件中提取js和css依赖，并通过fetch下载依赖

在qiankun中你可以这样配置入口：

const MicroApps = [{
      
  name: 'app1',
  entry: 'http://localhost:8080',
  container: '#app',
  activeRule: '/app1'
}]
qiankun会通过import-html-entry请求http://localhost:8080，得到对应的html文件，解析内部的所有script和style标签，依次下载和执行它们，这使得应用加载变得更易用

2.js隔离
qiankun通过import-html-entry，可以对html入口进行解析，并获得一个可以执行脚本的方法execScripts。qiankun引入该接口后，首先为该应用生成一个window的代理对象，然后将代理对象作为参数传入接口，以保证应用内的js不会对全局window造成影响

3.css隔离
shadowDom：shadowDom的特点是，它内部所有节点的样式对树外面的节点无效，因此自然就实现了样式隔离。但是这种方案是存在缺陷的。因为某些UI框架可能会生成一些弹出框直接挂载到document.body下，此时由于脱离了shadow tree，所以它的样式仍然会对全局造成污染。

4.应用通信
思路是基于一个全局的globalState对象。这个对象由基座应用负责创建，内部包含一组用于通信的变量，以及两个分别用于修改变量值和监听变量变化的方法：setGlobalState和onGlobalStateChange。这里的actions对象就是我们说的globalState，即全局状态。基座应用可以在加载子应用时通过props将actions传递到子应用内，而子应用通过以下语句即可监听全局状态变化

基座中初始化

import { initGlobalState, MicroAppStateActions } from 'qiankun';
 
// 初始化 state
const actions: MicroAppStateActions = initGlobalState(state);
 
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});
actions.setGlobalState(state);
actions.offGlobalStateChange();
子应用：

// 从生命周期 mount 中获取通信方法，使用方式和 master 一致
export function mount(props) {
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });
 
  props.setGlobalState(state);
}
附录：

参考链接：

https://www.it610.com/article/1364037984256548864.htm

https://qiankun.umijs.org/zh

思考：

从目前微前端的发展来看，webpack5的Module Federation可能会成为一个焦点功能，用于解决微前端应用间的资源共享问题，有空可以作为了解
```

1.主应用
```js
main.ts

import { registerMicroApps,start } from 'qiankun'
const apps = [
  {
    name:'vieApp',
    entry:'http://localhost:10000/',//必须配置跨域
    container:'#container',
    activeRule:'#/vue'
  }
]
registerMicroApps(apps,{
  beforeLoad: [
    app => {
        console.log("before load", app.name);
        return Promise.resolve();
    },
  ],
  beforeMount: [
      app => {
          console.log("before mount", app.name);
          return Promise.resolve();
      },
  ],
  afterUnmount: [
      app => {
          console.log("after mount", app.name);
          return Promise.resolve();
      },
  ],
});
 
createApp(App).use(store).use(router).mount('#operate-app')
start();
```
2.子应用
不需要安装qiankun
```js
main.ts

let instance:any = null;
function render(){
  instance = createApp(App).use(store).use(router).mount('#app')
}
//子应用作为独立应用运行
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
export async function bootstrap() {
  console.log()
}
export async function mount() {
  render()
}
 
export async function unmount() {
  console.log('unmount')
  instance.$destroy();
}
vue.config.js

module.exports = {
  devServer:{
    port:10000,
    headers:{
      'Access-control-Allow-Origin':'*'
    }
  },
  configureWebpack:{
    output:{
      library:'vueApp',
      libraryTarget:'umd'
    }
  }
}
```
3.备注
主基座与子应用的根结点id不可相同重复