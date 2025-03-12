# 说说 JavaScript 中的数据类型？存储上的差别？

1.JavaScript 分为两种类型，一种是基本数据类型，另一种是引用数据类型
基本数据类型有：
number，string，boolean，null，symbol，undefined，bigInt
引用数据类型有：
object,function,array, 2.基本数据类型存储在栈内存里，引用数据类型存储在堆里，每个堆内存都有对应的引用地址放在栈中

# 说说你了解的 JS 的数据结构

JS 的数据结构有，数组，栈队列，字典，列表，树，图，堆

# DOM 常见的操作有哪些？

主要有增，删，改，查，添,获
增：创建节点，document.createElement()
删：删除节点，removeChild()
改：修改节点，setAttribute()
查：查找节点，getElementById()
获：获取节点，querySelector()

# 说说你对 BOM 的理解，常见的 BOM 对象你了解哪些？

BOM 是浏览器对象模型，把浏览器当作一个对象来看待，顶级对象是 window
BOM 还有 location 对象，navigator 对象，screen 对象，history 对象
DOM 是文档对象模型，把文档当作一个对象，顶级对象是 document

# ==和===的区别，分别在什么情况使用？

==是判断值是否相等，它可能会对值进行隐式转换
注意： NaN==NaN 是 false null==underfined 是 true
===是判断两个值是否全等，它不会对值进行隐式转换，要数据类型一样，数据值一样

# typeof 与 instanceof 的区别?

typeof 是判断数据类型
instanceof 是判断对象是不是某个类型的实例，会顺着原型链上一直找，直到找到为止

# JS 原型，原型链？有什么特点？

每个对象拥有一个原型对象，当访问一个对象的属性时候，它不仅仅在该对象上寻找，还会在该对象的原型对象上找，直到找到为止，这就是原型链
一切对象都是继承自 Object 对象，Object 对象直接继承根源对象 null
一切的函数对象都是继承自 Function 对象
Object 对象直接继承自 Function 对象
Function 对象的**propto**会指向自己的原型对象，最终还是继承自 Object 对象

# 说说你对作用域链的理解？

作用域，即变量和函数生效的区域或集合
作用域链，即当查找变量的时候，会先从当前作用域查找，如果没有找到，就会从上层作用域查找，直到找到全局作用域，如果全局作用域中也没有找到，就会报错。

# 谈谈 this 对象的理解

- this 指向
  在绝大多数情况下，函数的调用方式决定了 this 的值（运行时绑定）
  this 关键字是函数运行时，自动生成的一个内部对象，只能在函数内部使用，总是指向调用它的对象。同时，this 的在函数执行过程中，this 一旦被确定了，就不可以再更改
- 绑定规则： 1.默认绑定 2.隐式绑定 3.显示绑定 4.new 绑定
  new 绑定>显示绑定>隐式绑定>默认绑定

# 说说 new 操作符具体干了什么？

创建一个新的对象 obj
将对象与构造函数通过原型链连接起来
将构造函数中的 this 绑定到新建的对象 obj 上
根据构造函数的返回类型作判断，如果是原始值则忽略，如果是返回对象，需要正常处理

```js
function myNew(func, ...args) {
  const obj = {};
  obj.__proto__ = func.protoype;
  let result = func.apply(obj, args);
  return resukt instanceof Object ? result : obj;
}
```

# bind,call,apply 区别？如何实现一个 bind？

- 作用：
  call，apply，bind 作用是改变函数执行时的上下文，也就是说改变函数运行时的 this 指向
- 区别：
  apply 接受两个参数，第一个参数就是 this 的指向，第二个参数是函数接受的参数，以数组的形式传入，改变 this 指向后原函数会立即执行，且此方法只是临时改变 this 指向一次
  call 方法的第一个参数也是 this 的指向，后面传入的是一个参数列表跟 apply 一样，改变 this 指向后原函数会立即执行，且此方法只是临时改变 this 指向一次
  bind 方法和 call 相似，第一个参数也是 this 指向，后面传入的也是一个参数列表（但是这个参数列表可以分多次传入）改变 this 的指向后不会立即指向，而是返回一个永久改变 this 指向的函数

```js
function.prototype,myBind=function(context){
    if(typeof this !=='function'){
        throw new TypeError("Error")
    }
    const args=[...arguments].slice(1),
    fn=this;
    return function Fn(){
        return fn.apply(this.instanceof Fn? new fn(...arguments):context,args.concat(...arguments))
    }
}
```

# JS 中执行上下文和执行栈是什么？

- 执行上下文：
  全局执行上下文：只有一个浏览器中的全局对象就是 window 对象，this 指向这个全局对象
  函数执行上下文：存在无数个，只有函数被调用的时候才会被创建，每次调用函数都会创建一个新的执行上下文
  Eval 函数执行上下文：运行在 eval 函数中的代码，很少用且不建议使用
- 生命周期：创建阶段->执行阶段->回收阶段
  创建阶段：确定 this 的值，词法环境组件被创建，变量环境组件被创建
  执行阶段：执行变量赋值，代码执行。如果 JS 引擎在源代码中声明的实际位置找不到变量的值，那么将为其分配 undefined 值
  回收阶段：执行上下文出栈等待虚拟机回收执行上下文
- 执行栈（调用栈）：
  用于存储在代码执行期间创建的所有执行上下文

# 说说 JS 中的事件模型

- 事件与事件流
  事件：用户或浏览器自身执行某种操作，如点击，滚动，加载等
  事件流：描述的是从页面中接收事件的顺序
  事件流都会经历三给阶段：事件捕获阶段，处于目标阶段，事件冒泡阶段
  事件冒泡是一种从下往上的传播方式，由最具体的元素（触发节点）然后逐渐向上传播到最不具体的那个节点，也就是 DOM 中最高层的父节点
  事件捕获与事件冒泡相反，事件最开始由不太具体的节点最早接受事件，而最具体的节点（触发节点）最后接受事件
- 事件模型
  事件模型可以分为三种：
  - 原始事件模型（DOM0 级）
    - HTML 代码中直接绑定
    - 通过 JS 代码绑定
    - 特性：
      1. 绑定速度快
      2. 只支持冒泡，不支持捕获。
      3. 同一个类型的事件只能绑定一次
  - 标准事件模型（DOM2 级）
    - 过程
      1. 事件捕获阶段：事件从 document 一直向下传播到目标元素，依次检查经过的节点是否绑定了事件，监听函数，如果有则执行
      2. 事件处理阶段：事件到达目标元素，触发目标元素的监听函数
      3. 事件冒泡阶段：事件从目标元素冒泡到 document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行
    - 特性
      可以在一个 DOM 元素上绑定多个事件处理器，各自并不会冲突
  - IE 事件模型（基本不用）

# 解释下什么是事件代理？应用场景？

事件代理：把一个元素响应事件的函数（click，mousedown，moseup，keydown，keyup，keypress）委托到另一个元素
应用场景：如果用户能够随时动态的增加或者去除列表元素，那么每一次改变的时候都需要重新给新增的元素绑定事件，给即将删除的元素解绑事件，这样会导致性能问题，所以我们可以使用事件代理的方式来解决这个问题

# 说说你对闭包的理解？闭包的使用场景

闭包：一个函数和对其周围状态的应用捆绑在一起，也就是说在一个内层函数中访问其外层函数的作用域
使用场景：创建私有变量，延长变量的生命周期
缺点：常驻内存，会增大内存的使用量，使用不当会造成内存泄漏

# 说说 JS 中的类型转换机制

显示转化，可以清楚的看到发生类型转化，如：Number()，String()
隐式转化，比较运算，算术运算时会发送

# 深拷贝浅拷贝的区别？如何实现一个深拷贝？

浅拷贝，指创建新的数据，这个数据有着原始数据属性的值一份精准拷贝。如果属性是基本类型，拷贝的就是基本类型的值。如果属性是应用类型，拷贝的就是内存地址。即浅拷贝是拷贝一层，深层次的引用类型则是共享内存地址。
在 JS 中，存在浅拷贝的现象有：
1.Object.assign()
2.Array.prototype.slice()
3.Array.prototype.concat() 4.展开运算符... 5.自定义函数

```js
//Object.assign()方法实现浅拷贝
var obj={
  age:18,
  nature:['smart','good'],
  names{
    name1:'张三',
    name2:'李四'
  },
  love:function(){
    console.log('我是一个人')
  }
}
var newObj=Object.assign({},obj)
```

```js
//Array.prototype.slice()方法实现浅拷贝
const fxArr = ["one", "two", "three"];
const newArr = fxArr.slice(0);
newArr[1] = "love";
console.log(fxArr); //['one','two','three']
console.log(newArr); //['one','love','three']
```

```js
//Array.prototype.concat()方法实现浅拷贝
const fxArr = ["one", "two", "three"];
const newArr = fxArr.concat(0);
newArr[1] = "love";
console.log(fxArr); //['one','two','three']
console.log(newArr); //['one','love','three']
```

```js
//展开运算符实现浅拷贝
const fxArr = ["one", "two", "three"];
const newArr = [...fxArr];
newArr[1] = "love";
console.log(fxArr); //['one','two','three']
console.log(newArr); //['one','love','three']
```

```js
//自定义函数实现浅拷贝
function shallowCopy(obj) {
  const newObj = {};
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      newObj[prop] = obj[prop];
    }
  }
  return newObj;
}
```

深拷贝，指开辟一个新的栈，两个对象属性完成相同，但是两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性。
深拷贝的方法有：
1.JSON.parse(JSON.stringify()) 2.递归 3.使用 loadsh 库

```js
//JSON.parse(JSON.stringify())方法实现深拷贝
//存在弊端，会忽略underfined,symbol,function
const newObj=JSON.parse(JSON.stringify(obj))
//递归实现深拷贝
function deepClone(obj,hash=new WeakMap()){
  if(obj===null) reutrn obj   //如果是null或者undefined就不行拷贝
  if(obj instanceof Date) return new Date(obj)
  if(obj instanceof RegExp)  return new RegExp(obj)
  //可能是对象或者普通的值 如果是函数的话是不需要深拷贝
  if(typeof obj!=='Object') return obj
  //是对象的话就要进行深拷贝
  if(hash.get(obj)) return hash.get(obj)
  let cloneObj=new obj.constructor()
  //找到的是所属类原型上的constructor,而原型上的constructor指向的是当前类本身
  hash.set(obj,cloneObj)
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      //实现一个递归拷贝
      cloneObj[key]=deepClone(obj[key],hash)
    }
  }
  return cloneObj
}
//使用loadsh库函数实现深拷贝
const _=require('loadsh')
const obj1={
  a:1,
  b:{f:{g:2}},
  c:[1,2,3]
}
const obj2=_.cloneDeep(obj1)
console.log(obj1.b.f===obj2.b.f)  //false
```
