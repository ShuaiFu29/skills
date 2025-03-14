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

# JS 中如何实现函数缓存？函数缓存有哪些应用场景？

函数缓存，就是将函数运算过的结果进行缓存，本质上就是空间换时间。缓存只是一个临时的数据存储，它保存数据，以便将来对该数据的请求能够更快地处理。
如何实现？

```js
//1.使用闭包（函数+函数体内可访问的变量总和）
(function(){
  var a=1
  function add(){
    const b=2
    let sum=b+a
    console.log(sum)
  }
  add()
})()
//2.柯里化
//非函数柯里化
var add=function(x,y){
  return x+y
}
add(3,4)//7
//函数柯里化
var add2=function(x){
  return funtion(y){
    return x+y
  }
}
add(3)(4)//7
//3.高阶函数
function foo(){
  var a=2
  function bar(){
    console.log(a)
  }
  return bar
}
var baz=foo()
baz()//2

const memoize=function(func,content){
  let cache=Object.create(null)
  content=content||this
  return (...key)=>{
    if(!cache[key]){
      cache[key]=func.apply(content,key)
    }
    return cache[key]
  }
}
```

应用场景：

- 对于昂贵的函数调用，执行复杂计算的函数
- 对于具有有限且高度重复输入范围的函数
- 对于具有重复输入值的递归函数
- 对于纯函数，即每次使用特定输入调用时返回相同输出的函数

# 说说你对事件循环的理解

首先，JS 是一门单线程的语言，意味着同一时间内只能做一件事情，但是这不意味这单线程就是阻塞，而实现单线程非阻塞的方法就是事件循环。
在 JS 中，所有的任务都可以分为
同步任务：立即执行的任务，同步任务一般会直接进入主线程中执行
异步任务：异步执行的任务，比如 ajax 网络请求，setTimeout 定时函数等

- 微任务
  - Promise.then()
  - MutationObserver
  - Object.observe(已废弃，Proxy 对象替代)
  - process.nextTick(node.js)
- 宏任务
  - script(可以理解为外层同步代码)
  - setTimeout/setInterval
  - UI rendering/UI 事件
  - postMessage,MessagrChannel
  - setImmediate,I/O(Node.js)
    执行机制：
- 执行一个宏任务，如果遇到微任务就把它放到微任务的事件队列中
- 当宏任务执行完成后，会查看微任务的事件队列，然后将里面的所有微任务依次执行完

async 与 await
async 是异步的意思，await 则可以理解为 async wait。所以可以理解 async 就是用来声明一个异步的方法，而 await 是用来等待异步方法执行。不管 await 后面跟的是什么，await 都会阻塞后面的代码，放入微任务队列中。

# JS 本地存储的方式有哪些？区别及应用场景？

- cookie
  1. 大小为一般不超过 4KB
  2. 每次请求都会携带
  3. 安全性差
- localStorage
  1. 生命周期：持久化的本地存储，除非主动删除数据，否则数据永远不会过期
  2. 存储的信息在同一域是共享的
  3. 大小为 5MB
  4. 本质是对字符串的读取
- sessionStorage
  和 localStorage 使用方法基本一致，唯一不同的是生命周期，一旦页面关闭，sessionStorage 中的数据就会被清空
- IndexDB
  1. 是一种基于事务的非关系型数据库
  2. 存储大量数据
  3. 可以离线存储
  4. 支持事务
  5. 支持索引
  6. 支持二进制存储
  7. 支持跨域访问
  8. 支持多线程访问
- 应用场景：
  - 标记用户与跟踪用户行为的情况，推荐使用 cookie
  - 适合长期保存本地的数据，推荐使用 localStorage
  - 敏感账号一次性登录，推荐使用 sessionStorage
  - 适合存储大量数据的情况，推荐使用 IndexDB

# 大文件上传如何做断点续传？

上传大文件的时候，一下几个变量会影响我们的用户体验：

- 服务器处理数据的能力
- 请求超时
- 网络波动
  为了解决上述问题，我们需要对大文件上传单独处理
  分片上传
  就是将要上传的文件，按照一定的大小，将整个文件分隔成多个数据块来进行分片上传，上传完成之后再由服务器端对所有上传的文件进行汇总整合成原始的文件

1. 将需要上传的文件按照一定的分割规则，分割成相同大小的数据块
2. 初始化一个分上传任务，返回本次分片上传的唯一标识
3. 按照一定的策略（串行或并行）发送各个分片数据块
4. 发送完成后，服务端根据判断数据上传是否完整，如果完整，则进行数据块合成得到原始文件
   断点续传
   在下载或上传时，将下载或上传任务人为的划分为几个部分，每个部分采用一个线程进行上传或下载，如果碰到网络故障，可以从已经上传或下载的部分开始继续上传下载未完成的部分，而没有必要从头开始上传下载。用户可以节省时间，提高速度，一般实现方式有两种：
5. 服务端返回，告知从哪开始
6. 浏览器端自行处理
   上传过程将文件在服务端写为临时文件，等全部写完了，在将此临时文件重命名为正式文件。

# ajax 原理是什么？如何实现？

ajax 即异步的 JS 和 XML,是一种创建交互式网页应用开发技术，可以在不重新加载整个页面的情况下，与服务端交换数据，并更新部分网页。
ajax 的原理简单来说通过 XmlHttpRequest 对象来向服务器发异步请求，从服务端获取数据，然后用 JS 来操作 DOM 而更新页面。

```js
//封装一个ajax请求
function ajax(options) {
  const xhr = new XMLHttpRequest();
  //初始化参数内容
  options = options || {};
  options.type = (options.type || "GET").toUpperCase();
  options.dataType = options.dataType || "json";
  const params = options.data;
  //发送请求
  if (options.type === "GET") {
    xhr.open("GET", options.url + "?" + params, true);
    xhr.send(null);
  } else if (options.type === "POST") {
    xhr.open('POST',options.url,true)
    xhr.send(params)
  }
  //接收请求
  xhr.onreadystatechange=function(){
    if(xhr.readyState===4){
      let status=xhr.status
      if(status>=200&&status<300){
        options.success&&options.success(xhr.responseText,,xhr.responseXML)
      }else{
        options.fail&&options.fail(status)
      }
    }
  }
}
ajax({
  type:'post',
  dataType:'json',
  data:{}.
  url:'htpps://xxx',
  success:function(text,xml){//请求成功后的回调函数
    console.log(text)
  }
  fail:function(status){//请求失败后的回调函数
    console.log(status)
  }
})
```

# 什么是防抖和节流？有什么区别？如何实现？

- 本质
  优化高频率执行代码的一种手段
  如：浏览器的 resize,scroll,keypress,mousemove 等事件在触发时，会不断地调用绑定在事件上的回调函数，极大地浪费资源，降低前端性能，为了优化体验，需要对这类事件进行调用次数上的限制，对此我们就可以采用防抖和节流的方式来减少调用频率。
- 定义
  - 节流：n 秒内只允许一次，若在 n 秒内重复触发，只有一次生效
  - 防抖：n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
- 代码实现

```js
//节流
//使用时间戳写法，事件会立即执行，停止触发后就没办法再次执行
function throttled1(fn, delay = 500) {
  let oldtime = Date.now();
  return function (...args) {
    let newtime = Date.now();
    if (newtime - oldtime >= delay) {
      fn.apply(null, args);
      oldtime = Date.now();
    }
  };
}
//使用定时器写法，delay毫秒后第一次执行，第二次事件停止触发后依然会再一次执行
function throttled2(fn, delay = 500) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}
//可以将时间戳写法的特性与定时器的特性相结合，实现一个更加精准的节流
function throttled(fn, delay) {
  let timer = null;
  let starttime = Date.now();
  return function () {
    let curtime = Date.now(); //当前时间
    let remaining = delay - (curtime - starttime); //从上一次到现在，还剩下多少多余时间
    let context = this;
    let args = arguments;
    if (remaining <= 0) {
      fn.apply(context, args);
      starttime = Date.now();
    } else {
      timer = setTimeout(fn, remaining);
    }
  };
}
//防抖
function debounce(fn, wait) {
  let timeout;
  return function () {
    let context = this; //保存this指向
    let args = arguments; //拿到event对象
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn.apply(context, args);
    }, wait);
  };
}
//防抖如果需要立即执行，可以加入第三个参数用于判断
function debounce(fn, wait, immediate) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    if (timeout) clearImeout(timeout); //timeout 不为null
    if (immediate) {
      let callNow = !timeout; //第一次会立即执行，以后只有事件执行后才会再次触发
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) {
        fn.apply(context, args);
      } else {
        timeout = setTimeout(function () {
          fn.apply(context, args);
        }, wait);
      }
    }
  };
}
```

- 区别
  相同点：
  都可以通过使用 setTimeout 实现
  目的都是，降低回调执行频率，节省计算资源
  不同点:
  函数防抖，在一段连续操作结束后，处理回调，利用 clearTimeout 和 setTimeout 实现。函数节流，在一段连续操作中，每一段时间只执行一次频率较高的事件中使用来提升性能
  函数防抖关注一定时间连续触发的事件，只在最后执行一次，而函数节流一段时间内只执行一次
