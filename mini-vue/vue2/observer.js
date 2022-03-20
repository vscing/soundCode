import { _isNaN } from './util';
import Dep from './dep'; 

// 数据劫持
export default class Observer{ 
  constructor(data){
    this.walk(data)
  }

  //再次申明，不考虑数组,只考虑对象
  walk(data){
    if(typeof data !== 'object' || !data) return;
    // 数据的每一个属性都调用定义响应式对象的方法
    Object.keys(data).forEach(key => this.defineReactive(data,key,data[key]));
  }

  defineReactive(data, key, value){
    // 获取当前this，以避免后续用vm的时候，this指向不对
    const vm = this;
    // 递归调用walk方法，因为对象里面还有可能是对象
    this.walk(value);
    //实例化收集依赖的类
    let dep = new Dep();
    Object.defineProperty(data,key,{
      enumerable:true,
      configurable:true,
      get(){
        // 收集依赖,依赖存在Dep类上
        Dep.target && Dep.add(Dep.target);
        return value;
      },
      set(newValue){
        // 这里也判断一下
        if(newValue === value || __isNaN(value,newValue)) return;
        // 否则改变值
        value = newValue;
        // newValue也有可能是对象，所以递归
        vm.walk(newValue);
        // 通知Dep类
        dep.notify();
      }
    })
  }
}