import { _isNaN } from './util';

// 观察者
export default class Watcher {
  //3个参数，当前组件实例vm,state也就是数据以及一个回调函数，或者叫处理器
  constructor(vm, key, cb){
    //构造函数内部
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    //依赖类
    Dep.target = this;
    // 我们用一个变量来存储旧值，也就是未变更之前的值
    this.__old = vm[key];
    Dep.target = null;
  }

  update(){
    //获取新的值
    let newValue = this.vm[this.key];
    //与旧值做比较，如果没有改变就无需执行下一步
    if(newValue === this.__old || __isNaN(newValue,this.__old))return;
    //把新的值回调出去
    this.cb(newValue);
    //执行完之后，需要更新一下旧值的存储
    this.__old = newValue;
  }

}