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
