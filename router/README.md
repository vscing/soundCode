### location对象
- Location 接口表示其链接到的对象的位置（URL）。所做的修改反映在与之相关的对象上。 Document 和 Window 接口都有这样一个链接的Location，分别通过 Document.location和Window.location 访问。
- Location 接口不继承任何属性，但是实现了那些来自 URLUtils 的属性。
```js
* DOMString 是一个UTF-16字符串。由于JavaScript已经使用了这样的字符串，所以DOMString 直接映射到 一个String。

* 将 null传递给接受DOMString的方法或参数时通常会把其stringifies为“null”。

Location 属性

# 包含整个URL的一个DOMString
Location.href

# 包含URL对应协议的一个DOMString，最后有一个":"。
Location.protocol (en-US)

# 包含了域名的一个DOMString，可能在该串最后带有一个":"并跟上URL的端口号。
Location.host

# 包含URL域名的一个DOMString。
Location.hostname

# 包含端口号的一个DOMString。
Location.port (en-US)

# 包含URL中路径部分的一个DOMString，开头有一个“/"。
Location.pathname (en-US)

# 包含URL参数的一个DOMString，开头有一个“?”。
Location.search

# 包含块标识符的DOMString，开头有一个“#”。
Location.hash

# 包含URL中域名前的用户名的一个DOMString。
Location.username (en-US)

# 包含URL域名前的密码的一个 DOMString。
Location.password (en-US)

# 包含页面来源的域名的标准形式DOMString。
Location.origin (en-US) 只读
```
- Location没有继承任何方法，但实现了来自URLUtils的方法。
```js
Location 方法
- 加载给定URL的内容资源到这个Location对象所关联的对象上。
Location.assign()

- 重新加载来自当前 URL的资源。他有一个特殊的可选参数，类型为 Boolean (en-US)，该参数为true时会导致该方法引发的刷新一定会从服务器上加载数据。如果是 false或没有制定这个参数，浏览器可能从缓存当中加载页面。
Location.reload()

- 用给定的URL替换掉当前的资源。与 assign() 方法不同的是用 replace()替换的新页面不会被保存在会话的历史 History中，这意味着用户将不能用后退按钮转到该页面。
Location.replace()

- 返回一个DOMString，包含整个URL。 它和读取URLUtils.href的效果相同。但是用它是不能够修改Location的值的。
Location.toString()
```

### history对象
- History 接口允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录。
- History 接口不继承于任何属性。
```js
# History 属性

# 返回一个整数，该整数表示会话历史中元素的数目，包括当前加载的页。例如，在一个新的选项卡加载的一个页面中，这个属性返回1。
History.length (只读)

# 允许Web应用程序在历史导航上显式地设置默认滚动恢复行为。此属性可以是自动的（auto）或者手动的（manual）。
History.scrollRestoration (实验)


# 返回一个表示历史堆栈顶部的状态的值。这是一种可以不必等待popstate (en-US) 事件而查看状态的方式。
History.state （只读）
```
- History 接口不继承任何方法。
```js
- 在浏览器历史记录里前往上一页, 用户可点击浏览器左上角的返回(译者注：←)按钮模拟此方法. 等价于 history.go(-1)。Note: 当浏览器会话历史记录处于第一页时调用此方法没有效果，而且也不会报错。
History.back()

- 在浏览器历史记录里前往下一页，用户可点击浏览器左上角的前进(译者注：→)按钮模拟此方法. 等价于 history.go(1)。Note: 当浏览器历史栈处于最顶端时( 当前页面处于最后一页时 )调用此方法没有效果也不报错。
History.forward()

- 通过当前页面的相对位置从浏览器历史记录( 会话记录 )加载页面。比如：参数为-1的时候为上一页，参数为1的时候为下一页. 当整数参数超出界限时( 译者注:原文为When integerDelta is out of bounds )，例如: 如果当前页为第一页，前面已经没有页面了，我传参的值为-1，那么这个方法没有任何效果也不会报错。调用没有参数的 go() 方法或者参数值为0时，重新载入当前页面。( 这点与支持字符串作为url参数的IE有点不同)。

History.go()

- 按指定的名称和URL（如果提供该参数）将数据push进会话历史栈，数据被DOM进行不透明处理；你可以指定任何可以被序列化的javascript对象。注意到Firefox现在忽略了这个title参数，更多的信息，请看manipulating the browser history。Note: 在 Gecko 2.0 (Firefox 4 / Thunderbird 3.3 / SeaMonkey 2.1) 到 Gecko 5.0 (Firefox 5.0 / Thunderbird 5.0 / SeaMonkey 2.2)中， 被传递的对象使用JSON进行序列化. 从 Gecko 6.0 (Firefox 6.0 / Thunderbird 6.0 / SeaMonkey 2.3)开始，使用结构化克隆算法进行序列化。这样，就可以让更多类型的对象被安全地传输。

History.pushState()

- 按指定的数据，名称和URL(如果提供该参数)，更新历史栈上最新的入口。这个数据被DOM 进行了不透明处理。你可以指定任何可以被序列化的javascript对象。注意到Firefox现在忽略了这个title参数，更多的信息，请看manipulating the browser history。
Note: 在 Gecko 2.0 (Firefox 4 / Thunderbird 3.3 / SeaMonkey 2.1) 到 Gecko 5.0 (Firefox 5.0 / Thunderbird 5.0 / SeaMonkey 2.2) 中, the passed object is serialized using JSON. Starting in Gecko 6.0 (Firefox 6.0 / Thunderbird 6.0 / SeaMonkey 2.3), the object is serialized using the structured clone algorithm. This allows a wider variety of objects to be safely passed.

History.replaceState()
```
- History必须同源，不能跨域。
- History需要后端对所有的路由情况进行处理，否则就会404。