# ES6 中数组新增了哪些扩展？

- 扩展运算符的应用： ...
- 构造函数新增的方法；
  - Array.from() 把两类对象转化为真正的数组
  - Array.of() 用于将一组值转化为数组
- 实例对象新增的方法
  - copyWithin()
  - find(),findIndex()
  - fill()
  - entries(),keys(),values()
  - includes()
  - flat(),flatMap()

# 你是怎么理解 ES6 中的 Promise 的？使用场景？

Promise 是异步编程的一种解决方案，比传统的解决方案（回调函数）更加合理和更加强大

```js
//回调函数地狱
doSomething(function (result) {
  doSomethingElse(
    result,
    function (newResult) {
      doThirdThing(
        newResult,
        function (finalResult) {
          console.log("得到最终结果：" + finalResult);
        },
        failureCallback
      );
    },
    failureCallback
  );
}, failureCallback);
//利用Promise修改一下
doSomething()
  .then(function (reslut) {
    return doSomethingElse(result);
  })
  .then(function (newResult) {
    return doThirdThing(newResult);
  })
  .then(function (finalResult) {
    console.log("得到最终结果" + finalResult);
  })
  .catch(failureCallback);
//链式操作减少了编码难度
//代码可读性明显增强
```

- 状态：
  - pending
  - fulfilled
  - rejected
    对象的状态不受外界影响，只有异步操作的结果可以决定当前是哪一种状态
    一旦状态改变（从 pending 变为 fulfilled 和从 pending 变为 rejected）就不会再变，任何时候都可以得到这个结果
- 用法
  Promise 对象是一个构造函数，用来生成 Promise 实例
  Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject
  resolve 函数作用是把 Promise 对象状态从 pending 变为 fulfilled
  reject 函数作用是把 Promise 对象状态从 pending 变为 rejected
  实例方法
  - then()
    实例状态发送改变时的回调函数，第一个参数是 resolved 状态的回调函数，第二个参数是 rejected 状态的回调函数，then 方法放回的是一个新的 Promise 实例，也就是 Promise 可以链式调用的原因
  - catch()
    方法是.then(null,rejection)或.then(underfined,rejection)的别名，用于指定发生错误时的回调函数，Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止，一般来说，使用 catch 方法代替 then()第二个参数，Promise 对象抛出的错误不会传递到外层代码，即不会用任何反应
  - finally()
    用于指定不管 Promise 对象最后状态如何，都会执行的操作
- 构造函数方法

  - all()
    用于将多个 Promise 实例，包装成一个新的 Promise 实例，
    实例状态由所有 Promise 实例状态决定
    只有所有实例状态都变成 fulfilled，包装实例才会变成 fulfilled 状态
    只要有一个实例状态变成 rejected，包装实例就会变成 rejected 状态
  - race()
    用于将多个 Promise 实例，包装成一个新的 Promise 实例，
    实例状态由第一个完成的实例状态决定
    第一个实例完成，包装实例就会变成 fulfilled 状态
    第一个实例失败，包装实例就会变成 rejected 状态
  - allSettled()
    用于将多个 Promise 实例，包装成一个新的 Promise 实例，
    实例状态由所有 Promise 实例状态决定
    只有所有实例状态都变成 fulfilled，包装实例才会变成 fulfilled 状态
    只要有一个实例状态变成 rejected，包装实例就会变成 rejected 状态
  - resolve()
    将现有对象转为 Promise 对象
    参数
    - 1.参数是 Promise 实例
      不做任何修改，原封不动返回
    - 2.参数是一个 thenable 对象
      会将这个对象转为 Promise 对象，然后就立即执行 thenable 对象的 then 方法
    - 3.参数不是具有 then 方法的对象，或根本就不是对象
      会返回一个新的 Promise 对象，状态为 fulfilled
    - 4.不带有任何参数
      直接返回一个 resolved 状态的 Promise 对象
  - reject()
    返回一个新的 Promise 实例，状态为 rejected
  - try()
    将同步代码变成异步代码

# 你是怎么理解 ES6 中的 Module 的？使用场景？

- 模块
  能够单独命名并独立地完成一定功能的程序语句的集合（即程序代码和数据结构的集合体）
  两个基本特征：外部特征和内部特征
  外部特征指模块跟外部环境联系的接口（即其他模块或程序调用该模块的方式，包括有输入输出参数，引用的全局变量）和模块的功能
  内部特征指模块的内部环境具有的特点（即该模块的局部数据和程序代码）
- 为什么需要模块化？
  - 代码抽象
  - 代码封装
  - 代码复用
  - 依赖管理
    如果没有模块化，我们代码变量和方法吧容易维护，容易污染全局作用域，加载资源的方式通过 script 标签从上到下，依赖的环境主观逻辑偏重，代码较多就会比较复杂，大型项目资源难以维护，特别是多人合作的情况下，资源的引入会让人奔溃
- JS 程序模块化的机制
  - CommonJS(典型代表： node.js 早期)
    - 所有代码都运行在模块作用域，不会污染全局作用域。
    - 模块是同步加载的，只有加载完成，才能执行后面的操作。
    - 模块在首次执行后就会缓存，再次加载只返回缓存结果，如果想要再次执行，可清除缓存
    - require 返回的值是被输出的值的拷贝，模块内部的变化也不会影响这个值
  - AMD(典型代表：require.js)
    - 异步模块定义，采用异步方式加载模块。所有依赖模块的语句，都定义在一个回调函数中，等到模块加载完成后，这个会回调函数才会运行
  - CMD(典型代表：sea.js)
  - ES6 Module(本质上是 JS 对象，通过 export 和 import 关键字来实现)
    - 模块内部自动采用了严格模式
    - 模块主要两个命令构成：
      - export: 用于规定模块的对外接口
      - import: 用于输入其他模块提供的功能
- 使用场景
  完成一些复杂应用的时候，可以把它拆分为各个模块，vue，react 比较常见使用

# 你是怎么理解 ES6 中的 Generator 的？使用场景？

- 介绍
  Generator 函数是 ES6 提供一种异步编程的解决方案，语法行为与传统函数完全不同
  执行 Generator 函数会返回一个遍历器对象，可以依次遍历 Generator 函数内部的每一个状态，Generator 函数是一个普通函数，但有两个特征：
  - function 关键字与函数名之间有一个星号
  - 函数体内部使用 yield 表达式，定义不同的内部状态

```js
function* helloWorldGenerator() {
  yield "hello";
  yield "world";
  return "ending";
}
```

- 使用
  - Generator 函数会返回一个遍历器对象，即具有 Symbol.iterator 属性，并且返回给自己
  - 通过 yield 关键字可以暂停 generator 函数返回的遍历器对象的状态
  - 通过 next 方法才会遍历到下一个内部状态，其运行逻辑如下：
    - 遇到 yield 表达式，就暂停执行后面的操作，并将紧跟在 yield 后面的那个表达式的值，作为返回对象的 value 属性值
    - 下一次调用 next 方法时，再继续往下执行，直到遇到下一个 yield 表达式
    - 如果没有再遇到新的 yield 表达式，就一直运行到函数结束，直到 return 语句为止，并将 return 语句后面的表达式的值，作为返回对象的 value 属性值
    - 如果该函数没有 return 语句，则返回的对象的 value 属性值为 undefined
- 异步解决方案
  - 回调函数
    就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，再调用这个函数
    ```js
    fs.readFile("/etc/fstab", function (err, data) {
      if (err) throw err;
      console.log(data);
      fs.readFile("/etc/shells", function (err, data) {
        if (err) throw err;
        console.log(data);
      });
    });
    //readFile函数的第三个参数，就是回调函数，等到操作系统返回了结果，再执行回调函数
    ```
  - Promise 对象
    就是为了解决回调地狱而产生的，将回调函数的嵌套，改为链式调用
    ```js
    const fs = require("fs");
    const readFile = function (fileName) {
      return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (error, data) {
          if (error) return reject(error);
          resolve(data);
        });
      });
    };
    readFile("/etc/fstab")
      .then((data) => {
        console.log(data);
        return readFile("etc/shells");
      })
      .then((data) => {
        console.log(data);
      });
    ```
  - generator 函数
    yield 表达式可以暂停函数执行，next 方法用于恢复函数执行，这使得 Generator 函数非常适合将异步任务同步化
    ```js
    const gen = function* () {
      const f1 = yield readFile("/etc/fstab");
      const f2 = yield readFile("/etc/shells");
      console.log(f1.toString());
      console.log(f2.toString());
    };
    ```
  - async/await
    将上面 Generator 函数改为 async/await 形式，语义化更强了
    ```js
    const asyncReadFile = async function () {
      const f1 = await readFile("/etc/fstab");
      const f2 = await readFile("/etc/shells");
      console.log(f1.toString());
      console.log(f2.toString());
    };
    ```
- 区别
  - promise 和 async/await 是专门用于处理异步操作的
  - Generator 并不是为了异步而设计出来的，它还有其他功能（对象迭代，控制输出，部署 Interator 接口）
  - promise 编写代码相比 Generator,async 更为复杂化，且可读性也稍差
  - Generator,async 需要与 promise 对象搭配处理异步情况
  - async 实质是 Generator 的语法糖，相当于会自动执行 Generator 函数
  - async 使用上更为简洁，将异步代码以同步形式进行编写，是处理异步编程的最终方案
