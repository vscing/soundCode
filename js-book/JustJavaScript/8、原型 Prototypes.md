# 原型 Prototypes

在上期模块，我们讨论了对象、属性、突变。但先别急着转移话题，关于对象的事情，我们还没说完呢。

先来看看这个小谜题，检测一下我们的心智模型：

let pizza = {};
console.log(pizza.taste); // "pineapple"
问问看你自己：这可能吗？

我们刚刚用 {} 创建了一个空对象，并且绝对没有在其内设置任何属性。看起来似乎 pizza.taste 不会指向 "pineapple"，而是应该给我们 undefined。（要是属性不存在的话，我们通常都会得到 undefined，对吧？）

然而，如果我们在这两行前面再添加几句代码，的确是可能导致 pizza.taste 变成 "pineapple" 的！这是一个人为的例子，但却表明了我们 JavaScript 宇宙的心智模型是不完整的。

本期模块，我们将介绍「原型」（prototypes）的概念。原型会解释这个谜题中发生了什么。更重要的是，原型是另一些 JavaScript 特性的核心。人们有时会忽视学习原型，因为它们看起来太不寻常了。然而，它的核心思想是非常简单的。

原型（Prototypes）
这里有一些变量指向了一些对象：

let human = {
  teeth: 32
};

let gwen = {
  age: 19
};
画成我们熟悉的图，可以这样表达：

prop
prop
在这个例子中，gwen 指向了一个不包含 teeth 的对象。根据我们所学的规则，要是读取它，会得到 undefined：

console.log(gwen.teeth); // undefined
但是故事并未止步于此。我们可以让 JavaScript 在另一个对象中继续搜寻我们缺失的属性，而不是默认返回 undefined。并且，一行代码就可以搞定：

let human = {
  teeth: 32
};

let gwen = {
  // 我们添加这行代码：
  __proto__: human,
  age: 19
};
这里神秘的 __proto__ 属性是什么的？

它代表的，正是 JavaScript 的原型（prototype）概念。任何 JavaScript 对象都可以把一个其他的对象当成自己的原型。我们将稍后讨论这在实践中意味着什么。现在，我们就把它当作一根特殊的 __proto__ 电线：

proto
proto
暂停片刻，验证一下图像和代码的匹配。我们和往常一样画出了图，唯一的区别就是这根神秘的 __proto__ 电线。

原型实践（Prototypes in Action）
之前，当我们寻找 gwen.teeth 时，因为 gwen 所指向的对象里不存在 teeth 属性，所以我们得到了 undefined。

但是，幸亏有了 __proto__: human 这条线路，答案如今不同了：

let human = {
  teeth: 32
};

let gwen = {
  // "在这里寻找其他的属性"
  __proto__: human,
  age: 19
};

console.log(gwen.teeth); // 32
现在，步骤流程看起来就像这样：

proto_anim
proto_anim
沿着 gwen 电线，它导向一个对象。
此对象是否包含 teeth 属性？
否。
但是它有原型。让我们看看原型对象。
彼对象是否包含 teeth 属性？
是，teeth 指向 32。
因此，gwen.teeth 的结果是 32。
这和你工作中可能会说的话相似：「我不知道，但是小王可能知道。」有了 __proto__，你可以让 JavaScript 去「询问另一个对象」。

为了检验你目前的理解，回答下面的问题：

let human = {
  teeth: 32
};

let gwen = {
  __proto__: human,
  age: 19
};

console.log(human.age); // ?
console.log(gwen.age); // ?

console.log(human.teeth); // ?
console.log(gwen.teeth); // ?

console.log(human.tail); // ?
console.log(gwen.tail); // ?
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

现在，来看看你的答案。

human 变量指向了一个没有 age 属性的对象，所以 human.age 是 undefined。gwen 变量指向了一个有 age 属性的对象，其电线指向 19，所以 gwen.age 的值是 19：

console.log(human.age); // undefined
console.log(gwen.age); // 19
human 变量指向了一个有 teeth 属性的对象，所以 human.teeth 是 32。gwen 变量指向了一个没有 teeth 属性的对象，但是该对象有一个原型，该原型含有 teeth 属性。所以 gwen.teeth 也是 32：

console.log(human.teeth); // 32
console.log(gwen.teeth); // 32
两个对象都不含有 tail 属性，所以二者都是 undefined：

console.log(human.tail); // undefined
console.log(gwen.tail); // undefined
注意，即便 gwen.teeth 的值是 32，这也并不意味着它有 teeth 属性。本例中， gwen 并没有 teeth 属性。但是它的原型对象——即 human 指向的对象——有该属性。

原型链（The Prototype Chain）
原型并非 JavaScript 特有的事物，它更像是一种「关系」。一个对象可以指向另一个对象，将其作为它的原型。

这很自然地引向了一个问题：要是对象的原型也有一个它自己的原型，会怎么样呢？并且那个原型又有一个它自己的原型呢？这可以正常运作吗？

答案是：它确实就是这么运作的！

let mammal = {
  brainy: true,
};

let human = {
  __proto__: mammal,
  teeth: 32
};

let gwen = {
  __proto__: human,
  age: 19
};

console.log(gwen.brainy); // true
我们可以看到，JavaScript 搜寻属性会先在对象中，然后在对象的原型中，接着在对象原型的原型中，以此类推。如果我们遍历了所有原型，都没有找到那个属性，那么才会得到 undefined。

protochain
protochain
这和你工作中可能会说的话相似：「我不知道，但是小王可能知道。」但小王可能会说：「其实我也不知道，问问小李吧。」最终，你要么是问到了答案，要么是问遍了所有人都不知道答案。

这种「访问」对象的序列方式也被称作对象的「原型链」（prototype chain）。（但是，不同于你平时穿戴的链条那样，原型链不可以有环！）

遮蔽（Shadowing）
考虑下面的例子：

let human = {
  teeth: 32
};

let gwen = {
  __proto__: human,
  // 该对象有它自己的 teeth 属性：
  teeth: 31
};
两个对象都定义了 teeth 属性，所以结果也就不同：

console.log(human.teeth); // 32
console.log(gwen.teeth); // 31
注意 gwen.teeth 是 31。如果 gwen 没有定义 teeth 属性，我们就得看它的原型。但因为它定义了，我们就无需搜寻原型了。

shadowing
shadowing
换句话说，一旦我们找到了属性，就停止搜索。

如果你想检查一个对象是否含有自己的属性，你可以使用一个内置函数 hasOwnProperty。如果是自有属性，则它将返回 true，并且不会去检查原型。在我们的上例中，两个对象都有自己的 teeth 属性，所以二者都是 true：

console.log(human.hasOwnProperty('teeth')); // true
console.log(gwen.hasOwnProperty('teeth')); // true
译者按：

这节的标题是「(Property) Shadowing」，属性遮蔽。可以将其理解为自有属性将「遮蔽」原型链上的同名属性。类似的概念还有 OOP 中的重载（Override）。

赋值（Assignment）
考虑此例：

let human = {
  teeth: 32
};

let gwen = {
  __proto__: human,
  // 注意：无自有的 teeth 属性
};

console.log(human.teeth); // 32
console.log(gwen.teeth); // 32

gwen.teeth = 31;

console.log(human.teeth); // ?
console.log(gwen.teeth); // ?
在赋值之前，二者都是 32：

step1
step1
然后我们执行该语句：

gwen.teeth = 31;
现在问题是 gwen.teeth 对应哪根电线？答案是：通常来说，赋值只会作用于对象自身。

所以该赋值语句在 gwen 所指向的对象身上，创建了一个新的自有属性，叫作 teeth。它不会对原型造成任何影响：

step2
step2
所以，结果是：

console.log(human.teeth); // 32
console.log(gwen.teeth); // 31
我们可以用一个简单的经验法则来总结这种行为。

当我们读取一个对象上不存在的属性时，我们会在原型上一直搜寻。如果找不到，就会得到 undefined。

但是当我们写入一个对象上不存在的属性时，我们会在对象上创建该属性。通常来说，原型不会被涉及到。

对象原型（The Object Prototype）
这个对象并没有原型，对吗？

let obj = {};
试试在你的浏览器控制台里运行一下：

let obj = {};
console.log(obj.__proto__); // 试试看！
令人惊讶的是，obj.__proto__ 并不是 null 或者 undefined。而是一个有着一堆包括 hasOwnProperty 属性的奇特对象。

我们将称这个特殊对象为「对象原型」（Object Prototype）：

root1
root1
起初，这看起来有点魔幻。让我们静下来看看。一直以来，我们都以为 {} 创建了一个「空」对象。但其实也不是那么空！它默认有一个隐藏的 __proto__ 电线，指向了「对象原型」。

这解释了为什么 JavaScript 对象看上去好像有「内置」的属性：

let human = {
  teeth: 32
};
console.log(human.hasOwnProperty); // function hasOwnProperty() { }
console.log(human.toString); // function toString() { }
「内置」的属性其实就是「对象原型」上存在的那些普通属性。我们对象的原型就是「对象原型」，这也是为什么我们可以访问到这些属性。（该实现是隐藏在 JS 引擎内部的。）

没有原型的对象（An Object with No Prototype）
我们刚刚认识到所有通过 {} 语法创建的对象都有一个特殊的 __proto__ 电线，导向默认的「对象原型」上。但是我们也知道我们可以自定义 __proto__。你可能会想：我们能不能把 __proto__ 设置成 null 呢？

let weirdo = {
  __proto__: null
};
答案是可以的。这会创造出一个真正没有原型的对象。而结果就是，它也没有一些内置的对象方法：

console.log(weirdo.hasOwnProperty); // undefined
console.log(weirdo.toString); // undefined
你一般根本不会这样创建对象的。但是，「对象原型」本身其实就是这样的一个对象，一个没有原型的对象。

原型污染（Polluting the Prototype）
现在我们知道，所有的 JavaScript 对象都默认有同样的原型。让我们再简单地回顾一下「突变」那期说到的例子：

root2
root2
该图像给了我们一个很有趣的视角。如果 JavaScript 在原型上搜索缺失的属性，并且大多数对象共享着同个原型，我们可不可以通过突变该原型，来让新属性「出现」在所有的对象上呢？

答案是可以！

让我们添加这两行代码：

let obj = {};
obj.__proto__.smell = 'banana';
我们添加了一个 smell 属性，突变了「对象原型」。这导致两位侦探都使用香蕉味道的香水了：

console.log(sherlock.smell); // "banana"
console.log(watson.smell); // "banana"
pollution
pollution
像这样突变一个被共享的原型，叫做「原型污染」（prototype pollution）。

曾经，很流行用原型污染来拓展 JavaScript 以拥有新特性。然而，这些年来，Web 社区开始意识到它很脆弱，并且使得添加新语言特性变得困难。于是大家宁愿避开这种方式。

__proto__ vs prototype
你可能疑惑：prototype 属性又是什么东西？你或许曾在文档中见过 prototype，比如在 MDN 的页面标题中。

我有个坏消息告诉你：prototype 属性完全和原型的核心机理（即 __proto__）无关。

prototype 属性大多与解释 new 操作符相关。我相信这个不幸的命名选择，是大多数人被原型所困扰而放弃学习的主要缘由。

为何重要？（Why Does This Matter?）
你可能又疑惑：为什么要在意原型呢？你会经常使用它们吗？实践中，你或许不会直接用到它们，不要养成写 __proto__ 的习惯。这些例子仅仅是阐述机理。（事实上，直接使用 __proto__ 语法本身是不被鼓励的。）

原型有些不寻常，大部分人和框架从未真正完全接受过原型，把它作为一种范式。取而代之的，人们通常仅仅把原型当作其他语言中的传统「类继承」（class inheritance）模型的实现基础。事实上，类继承是非常普遍的，以至于 JavaScript 后来添加了一个类语法作为惯例，将原型 「隐藏」在人们的视线之外。

尽管如此，你还是会注意到隐藏在类和其他 JavaScript 特性「表层之下」的原型。例如，这里是一个用 __proto__ 重写的 JavaScript 类的一段代码，展示了内部的情况。

就我个人而言，我在日常编码中并没有使用很多类，也很少直接处理原型。但是，知道这些功能是如何相互建立的，以及当我读取或设置一个对象上的属性时，会发生什么，这对我来说是有帮助的。

复习（Recap）
当读取 obj.prop 时，如果 obj 没有 prop 属性， JavaScript 将搜寻 obj.__proto__.prop，接着搜寻 obj.__proto__.__proto__.prop，以此类推，直到找到所要的属性或者抵达了原型链的末端。
当写入 obj.prop 时，JavaScript 通常会直接写入对象，而不会遍历原型链。
我们可以使用 obj.hasOwnProperty('prop') 来检查对象是否有自有属性 prop。换句话说，这意味着有一根叫做 prop 的电线直接附着在该对象上。
我们可以通过突变来「污染」一个被多个对象所共享的原型。我们甚至可以对「对象原型」（{} 的默认原型）这么做！但是我们不应该这么做，除非想整蛊同事。
你或许在实践中不会太多使用原型。但是，原型是 JavaScript 对象运作的基础，所以了解它们的底层机理很方便。一些高级的 JavaScript 特性，包括类，都可以用原型来表示。
练习（Exercises）
本期模块同样提供有练习给你！

点击这里用几个小测验来巩固心智模型吧。

小测验见附。

不要跳过！

即使你可能熟悉原型的概念，这些练习也可以帮助你巩固我们正在构建的心智模型。在进入更复杂的主题之前，我们需要这个基础。

题目 1
画出下面代码运行后的变量和值的示意图。

如果没有笔和纸，可以用 https://www.excalidraw.com 这类在线绘图软件绘画。

为了避免视觉混乱，请不要把「对象原型」也囊括在你的图像内。它在这道题里无需登场。

let lie = {
  taste: 'bitter'
};

let cake = {
  __proto__: lie
};
以下哪一个更符合你的图像呢？

q1
q1
答案：图 C 正确。

图 A 是错误的，因为它显示了 lie 和 cake 指向同一个对象。但是，它们应该指向两个不同的对象，因为每次写 {}，我们就会创建一个不同的对象。

图 B 是错误的，因为 __proto__ 电线指向一个变量。然而，电线永远不能指向变量。它们总是指向值。

图 D 是错误的，因为它显示两个对象都有 taste 属性。然而，cake 指向的对象并不具有 taste 属性。我们从未定义过它。

题目 2
现在，使用该图像，回答下面的问题：

console.log(cake === lie) // ?
console.log(cake.taste === lie.taste) // ?
console.log(cake.hasOwnProperty('taste') === lie.hasOwnProperty('taste')) // ?
q2

答案：false, true, false。

console.log(cake === lie) 是 false。因为二者是不同对象。

console.log(cake.taste === lie.taste) 是 true。因为 cake.taste 的值是 "bitter"（我们通过原型找到的），lie.taste 的值也是 "bitter"（我们在对象本身上找到的）。每个独立的字符串值只存在一次，所以左边和右边的值是相等的。

console.log(cake.hasOwnProperty('taste') === lie.hasOwnProperty('taste')) 是 false。记住，hasOwnProperty 是在问「这个对象是否自有该属性」。

在左边，cake.hasOwnProperty('taste') 是 false，因为 cake 指向的对象没有自己的 taste 属性。在右边，lie.hasOwnProperty('taste') 是 true，因为 lie 指向的对象确实有一个 taste 属性。

所以我们有 false ===== true，这本身就是假的。

题目 3
画出下面代码运行后的变量和值的示意图。

let lie = {
  taste: 'bitter'
};

let cake = {
  __proto__: lie
};

lie.taste = 'butter';
以下哪一个更符合你的图像呢？

q3
q3
答案：图 C 正确。

图 A 和图 B 是错误的，因为它们显示 cake 指向的对象有自己的 taste 属性。然而，我们从未在该对象上声明或赋值过这个属性。

图 D 是错误的，因为它显示了两个变量指向同一个对象。然而，每个变量在开始时都指向不同的新创建的对象，而且从那以后两个变量都没有被重新赋值。

题目 4
现在，使用该图像，回答下面的问题：

console.log(lie.taste) // ?
console.log(cake.taste) // ?
q2

答案："butter" 和 "butter"。

console.log(lie.taste) 是 "butter"。因为 lie 所指向的对象有自己的 taste 属性，指向 "butter"。
console.log(cake.taste) 是 "butter"。因为 cake 所指向的对象并没有 taste 属性，所以我们继续在它的原型上寻找它。它的原型有一个 taste 属性，所以它的值就是结果。
题目 5
画出下面代码运行后的变量和值的示意图。

let spider = {
  legs: 8
};
let miles = {
  __proto__: spider
};

miles.legs = 2;
以下哪一个更符合你的图像呢？

q5
q5
答案：图 B 正确。

图 A 是错误的，因为它显示 miles 指向一个对象，其 legs 属性仍然指向 8，但是，我们已经将 miles.legs 重新赋值了 2，这使得 miles 指向的对象发生了突变。因此，该对象的 legs 属性现在应该指向 2。

图 C 是错误的，因为它显示的是 spider.legs 指向 2，但是，spider 指向的对象并没有被突变，原本 spider.legs 是 8，所以它应该保持为 8。

回想一下，我们只在读取不存在的属性时才看原型。但是当我们写一个不存在的属性时，我们会把它写在对象本身上。所以，当我们写 miles.legs 时，它就会在 miles 指向的对象上创建一个 legs 属性。原型在此不应该被涉及到。

图 D 是错误的，原因和图 C 类似。我们没有突变 spider.legs，给 miles.legs 赋 2 并没有影响到 spider 指向的对象。所以 spider.legs 仍然应该是 8。

题目 6
现在，使用该图像，回答下面的问题：

console.log(spider.legs) // ?
console.log(miles.legs) // ?
q6

答案：8 和 2。

console.log(spider.legs) 是 8。因为 spider 指向的对象有自己的 legs 属性指向 8。
console.log(miles.legs) 是 2。因为 miles 指向的对象有自己的 legs 属性指向 2，虽然它有一个原型，但我们不看它，因为我们已经找到了自己的属性。
题目 7
首先，画出下面代码运行后的变量和值的示意图。然后，根据图像来推算出最后一行代码会打印出什么。

let spider = {
  legs: 8
};
let miles = {
  __proto__: spider
};
let gwen = {
  __proto__: spider
};

miles.legs = 2;
spider.legs = gwen.legs * 2;

console.log(gwen.legs); // ?
答案：16。

首先，当我们执行 miles.legs = 2 时，这并没有影响到 spider 和 gwen。所以这一步并不影响我们最终的结果。

当我们执行 spider.legs = gwen.legs * 2 时，我们需要记得分三步来做。

找出左边的线：spider.legs。这就是 spider 变量指向的对象的 legs 属性。
算出右边的值：gwen.legs * 2。为了求出 gwen.legs，我们沿着 gwen 的线来计算。那个对象没有 legs 属性，所以我们继续在它的原型上寻找。我们在那里找到了指向 8 的 legs 属性。所以此刻 gwen.legs 是 8，因此 gwen.legs * 2 就是 16。
将第一步中的电线指向第二步中的值。我们把 spider.legs 指向 16。
最后，我们打印 gwen.legs。

gwen 所指向的对象没有 legs 的属性，所以我们继续在它的原型上进行搜索。我们在那里找到了 legs 属性，指向 16。这就是我们的答案。

a7

题目 8
第二行的代码是个谜。你有两个任务：

画出第二行之后的宇宙；
算出第二行的内容。
这一开始可能有些令人困惑，但是别急。像侦探那样探索，用控制台日志作为案件线索吧。

完成之后，写出 ??? 部分的内容。

let goose = { location: 'heaven' };
let cheese = // ???

// >>> 画出此时的图像 <<<

console.log(cheese === goose); // false
console.log(cheese.location);  // "heaven"

goose.location = 'hell';
console.log(cheese.location); // "hell"
答案：{ __proto__: goose }（最简单的）。

我们来看看如何利用这些线索。因为 cheese === goose 是 false，所以我们知道这些变量指向不同的值。我们也知道 cheese 指向了一个对象，因为我们能够读取到 cheese.location。

后来，我们对 goose.location 进行了突变。然而，我们看到 cheese.location 也因此发生了变化。一种解释可能是，它们指向同一个值。然而，我们之前已经确定了它们必须指向不同的值。

所以我们剩下的最简单的解释就是 goose 指向 cheese 对象的原型。这解释了为什么当我们突变 goose.location 时，我们可以通过 cheese.location 来「看到」它。cheese 指向的对象没有自己的 location 属性，所以对其原型的 location 属性的改变可以通过它来看到。

a8

恭喜完成这些练习！

幕后
People often ask if I’m going to cover more “advanced” topics in Just JavaScript. The problem is I don’t even know what “advanced” means. I know what’s typically considered advanced JS topics but those aren’t any more difficult with this mental model than what we already covered.