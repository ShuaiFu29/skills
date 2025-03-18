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
