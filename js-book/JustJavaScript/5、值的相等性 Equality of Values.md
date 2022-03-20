# 值的相等性 Equality of Values

是时候谈谈 JavaScript 中的相等性了。它为什么很重要呢？

想象一下，你在蒙面狂欢节上谈生意。你可能会和两个人交谈，却没意识到你其实两次都是在和同一个人谈。又或者是，你可能认为你在和一个人交谈，但其实是两个人！



如果没有一个清晰的 JavaScript 相等性的心智模型，那么每天就如同一场不咋样的狂欢节。你永远不确定要处理的是相同的值还是两个不同的值。到最后，你就经常会犯错误——比如，把你本来不想改的值给改了。

幸运的是，要建立这个 JavaScript 相等性模型，我们其实已经完成了大部分工作。「相等性」这个概念将用一种很自然的方式来嵌入到我们的心智模型中。

相等性的种类（Kinds of Equality）
JavaScript 中，有几种不同的相等。如果你已经熟悉 JavaScript 一阵子了，你或许至少了解下面这些当中的两个：

严格相等（Strict Equality）：a === b（三等号）
宽松相等（Loose Equality）：a == b（双等号）
同值相等（Same Value Equality）：Object.is(a, b)
大多数教程压根不会提到同值相等。我们将沿着这条人迹罕至的道路前行，先说明同值相等。之后，我们可以用它来解释其他几种相等。

同值相等（Same Value Equality: Object.is(a, b)）
JavaScript 中，Object.is(a, b) 告诉我们 a 和 b 是否为相同的值：

console.log(Object.is(2, 2)); // true
console.log(Object.is({}, {})); // false
在我们的心智模型中，「同值」意味着什么呢？你可能直觉上已经知道了，但还是让我们检验一下你的理解吧。

检测你的直觉（Check Your Intuition）
考虑《屈「值」可数》那一节的一道练习：

let dwarves = 7;
let continents = '7';
let worldWonders = 3 + 4;
提醒一下， 我们这段代码的草图画这样：



现在，试试用上图来回答这些问题：

console.log(Object.is(dwarves, continents)); // ?
console.log(Object.is(continents, worldWonders)); // ?
console.log(Object.is(worldWonders, dwarves)); // ?
写下你的答案，并想想你会如何解释。

剧透预警！

没完成不要滚动。

...

...

...

...

...

...

...

...

...

这个问题没啥陷阱。答案如下：

Object.is(dwarves, continents) 是 false。因为 dwarves 和 continents 指向不同的值。
Object.is(continents, worldWonders) 是 false。因为 continents 和 worldWonders 指向不同的值。
Object.is(worldWonders, dwarves) 是 true 因为 worldWonders 和 dwarves 指向相同的值。
如果两个值在我们的图像中是以同个单一的形状表示出来的，那么说明他们并非两个不同的值。他们是同一个值！在这个情况下，Object.is(a, b) 会返回 true。

上期，我们「数」了值。但事实上，我们学到了让一个值区分于别的值的因素，同时，也学到了对立面——让一个值等价于另一个值的因素。

如果你还是感到困扰，你或许需要重温上讲，并且做做练习题。会有用的，我保证！

那么对象呢？（But What About Objects?）
此刻，你或许在惦记着对象。你或许之前听说过相等性并不作用于对象，或者拿「引用」来做对比。如果你现有的思维是这样的，请暂时把这个观念完全抛脑后。

取而代之地，看看这段代码：

let banana = {};
let cherry = banana;
let chocolate = cherry;
cherry = {};
打开笔记本或者画图软件 ，画出变量和值的图像。你可能需要一步步地完成，因为在脑中凭空想有点困难。

要记住 {} 总是表示「创建一个新的对象值」。同时记住，= 表示「把左边的电线连到右边的值」。

画完后，写下这些问题的答案：

console.log(Object.is(banana, cherry)); // ?
console.log(Object.is(cherry, chocolate)); // ?
console.log(Object.is(chocolate, banana)); // ?
确保用你的图像来回答问题。

剧透预警！

没完成不要滚动。

...

...

...

...

...

...

...

...

...

你画出来的流程应该如此：



let banana = {};声明一个 banana 变量。创建一个新的对象值 {}，并把 banana 变量的电线指向它.
let cherry = banana;声明一个 cherry 变量，并把 cherry的电线指向 banana 正指的地方。
let chocolate = cherry;声明一个 chocolate 变量，并把 chocolate的电线指向 cherry 正指的地方。
cherry = {};创建一个新的变量值 {}，并把 cherry 变量的电线指向它.
最后一步之后，你的图像应该长这样：



下面，来检查一下你的答案：

Object.is(banana, cherry) 是 false。因为 banana 和 cherry 指向不同的值。
Object.is(cherry, chocolate) 是 false。因为 cherry 和 chocolate 指向不同的值。
Object.is(chocolate, banana) 是 true。因为 chocolate 和 banana 指向相同的值。
如你所见，我们并不需要额外概念来解释「同值相等」在对象上的如何运作。它很自然地融入在我们的心智模型中了。

并且这就是对它一切需要了解的！

严格相等（Strict Equality: a === b）
你之前可能已经用过严格相等操作符了：

console.log(2 === 2); // true
console.log({} === {}); // false
同时还有一个逆操作符 !==。

同值相等与严格相等（Same Value Equality vs Strict Equality）
所以 Object.is 和 === 之间有什么区别？

同值相等（Object.is(a, b)）在我们的心智模型中有着直截了当的含义。它对应着宇宙中的「同一个值」这个概念。

大多数情况下，同样的直觉对严格相等也有用。比如 2 === 2 是 true，因为 2 总是「召唤出」同一个值。



相反，{} === {} 是 false，因为每个 {} 创建出一个不同的值。



上面的例子里，a === b 和 Object.is(a, b) 的效果一致。然而，有两个罕见的例子，=== 的效果会不一致。

把下面的特例当作是规则的例外情况——就像你学英语时不得不记住不规则动词一样。这两个特例都涉及到我们过去提到的「特殊数字」：

NaN === NaN 是 false，即便他们是同一个值。
-0 === 0 和 0 === -0 是 true，即便他们是不同的值。
虽然这些例子不常见，但我们还是要逐一仔细看看。

第一个特例（First Special Case: NaN）
如我们在屈「值」可数中看到的那样，NaN是个特殊数字，它在我们作出不正确的数学计算后会出现，比如 0 / 0：

let width = 0 / 0; // NaN
对 NaN 的进一步操作都会再次给你 NaN：

let height = width * 2; // NaN
你可能不会故意这么做，但是它会发生在你一开始处理数据不对、或者计算含错的时候。

记住，NaN === NaN 始终为 false：

console.log(width === height); // false
然而，NaN 和 NaN 是同一个值。

console.log(Object.is(width, height)); // true


令人困惑。

NaN === NaN 为 false 很大一部分是历史原因，所以我建议把它当成一个生活事实来接纳。当你想写一段来检查一个值是不是 NaN 的代码时，可能会碰到这个。

function resizeImage(size) {
  if (size === NaN) {
    // 没用。条件将始终为 true。
    console.log('出错了。');
  }
  // ...
}
取而代之的，下面是用来检查 size 是否为 NaN 的一些有用的方法：

Number.isNaN(size)
Object.is(size, NaN)
size !== size
最后一个可能看上去尤其让人惊讶。再多花点时间看看。如果你不明白为什么它可以检测 NaN，尝试重读一下这个章节，并再思考一下。

第二个特例（Second Special Case: -0）
虽然在通常的数学中没有「负零」这个概念，但浮点数学中它因实际的原因而存在。

一个有趣的事实就是，0 === -0 和 -0 === 0 二者皆为 true：

let width = 0; // 0
let height = -width; // -0
console.log(width === height); // true
然而，0 和 -0 是不同的值：

console.log(Object.is(width, height)); // false


同样令人困惑。

实际上，在我整个职业生涯中，我都还没遇到过这个问题产生过很大影响的例子。

编码练习（Coding Exercise）
既然你知道 Object.is 和 === 的运作方式了，我有一个编码小练习给你。你虽不必完成它，但它会是一个很有趣的动脑小考验。

写一个叫作 strictEquals(a, b) 的函数，它返回和 a === b 相同的值。你的实现里不能用到 === 和 !== 操作符。

如果你想检查，这是我的答案。这个函数完全没啥用，但写一写可以帮你理解 ===。

莫慌（Don’t Panic）
听到这些特殊数字及其行为方式，可能会让人感到难以理解。对于这些特殊情况，不要过分紧张！

它们并不常见。不过既然你知道它们存在，你在实践中也就可以认出它们了。并且大多数情况下，我们关于「同值」是什么的直觉对于 Object.is(a, b) 和 a === b 都很有用。

宽松相等（Loose Equality）
最后，我们来到了最后一种相等：

宽松相等（双等号）是个 JavaScript 中的讨厌鬼。

下面是让你起鸡皮疙瘩的几个例子：

console.log([[]] == ''); // true
console.log(true == [1]); // true
console.log(false == [0]); // true
等等，啥？

严格相等（也被叫做「抽象相等」）的规则很晦涩难懂、令人困惑。这些规则被看作是早期的不良设计决策。很多编码标准都禁止在代码中使用 == 和 !=。

尽管《不就是个JS》不会对你应该用什么特性或者不应该用什么特性指指点点，我们还是暂时不讨论「宽松平等」。它在现代代码库中并不常见，规则在语言或我们的心智模型中也不重要。如果你依旧好奇，请看它的运作方式，但别为记住它感到压力。你的记忆要用在别的地方！

它的一个用法相对来说比较普遍，值得一记：

if (x == null) {
  // ...
}
这段代码等价于：

if (x === null || x === undefined) {
  // ...
}
然而，即便是这种 == 的用法，在一些团队中也很有争议。最好先作为团队一起讨论讨论 == 在你们的代码库中的容忍度是多少。

复习（Recap）
JavaScript 有几种不同的相等性，包括 同值相等、严格相等、宽松相等。
同值相等，即 Object.is(a, b)，符合和我们在之前的模块中介绍过的「同值」概念。
理解这种相等性能帮忙避免 bug！你会经常需要知道你什么时候在处理同一个值，什么时候又在处理两个不同的值。
当我们画值和变量的图像时，「同值」不能出现两次。当变量 a 和 b 在图像中指向同一个值时，Object.is(a, b) 为 true。
同值相等是最容易解释的，这也是为什么我们从它开始。虽然来说，写出它来繁琐又恼人。
实践中，你会最常用到严格相等，即 a === b。它等价于同值相等，但有两个特例：
NaN === NaN 为 false，即使它们是同一个值。
0 === -0 和 -0 === 0 为 true，即使它们是不同的值。
你可以用 Number.isNaN(x) 来检查 x 是否为 NaN。
宽松相等，即 ==，有着一套难懂的规则，并经常被避免使用。
最后，你可能会疑惑为什么 size !== size 也可以检测 size 是否为 NaN。我们说过我们会在这节的末尾来回顾这个问题。这种方式起作用的原因是 NaN === NaN 为 false，所以相反情况（NaN !== NaN）一定是 true。因为 NaN 是唯一一个不等于它自身的值，size !== size 只能意味着 size 为 NaN。

事实上，确保你可以用这种方式探测 NaN 也是最初让 NaN === NaN 返回 false 的原因之一。在 JavaScript 存在之前就已经决定好了。这仅仅是个历史轶事，不过仍然很有趣。

练习（Exercises）
本期模块同样提供有练习给你！

点击这里用几个小测验来巩固心智模型吧。

小测验见附。

不要跳过！

即使你可能熟悉相等性的概念，这些练习也可以帮助你巩固我们正在构建的心智模型。在进入更复杂的主题之前，我们需要这个基础。

小测验
画出下面代码运行后的变量和值的示意图。

如果没有笔和纸，可以用 https://www.excalidraw.com 这类在线绘图软件绘画。

let fingernails = 'mustache';
let toes = fingernails;
let nose = 'must' + 'ache';
以下哪一个更符合你的图像呢？



现在，用该图像看看下面的输出：

console.log(fingernails === toes);
console.log(toes === nose);
console.log(nose === fingernails);
提示，通常当 a 和 b 指向同个值时，a === b。

画出下面代码运行后的变量和值的示意图。

如果没有笔和纸，可以用 https://www.excalidraw.com 这类在线绘图软件绘画。

let tomato = {};
let oregano = tomato;
let potato = {};
tomato = {};
以下哪一个更符合你的图像呢？



现在，用该图像看看下面的输出：

console.log(tomato === oregano);
console.log(oregano === potato);
console.log(potato === tomato);
下面，让我们试试看不一样的题吧。

请根据下图，写出执行后的结果将成为这个图的三行代码：



现在，让我们看一些更实际的场景。

这段代码的作者希望它能打印一段信息，该信息会出现吗？

使用我们的心智模型来回答，如果想的话也可以画一画。

let ticket = { id: 0 };
if (ticket === { id: 0 }) {
  console.log('Bad ticket');
}
这段代码的作者希望它能打印一段信息，该信息会出现吗？

使用我们的心智模型来回答，如果想的话也可以画一画。

let ticketId = 0;
if (ticketId === 0) {
  console.log('Bad ticket');
}
你能想出一个不同的值，来让信息打印出来吗？

let ticketId = ???;
if (ticketId === 0) {
  console.log('Bad ticket');
}
画出下面代码运行后的变量和值的示意图。

如果没有笔和纸，可以用 https://www.excalidraw.com 这类在线绘图软件绘画。

let tea = function() { return 0 / 0; };
   let coffee = function() { return 0 / 0; };
   let matcha = tea();
   let latte = coffee();
以下哪一个更符合你的图像呢？



现在，用该图像看看下面的输出：

console.log(tea === coffee);
console.log(Object.is(tea, coffee));
console.log(matcha === latte);
console.log(Object.is(matcha, latte));
告诉我到目前为止你对本期模块和 Just JavaScript 的看法。

觉得有什么地方讲得很有见地吗？还是令人困惑？我很想知道！

答案
答案：图 B 正确。所有变量都指向同个 "mustache" 字符串值。

其他的图像都不符合我们的心智模型，因为它们表示出了不止一个 "mustache" 字符串值。在我们的宇宙中，每个字符串都只有一个存在。



答案：三个语句都将打印 true。

答案：图 C 正确。它表示每个变量都指向不同的对象值。

要记住 {} 表示「创建一个新的对象值」，let x = y 表示「把 x 的电线指向 y 当前的值」。

答案：三个语句都将打印 false。

答案不唯一：

let tree = {};
let water = tree;
let stone = {};
答案：该信息不会显示。

当我们「问」 ticket === { id: 0 } 时，我们需要知道 === 的两边分别是什么值。左边，我们有 ticket，它的值是我们在第一行通过 { id: 0 } 创建出来的对象。右边，我们有 { id: 0 } 对象字面量——它会创建一个全新的值！

我们在 === 的两边有不同的对象值。所以该条件不会通过，该函数不会打印我们的信息。

答案：该信息会显示。

当我们「问」 ticketId === 0 时，我们需要知道 === 的两边分别是什么值。左边，我们有 ticketId，它指向数字值 0。右边，我们有 0 字面量——它同样也是数字值 0。

我们的宇宙中只有一个数字值 0，我们在 === 的两边有同样的值。所以该条件会通过，该函数会打印我们的信息。

答案：-0

即便 0 和 -0 是两个不同的值，=== 也把他们当成是相等的。

let ticketId = ???;
if (ticketId === 0) {
  console.log('Bad ticket');
}
答案：图 D 正确。它表示 tea 和 coffee 指向两个不同的函数值，而 matcha 和 latte 指向同个 NaN 值。

图 A 错误。因为它表示matcha 和 latte 指向两个不同的 NaN 值。在我们的宇宙中，只有一个 NaN 值。

图 B 和图 C 错误。因为它们表示 tea 和 coffee 指向同个值。每个函数定义都创建一个新的值，所以 tea 和 coffee 应该指向两个不同的函数值。

作为提醒，NaN 是个特殊的数字的值，表示一个不正确的计算结果，比如当你尝试计算 0 / 0 时。



答案：只有 Object.is(matcha, latte) 为 true，其余的都为 false。
tea === coffee — 此为 false。因为 tea 和 coffee 指向两个不同的函数值。
Object.is(tea, coffee) — 此为 false。因为 tea 和 coffee 指向两个不同的函数值。
matcha === latte — 此为 false。因为 matcha 和 latte 指向同个 NaN 值，但是 NaN === NaN 恒为 false。（如果你不记得了，可以重读关于也严格相等的特例那一节。）
Object.is(matcha, latte) — 此为 true。因为 matcha 和 latte 指向同个 NaN 值。