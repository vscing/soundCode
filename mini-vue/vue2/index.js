import { _isNaN } from './util';
import Observer from './observer';
import Compiler from './compiler';

class miniVue{
	constructor(options = {}) {
		//在miniVue构造函数的内部
		//保存根元素，能简便就尽量简便，不考虑数组情况
		this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
		this.$methods = options.methods;
		this.$data = options.data;
		this.$options = options;
		
		// 监听data数据
		this.proxy(this.$data);

		// 在miniVue构造函数内部
		new Observer(this.$data);

		// 编译类
		new Compiler(this);
	}

	// 代理数据
	//this.$data.xxx -> this.xxx;
	//proxy代理实例上的data对象
	proxy(data){
		// 因为我们是代理每一个属性，所以我们需要将所有属性拿到
		Object.keys(data).forEach(key => {
			Object.defineProperty(this,key,{
					enumerable:true,
					configurable:true,
					get:() => {
							return data[key];
					},
					set:(newValue) => {
							//这里我们需要判断一下如果值没有做改变就不用赋值，需要排除NaN的情况
							if(newValue === data[key] || _isNaN(newValue,data[key])) return;
							data[key] = newValue;
					}
			})
		})
	}
}