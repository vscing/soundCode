# 突变 Mutation

在上期的《属性》模块，我们说到 Sherlock Holmes 也搬到了 Malibu（马里步），但还没有解释这个谜团。

打开一个绘图软件，或者拿出纸笔。这次，我们一起逐步画图，以便你检查自己的心智模型。

即便你之前已经画过了，再来一次也不吃亏！

分步画图
步骤一：声明 sherlock 变量
我们从变量声明开始：

let sherlock = {
  surname: 'Holmes',
  address: { city: 'London' }
};
先画这个图。

你的图最后应该长这样：

Step 2
Step 2
这里是一个 sherlock 变量指向一个对象。该对象有两个属性：一个是 surname，指向 "Holmes" 字符串值；一个是 address，指向另一个对象。这另一个对象只有一个属性，叫 city，指向 "London" 字符串值。

再详细看看我的绘图过程：

Step 1 Animation
Step 1 Animation
你的过程也相似吗？

不存在嵌套的对象（No Nested Objects）
注意，我们这里不是只有一个对象，而是有两个完全分离的对象。因为两对花括号就表示两个对象。

对象在代码中可能看上去是「嵌套」的，但在我们的宇宙中，每个对象是完全分离的。一个对象是不能在另一个对象「内部」的。

如果你仍觉得对象是嵌套的，请试着摒弃这个观念。

步骤二：声明 john 变量
这一步，我们声明另一个变量：

let john = {
  surname: 'Watson',
  address: sherlock.address
};
编辑你刚才画的图来反映出这些变化。

你在图上添加几笔之后，图应该长这样：

Step 2
Step 2
现在多出来一个 john 变量，指向一个对象。该对象有两个属性：属性 address 指向 sherlock.address 所指向的对象；属性 surname 指向 "Watson" 字符串。

看看我的详细绘图过程：

Step 2
Step 2
与你的一样吗？

属性总是指向值（Properties Always Point at Values）
当你看到 address: sherlock.address 时，很容易认为 john.address 指向 sherlock.address。

这是错误的。

记住：一个属性永远只能指向一个值！它不能指向另一个属性或变量。总之，我们宇宙中的所有电线都指向值。

Properties always point at values
Properties always point at values
当我们看到 address: sherlock.address 时，我们必须了解 sherlock.address 指向的值，然后把 john.address 属性指向那个值。重要的是值本身，而不是我们如何找到这个值（sherlock.address）。

最终，现在有两个不同的对象，二者的 address 属性都指向了同个对象。你能在图中找出这个对象吗？

步骤三：改变属性
John 有了认知危机，并且厌倦了伦敦的毛毛雨。他决定改姓搬家：

john.surname = 'Lennon';
john.address.city = 'Malibu';
我们如何更改图像以反映这个变化呢？

你的图像应该长这样：

Step 3
Step 3
变量 john 所指向的对象的 surname 属性现在指向了 "Lennon" 字符串值。更有意思的是，john 和 sherlock 的 address 属性所指向的相同对象现在有了一个不同的 city 属性值，即 "Malibu" 字符串。

二人都来到了 Malibu（马里步）：

console.log(sherlock.surname); // "Holmes"
console.log(sherlock.address.city); // "Malibu"
console.log(john.surname); // "Lennon"
console.log(john.address.city); // "Malibu"
这是我的绘图过程：

Step 3
Step 3
我们找到电线，再找到值，最后把电线指向值。

结果现在应该说得通了，但是这个例子在深层次还是令人困惑。代码错在哪里？我们要怎么修复代码才能让 John 独自搬去 Malibu？为了说通这个，我们需要谈谈突变（mutation）。

突变（Mutation）
突变是个解释「改变」的好方式。

比如，我们可以说我们改变了一个对象的属性，或者也可以说我们突变了那个对象（和它的属性）。二者意思相同。

人们喜欢说「突变」，是因为这个词有一种阴险邪恶的意味。它也提醒着你多加谨慎。但这也并不表示突变就是「坏事」（我们只是在编程啊！），但是你需要对此十分小心。

译者按：

突变（Mutation）在大多数语境下是个生物学词汇，即基因突变（细胞中的遗传基因发生的改变）。「突变」的「突」字主要是为了强调基因变异的「突然性」、「非预期性」，同时也造出了一个与「mutation」相对应的专门的中文词汇，并与广义的变异（variation）作区分。总之，生物学中，突变引起 DNA 状态的改变。

在像 JS 这样的编程语言中，也有「mutation」这种说法，可以说是个借喻。但它其实没有「突然性」、「非预期性」这些特点，所以「突」字在这里显得有些奇怪而误导。编程中的突变通常是人为操作主动导致的变化，只不过很容易由于大意疏忽而没有注意到某些潜在影响。但因为英文中是同个词汇、同个概念，所以这个翻译还是被保留了下来。我们还是意会一下，或者把它当成是一个专业词汇吧。总之，JS 中，突变引起对象状态的改变。

让我们回忆一下原先的任务：我们想给 John 一个不同的姓，然后把他搬到 Malibu。现在看看我们的两个突变：

// 步骤三：改变属性
john.surname = 'Lennon';
john.address.city = 'Malibu';
哪个对象在这里被突变了？

第一行突变的是 john 指向的对象，具体地，是该对象的 surname 属性。这没有问题，与我们的目的相符。

然而第二行做的事情十分不同。它突变的不是 john 指向的对象，而是通过 john.address 抵达的那个对象。如果我们看图像，就会发现那也是我们通过 sherlock.address 抵达的对象。

通过突变程序中其他地方也用到的一个对象，我们弄得一团糟。

可行的解决方案：突变另一个对象（Possible Solution: Mutating Another Object）
一种修复方式是避免突变共享的数据：

// 把步骤三替换成：
john.surname = 'Lennon';
john.address = { city: 'Malibu' };
注意第二行的不同。

我们之前有 john.address.city = 'Malibu'，电线的左侧是 john.address.city。我们当时突变的是 john.address 所指向的对象的 city 属性。但是同样的对象也被 sherlock.address 所指向。结果就是，我们无意识中突变了共享的数据。

而 john.address = { city: 'Malibu' } 的左侧是 john.address，我们突变的是 john 指向的对象的 address 属性。换句话说，我们仅仅突变的是包含 John 的数据的对象。这就是为什么 sherlock.address.city 仍保持不变。

Avoiding mutating shared data
Avoiding mutating shared data
如你所见，看上去相似的代码会导致非常不同的结果。要始终关注赋值语句的左侧是哪根电线！

另一种解决方案：不使用对象突变（Alternative Solution: No Object Mutation）
// // 把步骤三替换成：
john = {
  surname: 'Lennon',
  address: { city: 'Malibu' }
};
此处，我们完全不突变 John 的对象，而是重新赋值 john 变量，让它指向一个全新版本的 John 数据。从现在开始，john 指向一个不同的对象，它的 address 也会指向一个全新的对象：

Solution without object mutation
Solution without object mutation
你可能注意到，现在图像中有一个「遗弃的」旧版本的 John 对象。我们无须担心它。如果没有电线指向它的话，JavaScript 最终会自动将其从内存中移除。

注意这两种方案都满足我们的要求：

console.log(sherlock.surname); // "Sherlock"
console.log(sherlock.address.city); // "London"
console.log(john.surname); // "Lennon"
console.log(john.address.city); // "Malibu"
对比它们的图像。你对二者有个人偏好吗？在你看来，它们的优点和缺点又分别是什么？

向 Sherlock 学习（Learn from Sherlock）
Sherlock Holmes 曾经说过：「排除一切不可能的，剩下的即使再不可能，那也是真相。」（“When you have eliminated the impossible, whatever remains, however improbable, must be the truth.”）

当你的心智模型变得更加完善，你会发现 debug 程序变得容易了，因为你知道应该找寻什么样的可能原因。

比如，假设你的代码运行之后，sherlock.address.city 改变了，我们图像的电线会暗示三种解释：

Possible explanations
Possible explanations
可能 sherlock 变量被重新赋值了。
可能我们通过 sherlock 抵达的对象被突变了，它的 address 属性被设置成其他东西了。
可能我们通过 sherlock.address 抵达的对象被突变了，它的 city 属性呗设置成其他东西了。
你的心智模型给了你调查 bugs 的一个起始点。这也可以反其道而行之。有时，你可以分辨出一段代码并不是问题根源，因为心智模型可以证明！

比如，如果我们把 john 变量指向一个不同的对象，我们可以确信 sherlock.address.city 不会改变。因为我们的图像表明改变 john 电线不会影响从 sherlcok 出发的任何链条：

A variable wire cannot affect objects
A variable wire cannot affect objects
尽管如此，请记住，除非你是福尔摩斯，否则你很少能对某事充满信心。这种福尔摩斯的方法再好也只是跟你的心智模型一样好！心智模型可以帮助你提出理论，但你仍需要设计实验来用 console.log 或调试器（debugger）来确认。

译者按：

这里作者给的链接内容是福尔摩斯谬论（Holmesian fallacy）的解释。

福尔摩斯说过：「排除一切不可能的，剩下的即使再不可能，那也是真相。」但是要运用这种方法，必须找到所有的解释，并逐一排除。然而，由此得出的逻辑上的结论是错误的，因为这两个步骤都需要全知全能：

需要找到每一种可能的解释。
除了那个不可反驳的正确解释之外，剩下的每一种可能的解释都需要被正确地反驳。
显然易见，这是很难做到的。因为这需要对某种情况下所有知识的了解，并且这可能导致人们最终做出不可能的可笑解释。从本质上说，这套推理的一大缺陷就是可能有你根本没有想到的解释。

Let 和 Const（Let vs Const）
值得注意的是，你可以用 const 关键词来替代 let：

const shrek = { species: 'ogre' };
const 关键词可以让你创建一个只读变量（read-only variable），也叫常量（constant）。一旦我们声明了一个常量，我们就无法将它指向另一个值：

shrek = fiona; // TypeError
但有一个关键的细枝末节——我们仍可以突变用 const 声明的变量所指向的对象：

shrek.species = 'human';
console.log(shrek.species); // 'human'
Constant variable
Constant variable
这个例子里，只有 shrek 变量电线本身是只读的（const）。它指向的那个对象，以及其属性，都是可以突变的！

const 的无用性是个激烈争论的话题。有些人倾向于完全禁止 let 而总是使用 const。另一些人可能会说，应该信任程序员，让他们重新赋值自己的变量。不管你的偏好是什么，请记住，const 只能防止变量重赋，而不能防止对象突变。

译者按：

关于 const vs let，一直以来都有辩论。作者之前也发过推特说 TC39 成员觉得 const 是个错误发明，引起很大争论。随后作者又发了一篇《On let vs const》博文详细阐述了 prefer-const 和 not prefer-const 两方的辩论论据。最后他的观点是不要在乎这个，遵循已有的编码风格，并且利用 linter 工具帮你转换二者。不要在这上面过于伤脑筋。

总之，在这里需要注意的就是，const 只能防止变量重赋，而不能防止对象突变。

突变是坏事吗？（Is Mutation Bad?）
我想确保你不是带着「变异是坏事」这种想法一走了之的。因为这是一种懒惰的过度简化，掩盖了真正的理解。如果数据会随着时间的推移而改变，突变就会在某处发生。问题是何物何时何地发生突变。这也是很多人争论的话题。

突变是一种「幽灵般的超距作用」。改变 john.address.city导致 console.log(sherlock.address.city) 打印了其他东西。

译者按：

这里有一个我觉得挺有趣的「掉书袋」的比喻，「幽灵般的超距作用」（spooky action at a distance）——出自 1935 年的爱因斯坦-波多尔斯基-罗森吊诡（Einstein-Podolsky-Rosen paradox），是一篇针对量子力学的哥本哈根诠释而提出的早期重要批评的论文。其中，爱因斯坦认为量子纠缠理论不够完整，有所缺失，「幽灵般的超距作用」并不存在。

所谓量子纠缠，即对于两个彼此相互作用后的粒子分别测量其物理性质，像位置、动量、自旋、偏振等，则会发现量子关联现象，尽管两个粒子相隔甚远。这里，指的就是对 JS 中的一个对象进行突变会影响另一个对象，感觉就像是「对象纠缠」……

你突变一个对象的时候，一些变量和属性可能正指向该对象。你的突变会在之后影响「沿着」这些的电线的所有代码。

这既是一种庇佑，也是一种诅咒。突变让我们能很容易地改变一些数据，并立即「看到」整个程序的变化。然而，无纪律的突变让人更难预测程序会做什么。

有一种学派认为，突变最好被控制在你的程序的一个非常狭窄的层面上。缺点是，你很可能会写更多的模板代码来 「传递东西」。但这种哲学的好处是，你程序的行为将变得更可预测。

值得注意的是，突变刚刚创建的对象总是没问题的，因为现在还没有其他的电线指向它们。在其他情况下，我建议你对你要突变什么，以及何时突变，要非常有目的性。你对突变的依赖程度取决于你的 APP 的架构。

复习
在我们的宇宙中，对象从来不是「嵌套」的。
需要格外注意赋值语句的左侧是哪根电线。
改变一个对象的属性也被叫做突变该对象。
如果你突变了一个对象，你的代码能「看到」所有指向那个对象的电线的变化。有时，这可能就是你的目的。然而，不慎突变共享数据可能导致 bug。
突变你刚刚创建的对象是安全的。大体上，你会使用多少突变取决于你的 APP 的架构。但即使你不会经常使用突变，也值得你花时间去了解它的工作原理。
你可以用 const 来声明一个变量，作为 let 的替代。这样你就可以强制让这个变量的电线始终指向同一个值。但是要记住，const 并不能防止对象突变！
练习（Exercises）
本期模块同样提供有练习给你！

点击这里用几个小测验来巩固心智模型吧。

小测验见附。

不要跳过！

即使你可能熟悉突变的概念，这些练习也可以帮助你巩固我们正在构建的心智模型。在进入更复杂的主题之前，我们需要这个基础。

小测验 I
现在你的心智模型已经比较完善了，我们会稍微增加一些难度。大多数练习不会包含预设的选项，所以你需要自己画图。你还是会在每道题后看到答案。

祝你好运！

首先，画出下面代码运行后的变量和值的示意图。然后，根据图像来推算出最后一行代码会打印出什么。如果错误，请写「错误」。

如果没有笔和纸，可以用 https://www.excalidraw.com 这类在线绘图软件绘画。

const spreadsheet = { title: 'Sales' };
const copy = spreadsheet;
copy.title = copy.title + ' (Copy)';

console.log(spreadsheet.title); // ???
首先，画出下面代码运行后的变量和值的示意图。然后，根据图像来推算出最后一行代码会打印出什么。

let batman = {
  address: { city: 'Gotham' }
};
let robin = {
  address: batman.address
};
batman.address = { city: 'Ibiza' };

console.log(robin.address.city); // ???
首先，画出下面代码运行后的变量和值的示意图。然后，根据图像来推算出最后一行代码会打印出什么。

let chip = {
  address: { city: 'Disneyland' }
};
let dale = {
  address: {
    city: chip.address.city
  }
};
chip.address = { city: 'Tokyo' };

console.log(dale.address.city); // ???
目前为止，我们画的都是代码运行之后的图。想象一下，你是一名侦探，到了犯罪现场，现在要还原出代码运行之前的图！

// ???
console.log(music.taste); // 'classical'
onion.taste = 'unami';
console.log(music.taste); // 'unami'
以下哪一个更符合你的图像呢？

Q4
Q4
让我们再回到常规题。

首先，画出下面代码运行后的变量和值的示意图。然后，根据图像来推算出最后一行代码会打印出什么。

let ilana = {
  address: { city: 'New York' }
};
let place = ilana.address;
place = { city: 'Boulder' };
let abbi = {
  address: place,
};

console.log(ilana.address.city); // ???
首先，画出下面代码运行后的变量和值的示意图。然后，根据图像来推算出最后一行代码会打印出什么。

let rick = {
  address: { city: 'C-137' }
};
let morty = {
  address: rick.address
};
rick.address = { city: '35C' };

console.log(morty.address.city); // ???
首先，画出下面代码运行后的变量和值的示意图。然后，根据图像来推算出最后一行代码会打印出什么。

let daria = {
  address: { city: 'Lawndale' }
};
let place = daria.address;
place.city = 'L.A.';
let jane = {
  address: place,
};

console.log(daria.address.city); // ???
现在我们休息一下，再来预测图像。想象一下，你是一名侦探，到了犯罪现场，现在要还原出代码运行之前的图！

// ???
console.log(burger.beef); // 'veggie'
burger = rapper;
console.log(burger.beef); // 'legit'
以下哪一个更符合你的图像呢？

Q8
Q8
现在我们再回来做几道预测未来的题。可能看起来有些重复，但其中也有重要的变化，所以要注意了！

首先，画出下面代码运行后的变量和值的示意图。然后，根据图像来推算出最后一行代码会打印出什么。

let walter = {
  address: { city: 'Albuquerque' }
};
let gustavo = {
  address: walter.address,
};
walter = {
  address: { city: 'Crawford' }
};

console.log(gustavo.address.city); // ???
进展很好！最后两题！

首先，画出下面代码运行后的变量和值的示意图。然后，根据图像来推算出最后一行代码会打印出什么。

let dipper = {
  address: {
    city: { name: 'Gravity Falls' }
  }
};

let mabel = {
  address: dipper.address
};

dipper.address.city = {
  name: 'Land of Ooo'
};

console.log(mabel.address.city.name); // ???
最后一题！就像 Sherlock 一样，你是一名 JavaScript 咨询侦探。JavaScript 警察来找你寻求帮助。他们有三种理论来解释这段代码运行前的宇宙是什么样子的。

其中两个理论合理，而另一个可能错误。选出可能错误的那种理论。同样解释一下为什么。

// ???
console.log(charlotte.mother.age); // 20
console.log(charlotte.child.age); // 20

charlotte.mother.age = 21;

console.log(charlotte.mother.age); // 21
console.log(charlotte.child.age); // 21
Q11
Q11
答案 I
答案：最后一行会打印 "Sales (Copy)"。

我们有两个变量指向同一个对象：spreadsheet 和 copy。我们对该对象的 title 属性进行了突变。因此，spreadsheet.title 和 copy.title 都会给我们更新的值。

注意，虽然我们用 const 声明了这两个变量，但突变它们指向的对象并不会导致错误。const 只防止了变量的重新赋值，而没能防止对象突变！

Q1
Q1
答案：最后一行会打印 "Gotham"。

当我们声明 robin 时，我们把它的 address 属性指向了声明时的 batman.address 的值，即一个 city 属性为 "Gotham" 的对象。

从那之后，我们没有重新赋值过 robin 变量，也没有突变过 robin.address 所抵达的对象。所以robin.address.city 到最后仍然是 "Gotham"。

如果你有困难的话，记得在画图的时候一步一步地读每一行代码。

Q2
Q2
答案：最后一行会打印 "Disneyland"。

我们在声明 dale 时，将 dale.address.city 指向 "Disneyland"，因为当时 chip.address.city 的值就是这个值。

后来我们通过改变 chip 对象的 address 属性对 chip 对象进行了突变，但是dale.address.city 链中的任何一条电线都没有受到这个变化的影响。

所以 dale.address.city 仍然是 "Disneyland"。

注意：你可能还会有第二个「废弃」对象指向 "Disneyland"。因为没有办法顺着电线抵达它，所以我们在图中省略了它。

Q3
Q3
答案：图 B 正确。

图 A 错误，因为它表示 music 和 onion 指向不同的对象。然而，我们知道它们一定是指向同一个对象的，因为突变的 music.taste 影响了 onion.taste。

Q4
Q4
答案：最后一行会打印 "New York"。

在这个例子中，没有任何对象被突变，ilana 变量也没有被重新赋值。所以 ilana.address.city 在整段代码中保持不变，即其原始值 "New York"。

Q5
Q5
答案：最后一行会打印 "C-137"。

在这个例子中，morty.address 最初指向的对象与 rick.address 指向的对象相同。该对象的 city 属性指向 "C-137"。

之后，我们对 rick 所指向的对象进行了突变，并改变了它的 city 属性。但是，这个对象并不是 morti.address.city 链的一部分，所以 morti.address.city 仍然给了我们初始值 "C-137"。

Q6
Q6
答案：最后一行会打印 "L.A."。

我们将 place 变量初始化为 daria.address 已经指向的那个对象。然后，我们通过将其 city 属性设置为 'L.A.' 来突变该对象。最终，daria.address.city 给我们 'L. A.'。

Q7
Q7
答案：图 A 正确。

图 B 错误，因为它表示 burger 和 rapper 在代码运行前指向同一个对象。但是，如果是这样的话，那么赋值 burger = rapper 也不会有任何作用。我们知道，在变量重新赋值后，burger.befor 已经发生了变化。因此，这些变量一开始一定是指向不同的对象。

Q8
Q8
答案：最后一行会打印 "Albuquerque"。

我们将 gustavo.address 初始化为指向与 walter.address 相同的对象，即 { city: 'Albuquerque' }。

然后我们改变了 walter 变量的指向。但是，这并不影响 gustavo 变量，也不是对象的突变，所以gustavo.address.city 仍然是 'Albuquerque'。

Q9
Q9
答案：最后一行会打印 "Land of Ooo"。

当我们声明 mabel 时，我们把 mabel.address 指向了 dipper.address 所指向的对象。

然后，我们对该对象进行了突变——将其城市属性设置为 { name: 'Land of Ooo' }。

所以当我们读取 mabel.address.city.name 时，它给出了这个对象的 name 属性值，也就是 'Land of Ooo'。

Q10
Q10
答案：图 B 可能错误。

我们改变了 charlotte.mother.age，并在 charlotte.child.age 中看到了这个变化。最可能的解释是 charlotte.mother 和 charlotte.child 指向同一个对象。

图 A 和图 C 都有 charlotte.mother 和 charlotte.child 指向同一个对象，但图 B 显示它们指向不同的对象。所以图 B 可能是错误的。

请记住，我们的理论也只是基于我们的心智模型。图 B 也不是不可能是正确的，但我们还没有涉及到可能发生这种情况的相对不常见的情况。

Q11
Q11
恭喜完成这些练习！