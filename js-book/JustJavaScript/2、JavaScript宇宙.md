# JavaScript 宇宙

在一开始，有了「值」。

什么是值（value）？很难说。

这就像是在问数学中的数是什么，或者几何中的点是什么。值就是 JavaScript 宇宙中的一个事物。

数字（numbers）是值。其他一些东西也是值，比如对象（object）和函数（function）。但是，也有许多东西（例如 if 语句或变量声明）都不是值。

代码与值（Code and Values）
为了把值与 JavaScript 程序中的其他东西区分开，我会想象 Antoine deSaint-Exupéry 画的「小王子」：

我站在一颗小行星上：它是我程序的代码。

在行星表层，我看到了 if 语句、变量声明、逗号、花括号，以及在 JavaScript 代码中可能看到的其他万物。

我的代码包含「执行一个函数调用」或「多次执行此操作」甚至「抛出一个错误」之类的指令。我一步一步地执行这些指令——在我的小行星上履行着使命。

但是偶尔，我也会抬头。

在一个明朗的夜晚，我看到了 JavaScript 天空中不同的值：布尔值（boolean）、数字（number）、字符串（string）、符号（symbol）、函数（function）、对象（object）、空值（null）、未定义（undefined）——哦，天哪！我可能在我的代码中引用了它们，但它们不存在于我的代码之内。

在我的 JavaScript 宇宙中，值在太空中漂浮。

「等一下啊，」你可能会说，「我一直认为值存在于我的代码之内啊！」在这里，我希望你可以迈出信仰之跃，放手一搏。这个心智模型还需要几个模块的时间才能看到回报。不妨给它五分钟。

言归正传。大致上有两种值。

原始值（Primitive Values）
原始值（Primitive Values） 就是数字（number）或者字符串（string）等等。打开你浏览器的控制台，用 console.log() 打印出下面的这些原始值看看：

```js
console.log(2); // 2
console.log("hello"); // hello
console.log(undefined); // undefined
```

所有原始值都有一些共同点。我的代码无法影响他们。这话听起来有点含糊，所以我们将在下一个模块中具体探讨其含义。现在，我想说的是原始值就像星星一样，无情而遥远，但是当我需要时，它们总会在那里。

这便是第一种值。

对象与函数（Objects and Functions）
对象（object）和函数（function）也是值，但它们并不原始。这使它们非常特别。让我们继续打印一些它们到浏览器的控制台看看吧：

```js
console.log({}); // {}
console.log([]); // []
console.log(x => x * 2); // x => x * 2)
```

请注意，浏览器控制台显示它们的方式与原始值不同。某些浏览器可能在它们之前显示一个箭头，或者在单击它们时展现地很特别。如果你安装了几种不同的浏览器（例如 Chrome 和 Firefox），可以比较一下它们是如何可视化这些对象和函数的。

之所以说对象和函数很特别，是因为我可以在代码中操纵它们。比如说，我可以将它们连接到其他值。这相当抽象——所以我们还是将在以后的模块中补充这个概念。现在，我能说的是，如果原始值像遥远的恒星，那么对象和函数就更像是漂浮在我代码附近的石块。它们如此地靠近，以至于我可以操纵它们。

这便是第二种值。

你可能有疑问。很好。如果你提出一个问题，JavaScript 宇宙或许可以答得上来！当然，前提是您你得知道如何提问。

表达式（Expressions）
有很多问题，JavaScript 答不上来。如果你想知道是向自己的好朋友袒露心扉比较好，还是憋到彼此都变成骨灰比较好，JavaScript 可帮不上多大忙。

但有些问题，JavaScript 很乐意回答。这些问题有一个特殊的名称——表达式（expressions）。

如果我们「询问」 2 + 2 这个表达式，JavaScript将「回答」4 这个值。

```js
console.log(2 + 2); // 4
```

表达式是 JavaScript 可以回答的问题。 JavaScript 用它所知道的唯一方式来回答表达式——值。

如果「表达式」一词使你感到困惑，你可以视其为表达一个值的一段代码。你可能听过 2 + 2 「的结果是」或者「求出来是」 4 这种说法。这些说的不过都是同一件事罢了。

我们询问 JavaScript 2 + 2，它回答 4。表达式总会求出一个单个的值。那么现在，我们对表达式的了解已经足够多了！

之前我曾说过，JavaScript 的值有很多类型：数字，字符串，对象等。我们又是怎么知道特定值的类型的呢？

这听起来像是一个问题啊。我们敢去问问它吗？

检查类型（Checking a Type）
最初，JavaScript 宇宙中的所有值可能看起来都一样——都是天空中的亮点点。但是，如果仔细观察，你会发现有不到十种不同类型的值。相同类型的值的行为是相似的。

如果要检查一个值的类型，可以使用 typeof 运算符询问。 JavaScript 将用设定好的字符串来回答我们的问题，例如 "number"、"string"、"object"。

下面是一些你可以在浏览器的控制台中尝试的例子：

```js
console.log(typeof(2)); // "number"
console.log(typeof("hello")); // "string"
console.log(typeof(undefined)); // "undefined"
```

此处，typeof(2) 是个表达式——它会求出 "number" 这个值。

严格来说，typeof 其实可以不需要搭配圆括号来用。比如，typeof 2 也可以和 typeof(2) 一样起作用。但是，有时圆括号却又是必须的，以避免歧义。比如，下面的例子中的一个将会因为我们省略了圆括号而崩溃。猜一猜会是哪个：

```js
console.log(typeof({})); // "object"
console.log(typeof([])); // "object"
console.log(typeof(x => x * 2)); // "function" 省略圆括号崩溃
```

你可以在浏览器的控制台中验证你的猜想。

现在再看一下最后三个例子——这次要密切关注它们的结果。你看到这些结果觉得惊讶吗？为什么？

值的类型（Types of Values）
作为一名有抱负的天文学家，你可能想了解这片 JavaScript 天空中，可以观察到的每种值的类型。 在研究 JavaScript 将近 25 年之后，科学家仅发现了 9 种类型：

原始值（Primitive Values）
未定义（Undefined） (undefined)，用于无意中漏掉的值。
空值（Null） (null)，用于有意漏掉的值。
布尔值（Booleans） (true 和 false)，用于逻辑操作符。
数字（Numbers） (-100、3.14 之类的)，用于数学计算。
字符串（Strings） ("hello"、"abracadabra" 之类的)，用于文本。
符号（Symbols） (不常用)，用于隐藏实现细节。
大型整数（BigInts） (不常用，是新的)，用于数学中的大数字。
对象和函数（Objects and Functions）
对象（Objects） ({} 之类的)，用于将相关的数据和代码分组。
函数（Functions） (x => x * 2 之类的)，用于引用代码。
没别的值了（No Other Types）
你可能会问：「但是我用的其他类型呢？比如数组（array）？」

在 JavaScript 中，除了我们列举过的类型外，再也没有别的基础类型了。所有剩下的都是对象（object）！比如，即便是数组（array）、日期（date）、正则表达式（regular expression），都是 JavaScript 中的对象：

```js
console.log(typeof([])); // "object"
console.log(typeof(new Date())); // "object"
console.log(typeof(/(hello|goodbye)/)); // "object"
```

「我知道了，」你可能会回道，「这是因为一切都是对象啊！」哎，这是流传甚广的一个都市传说，但它并不是真的。即便是像 123.toString() 这样的代码可能让你觉得在使用一个对象，这也不过是个幻象罢了。当你这么使用的时候，JavaScript 创建了一个包装对象，然后立马将其丢弃。

如果还没有完全参透这个机制，也不成问题。现在，你只需要记住原始值（例如数字和字符串）*不是*对象。

回顾（Recap）
让我们回顾一下目前所学吧：

先有值，后有万物。我们可以将值视为在 JavaScript 宇宙中「漂浮」的不同事物。它们不存在于我们的代码之内，但是我们可以在我们的代码中引用它们。
值有两类：原始值 & 对象和函数。总共有九种不同类型。每种类型都有特定的用途，但有些极少使用。
有些值是孤独的。比如，null 是唯一是空值的值，undefined 是唯一是未定义的值。当我们学到后面，会发现这两个孤儿活脱脱是俩捣蛋鬼！
我们可以用表达式提问。JavaScript 将用值来回答。比如，表达式 2 + 2 将被用 4 来回答。
我们可以通过包上一层 typeof 的表达式来观察类型。比如，typeof(4) 是字符串值 "number"。
练习（Exercises）
现在该把我们学到的东西付诸实践了。即使你已经有相当不错的 JavaScript 经验，我还是建议不要跳过这些问题！其中一些东西，我自己几年前才了解到。

单击此处回答这些小测试，并提供有关此模块的反馈。我将在下一个模块中包括答案！

译者：小测试见后附。

在下一个模块中，我们将更详细地探讨原始值。我们将研究一下像数字和空值等等这些不同的原始类型的共同点，并了解关 JavaScript 中的「相等」是什么意思。

我们还将继续完善我们的心智模型。本期模块提供了一个粗略的草图——一个大概。我们之后将专注于图片的不同部分，并为它们填充更多细节，就像是渐进式 JPEG 图像一样。

似乎看起来是小碎步前行，但我们为以后的一切奠定了基础。我们正一起携手构建 JavaScript 宇宙。

附：小测试
打开你一直在写的一些 JavaScript 代码，然后将 console.log(typeof(something)) 放入其中，把 something 换成你代码中的不同变量。

你成功找到哪些值的类型了？ 尝试「收集」尽可能多的类型。

```js
console.log(typeof(1)) // number
console.log(typeof('1')) // string
console.log(typeof(true)) // boolean
console.log(typeof(undefined)) // undefined
console.log(typeof(null)) // object
console.log(typeof(Symbol())) // symbol
console.log(typeof(BigInt('1'))) // bigint

console.log(typeof({})) // object
console.log(typeof(function(){})) // function
```

有让你感到惊讶的结果吗？

假设你看到了这段用于检查一个值是否是日期类型的代码：typeof(value) === 'date'

这段代码会有用吗？

为什么呢？

在「值的类型」部分列举的九大类型中，有一个值「撒谎」了。具体地说，对于这个值，typeof 将会返回一个错误的答案，这是因为 JavaScript 的一个 bug，而时至今日，想要修复它已经太迟了。

你知道是哪个值吗？

不管我们取了什么值，我们都知道 typeof(value) 总会给我们一个预设好的答案。

关于 typeof(typeof(value))，我们可以推断类似的事实吗？ 解释你的思考过程。

告诉我到目前为止你对本期模块和 Just JavaScript 的看法。

觉得有什么地方讲得很有见地吗？还是令人困惑？我很想知道！

答案
答案：typeof(value) === 'date' 恒为 false。

这是因为 "date" 不是 typeof 任何一个可能的结果。日期也不是原始类型之一（不同于数字和布尔值），并且日期也不是函数。所以把 typeof 用于日期，结果总会是 "object"。

答案：null。

具体地，typeof(null) 是 "object"，即便 null 并不是一个对象。null 是一个原始值。（这里是关于为何如此的一份历史记载。）这是 JavaScript 的一个古老 bug 了。为了避免现存的网站崩溃，它一直未被修复。

你可能会问：typeof([]) === "object" 难道不是 bug 吗？并不是。数组不是原始值，所以它们就是对象！

答案：typeof(typeof(value)) 恒为 "string"。

原因是，我们知道 typeof(value) 总会给我们一个预设好的字符串，比如 "undefined"、"boolean"、"number" 等等。

所以再 typeof 以上任何字符串的结果都是 "string"。谁让他们是字符串呢！
