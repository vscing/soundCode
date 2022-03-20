# 属性 Properties

来见见闻名遐迩的伦敦神探 Sherlock Holmes（夏洛克·福尔摩斯）：

let sherlock = {
  surname: 'Holmes',
  address: { city: 'London' } 
};
他的好友 John Watson（约翰·华生）最近也搬来一起住了：

let john = {
  surname: 'Watson',
  address: sherlock.address
};
Sherlock 是个天才神探，但却是个麻烦室友。终于有一天，John 受够了。他改姓搬家，去了 Malibu（马里布）：

john.surname = 'Lennon';
john.address.city = 'Malibu';
练习时间到。写出下面几个问题的答案：

console.log(sherlock.surname); // ?
console.log(sherlock.address.city); // ?
console.log(john.surname); // ?
console.log(john.address.city); // ?
在你翻上去重读代码之前，我想要你用一种特别的方式写出答案。打开一个画图软件或者拿出纸笔，用心智模型画出每行所发生的事。如果你不知道怎么表示出来，也没关系。因为我们还没讨论到这些话题，所以尽可能地猜吧。

下面，用你的最终涂鸦，回答上面的四个问题。

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

现在，检查一下你的答案：

console.log(sherlock.surname); // "Holmes"
console.log(sherlock.address.city); // "Malibu"
console.log(john.surname); // "Lennon"
console.log(john.address.city); // "Malibu"
我没有写错——他们确实都住在了 Malibu（马里步）。摆脱 Sherlock 可没这么简单！如果使用了错误的心智模型，有的人可能会推出 sherlock.address.city 是 "London"，但其实不是。

为了找到原因，我们需要学习属性是如何在我们的 JavaScript 宇宙中运转的。

属性（Properties）
我们之前谈过对象（Objects）。比如，这里是一个叫 sherlock 的变量指向一个对象值。我们通过写出 {} 来创建一个新的对象值：

let sherlock = {}
我们的宇宙中，看起来就像是这样：

sherlock_empty
sherlock_empty
然而，对象主要是对群组相关的数据聚合有用。比如，我们可能想把所知道的 Sherlock 的一切都组起来：

let sherlock = {
  surname: 'Holmes',
  age: 64,
};
这里，sherlock 仍然是个变量，但是 surname 和 age 就不是了。他们是属性。不同于变量，属性属于一个特定的对象。

在我们的 JavaScript 宇宙中，变量和属性的行为都像「电线」。然而，属性的电线起始于对象，而不是我们的代码：

sherlock_props
sherlock_props
此处，我们可以看到，变量 sherlock 指向我们所创建的一个对象。该对象有两个属性。属性 surname 指向字符串值 "Holmes"，属性 age 指向数字值 64。

重要的是，属性并不包含值，而是指向值！这意味着我们的宇宙充满了电线。有的起始于我们的代码（变量），有的起始于对象（属性）。而所有的电线都会最终指向值。

在读这篇文章之前，你可能曾想象过值是住在对象「里面」。因为在代码中，他们看上去是在「里面」。而这个直觉常常导致错误，所以取而代之的，我们用「电线」的思维来思考。再看看上面的代码和图像，确保你已经能轻松接受它们，再读下去。

读取属性（Reading a Property）
我们可以通过使用「点符号」来读取一个属性的当前值：

console.log(sherlock.age); // 64
此处，sherlock.age 是我们的老朋友了——表达式，也就是 JavaScript 宇宙中的一个提问。为了回答它，JavaScript 会沿着 shelock 这条电线走：

shelock_readage
shelock_readage
它导向一个对象。从那个对象出发，JavaScript 又沿着 age 属性继续走。

对象的 age 属性指向 64，所以 sherlock.age 的结果是 64。

属性名（Property Names）
属性有名字。一个对象不能有两个重名属性。比如，上面的对象不能有两个属性都叫 age。

属性名都是大小写敏感的！比如，age和 Age 从 JavaScript 的角度来看是两个完全不同的属性。

如果我们事前不知道一个属性的名字，但是在代码中有该属性的字符串值，我们就可以用「方括号符号」[] 来从一个对象中读取该属性：

let sherlock = {
  surname: 'Holmes',
  age: 64
};

let propertyName = prompt('你想了解什么？');
alert(sherlock[propertyName]); // 通过名字读取属性
在你的浏览器控制台试试这段代码，当出现提问时，输入 age 来看看结果。

给属性赋值（Assigning to a Property）
当我们给一个属性赋值会发生什么？

sherlock.age = 65;
让我们把这行代码自 = 处分为左右两边。

首先，我们需要知道左边的电线是哪条：sherlock.age。

我们沿着 sherlock 电线，然后选择属性 age 的电线：

sherlock_reassign_age-1
sherlock_reassign_age-1
注意我们不继续沿着 age 走下去到 64。我们不关心它的当前值是多少。在赋值语句的左边，我们只需要找到电线本身。

记住我们选了哪条电线了吗？继续。

接着，我们需要知道右边的值是多少：65。

不同于左边，赋值语句的右边总是会表达一个值。在本例中，右边的值是数字值 65。让我们召唤这个值：

sherlock_reassign_age-2
sherlock_reassign_age-2
现在我们准备好进行赋值操作了。

最后一步，我们把左边的电线连到右边的值：

sherlock_reassign_age-3
sherlock_reassign_age-3
然后我们就完成了！从现在开始，读取 sherlock.age 会给我们 65。

找不到的属性（Missing Properties）
你可能想知道如果我们读取一个不存在的属性会发生什么：

let sherlock = {
  surname: 'Holmes',
  age: 64
};
console.log(sherlock.boat); // ?
我们知道 sherlock.boat 是个正确的表达式。JavaScript 宇宙会遵循一定的规则试着去找出一个值来回答我们的提问。

规则大致上像这样：

找出点（.）的左侧部分的值。
如果该值是 null 或 undefined，立即抛出一个错误。
检查叫那个名字的属性是否存在于我们的对象中。
若存在，则回答该属性所指向的值。
若不存在，则回答 undefined 值。
注意这里所说的规则是个简化版本，我们在后期的学习中会需要修正。但目前，这些已经足矣告诉我们 JavaScript 如何工作的诸多事实。

比如，sherlock 指向一个对象，而该对象没有 boat 属性。所以 sherlock.boat 会给我们 undefined 作为回答：

let sherlock = {
  surname: 'Holmes',
  age: 64
};
console.log(sherlock.boat); // undefined
注意，这并不意味着我们的对象有 boat 属性指向 undefined！该对象仅仅有两个属性，并且都不叫作 boat：

sherlock_props
sherlock_props
很容易就会把 sherlock.boat 在我们的心智模型中直接对应于「属性」这个概念，但这并不是很正确。它实际上是给 JavaScript 引擎的一个提问，而引擎会遵循着上面所说的规则来回答。

引擎会先看看 sherlock 指向的对象，发现它并不包含 boat 属性，于是就反馈给我们 undefined 这个值。因为这就是规则规定的。计算机服从于规则，在这一点上没什么深层次的理由。

重读上述规则，你能运用到实际中吗？

let sherlock = {
  surname: 'Holmes',
  age: 64
};
console.log(sherlock.boat.name); // ?
运行这段代码后会发生什么？别光猜，看规则。

提示：有两个点（.），所以你需要应用两遍规则。

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

答案是会抛出一个错误。

我们首先需要知道 sherlock.boat 的值。
要想知道该值，我们需要知道 sherlock 的值。
起始于 sherlock 的电线指向一个对象。
因此，sherlock 的值是该对象。
一个对象不是 null ，也不是 undefined，所以我们继续。
该对象并没有 boat 属性。
因此， sherlock.boat 的值是 undefined。
我们在 . 的左边有一个 undefined。
规则说 null 或者 undefined 如果在左边就抛错。
let sherlock = {
  surname: 'Holmes',
  age: 64
};
console.log(sherlock.boat.name); // TypeError!
如果看上去似乎还是有点令人困惑，就再翻上去一步步地看看规则吧。

复习（Recap）
属性是电线，和变量有一点相似。它们都指向值。不同于变量，属性在我们的宇宙中起始于对象。
属性有名字。属性属于一个特定的对象。一个对象中不能含有重名属性。
通常，你可以用三步来进行一个赋值操作：
找出左侧电线是哪条。
找出右侧值是多少。
把该电线连上该值。
一个形如 obj.property 的表达式可以用三步来计算出结果：
找出 . 的左侧值是多少。
若是 null 或 undefined，则抛错。
若该属性存在，则结果是该电线所指向的值。
若该属性不存在，则值是 undefined。
注意，关于属性的心智模型还是有些简化。虽然在之后的几个模块里还是足够用的，但是我们会在未来扩展它的。

如果你被开头的 Sherlock Holmes 的例子所困扰，可以使用我们现在学到的心智模型再回去看看。下期模块将有一个完整的遍历演算，以防你还是不清楚它为什么会那样。努力习惯于把属性看成电线吧。

练习（Exercises）
本期模块同样提供有练习给你！

点击这里用几个小测验来巩固心智模型吧。

小测验见附。

不要跳过！

即使你可能熟悉属性的概念，这些练习也可以帮助你巩固我们正在构建的心智模型。在进入更复杂的主题之前，我们需要这个基础。

小测验 I
画出下面代码运行后的变量和值的示意图。

如果没有笔和纸，可以用 https://www.excalidraw.com 这类在线绘图软件绘画。

let ship = { name : 'Rocinante' };
以下哪一个更符合你的图像呢？

q1
q1
画出下面代码运行后的变量和值的示意图。

如果没有笔和纸，可以用 https://www.excalidraw.com 这类在线绘图软件绘画。

let captain = 'Jim';
let ship = { captain: captain };
captain = 'Naomi';
以下哪一个更符合你的图像呢？

q2
q2
画出下面代码运行后的变量和值的示意图。

如果没有笔和纸，可以用 https://www.excalidraw.com 这类在线绘图软件绘画。

let turner = { name: 'Alex' };
let kamal = { name: 'Alex' };
以下哪一个更符合你的图像呢？

q3
q3
画出下面代码运行后的变量和值的示意图。

如果没有笔和纸，可以用 https://www.excalidraw.com 这类在线绘图软件绘画。

let ice = { taste: undefined };
   let sand = {};
   let answer = ice.taste === sand.taste;
以下哪一个更符合你的图像呢？

q4
q4
画出下面代码运行后的变量和值的示意图。

如果没有笔和纸，可以用 https://www.excalidraw.com 这类在线绘图软件绘画。

let ship = {
  pilot: { name: 'Jim' }
};
以下哪一个更符合你的图像呢？

q5
q5
画出下面代码运行后的变量和值的示意图。

如果没有笔和纸，可以用 https://www.excalidraw.com 这类在线绘图软件绘画。

let singer = { surname: 'Turner' };
let pilot = { surname: 'Kamal' };
singer.surname = pilot.surname;
pilot.surname = singer.surname;
以下哪一个更符合你的图像呢？

q6
q6
画出下面代码运行后的变量和值的示意图。

如果没有笔和纸，可以用 https://www.excalidraw.com 这类在线绘图软件绘画。

let president = {
  name: 'Pooh',
  next: null
};

president.next = {
  name: 'Paddington',
  next: president
}
以下哪一个更符合你的图像呢？

q8
q8
下面代码的运行结果是什么？

let station = {
  Owner: { name: 'Fred' }
};
let name = station.owner.name;
console.log(name === station.Owner.name );
答案 I
答案：图 B 正确。它表示变量 ship 指向了一个对象，该对象的属性 name 指向了一个字符串。

图 A 错误，因为它没有表示出变量 ship 所指向的对象值。

图 C 错误，因为它表示字符串在对象内部。而在我们的心智模型中，属性是电线。

图 D 错误，因为它表示 ship.name 是代码中的变量。然而，它应该是个属性，并且属于一个对象。

q1
q1
答案：图 D 正确。它表示变量 cptain 指向 "Naomi"，同时变量 ship 指向一个对象，该对象的属性 captain 指向 "Jim"。

图 A 和 图 B 错误。因为它们都表示变量 captain 和 属性 captain 都指向了同一个值，然而第三行代码仅仅单独了变量。

图 C 错误。因为它表示属性指向变量，这是不可能的。属性只能指向值。

q2
q2
答案：图 B 正确。它表示变量 turner 和 kamal 都指向两个不同的对象。每个对象都有属性 name 指向同样的值 "Alex"。

图 A 错误。因为它表示字符串值 "Alex" 出现了两次，这并不符合我们的心智模型。在我们的宇宙中，每个不同的字符串都各只有一个值。

图 C 错误。因为它只表示了一个对象值。而每个 {} 对象字面量都会创建一个不同的对象值。所以我们应该有两个对象。

图 D 错误。因为它根本没有表示出对象。

q3
q3
答案：图 A 正确。它表示变量 sand 指向一个空对象，变量 ice 指向一个对象，该对象有个 taste 属性指向 undefined 值，answer 指向 true。

这里，ice.taste 是 undefined，因为 ice.taste 指向 undefined 值。

而 sand.taste 同样也是 undefined，因为规则说了，如果属性不存在，属性表达式的值就是 undefined。并且确实，sand 所指向的对象并没有 taste 属性。

=== 的两侧都是 undefined。我们的宇宙中又只有一个 undefined 值，所以它俩一定相等，于是答案是 true。

q4
q4
答案：图 B 正确。它表示变量 ship 指向一个对象，该对象的属性 pilot 指向另一个对象，这个对象的属性 name 指向 "Jim"。

图 A 错误。因为它仅仅表示了一个对象。但是我们有两个 {} 对象字面量，因此，应该有两个不同的对象。

图 C 错误。因为它表示一个对象在另一个对象之内。但是，对象嵌套在我们的心智模型中说不通——对象应该一直是电线。

图 D 错误。因为它没有表示出任何对象。

q5
q5
答案：图 D 正确。它表示变量 singer 和 pilot 指向两个不同的对象。每个对象都有一个 surname 属性指向着同一个值 "Kamal"。

如果你的答案不同，你可能要么忘了逐步解决网体，要么忘了读写对象是如何进行的。

要执行 singer.surname = pilot.surname，我们需要找到 singer.surname 的电线，再把它指向 pilot.surname 当前所指向的那个值（也就是 "Kamal"）。现在它们二者都指向 "Kamal"。

接着，当我们执行 "pilot.surname = singer.surname" 时，我们找到 pilot.surname 的电线，再把它指向 singer.surname 当前所指向的那个值（由于上一步，所以是 "Kamal"）。所以它们二者都将指向 "Kamal"。

q6
q6
答案：图 A 正确。它表示变量 president 指向一个对象，该的属性 name 指向 "Pooh"，属性 next 指向另一个对象。第二个变量的属性 name 指向 "Paddington"，并且也有一个属性 next，该属性指回第一个对象！

如果你的答案不同，你可能要么忘了逐步解决网体，要么忘了读写对象是如何进行的。

要执行 president.next = { ... }，我们把第一个对象的属性 next 的电线指向我们创建的第二个对象。

在第二个对象字面量的内部，next: president 表示刚刚创建的新对象的属性 next 应该指向变量 president 的当前值，也就是我们的第一个对象。

这就是为什么第一个和第二个对象的属性 next 互相指向，形成了一个循环。如果你愿意，在控制台运行一下这个例子，并且试试多次展开属性 next 看看！

q8-a
q8-a
答案：该代码会抛错。

当我们执行 let name = station.owner.name 时，我们想把 name 的电线指向 station.owner.name 的结果。

要想计算 station.owner.name，我们先得知道 station.owner。station 所指向的对象没有叫 owner 的属性。（虽然它有一个叫 Owner 的属性，但记住属性名是大小写敏感的。）所以，根据规则，station.owner 是 undefined。

但如果 station.owner 是 undefined，那么就不应该出现在 . 的左侧。计算 station.owner.name 会导致错误，代码会停止运行。

如果感到困惑，再回顾一下「找不到的属性」那一节。

q11
q11
小测验 II
你能用三行代码来交换这两个对象的 surname 的值吗？

let singer = { surname: 'Turner' };
let pilot = { surname: 'Kamal' };
// ??? line 1 ???
// ??? line 2 ???
// ??? line 3 ???
console.log(singer.surname); // "Kamal"
console.log(pilot.surname); // "Turner"
用该图像回答这个问题：

console.log(president.next.next.next.name);
q9
q9
写出表示这个图像的代码：

q10
q10
答案 II
答案：见下面的参考答案。

我们的问题是我们不能仅用一行代码就将两条电线指向不同值。我们只能一次更改其中一个指向的位置。

但是，我们可以引入一个变量来「保留」这些其中一条电线的值。然后，我们可以更改该电线指向的位置，而无需「忘记」另一条电线需要指向的位置。

这类似于为了交换手中的两件东西，你可以将第一件东西交给您的朋友拿住，将第二件东西放在第一只手中，然后再从你的朋友那里拿回第一件东西。

如果你仍然感到困惑，则可以逐步画画这个参考答案。

let singer = { surname: 'Turner' };
let pilot = { surname: 'Kamal' };
let savedSingerSurname = singer.surname;
singer.surname = pilot.surname;
pilot.surname = savedSingerSurname;
console.log(singer.surname); // "Kamal"
console.log(pilot.surname); // "Turner"
答案："Paddington"。

记得沿着电线哦！

答案：见下面的参考答案。

注意，let president = { next: president } 是行不通的。

赋值三步走：一找左边电线，二找右边的值，三把电线指向值。

在我们创建 { next: president } 对象的时候，我们还没有把变量 president 指向任何地方，所以我们还不能使用它！

所以，取而代之的，我们先创建对象，再把它赋予给变量 president。接着，我们把属性 next 的电线从那个对象出发指回到它自己。

对于我们来说是好消息，但对于民主来说是坏消息。

要检查你的答案的话，把它粘贴到控制台里，然后展开属性 next。你应该可以无限展开下去。

let president = { name: 'Pooh' };
president.next = president;
