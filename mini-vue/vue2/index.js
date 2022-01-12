class miniVue2{
	constructor(options = {}) {
		//在miniVue构造函数的内部
		//保存根元素，能简便就尽量简便，不考虑数组情况
		this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
		this.$methods = options.methods;
		this.$data = options.data;
		this.$options = options;			
	}
}