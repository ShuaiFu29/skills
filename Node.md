# 说说你对 Node.js 的理解？优缺点？应用场景？

- 是什么？
  node.js 是一个开源跨平台的 JS 运行环境
  在浏览器外运行 V8JS 引擎（Google Chrome 的内核），利用事件驱动，非阻塞和异步输入输出模型等提高性能
  可以理解为 Node.js 就是一个服务器端的，非阻塞式 I/O 的，事情驱动的 JS 运行环境
  - 非阻塞异步
    Node.js 采用了非阻塞型 I/O 机制，在 I/O 操作的时候不会造成任何的阻塞，当完成之后，以时间的形式通知执行操作
    例如在执行了访问数据库的代码之后，将立即转而执行后面的代码，把数据库返回结果的处理代码放在回调函数中，从而提高了程序执行效率
  - 事件驱动
    事件驱动就是当进来一个新的请求时，请求将会被压入一个事件队列中，然后通过一个循环来检验队列中的事件状态变化，如果检查到有状态变化的事件，那么就执行该事件对应的处理代码，一般都是回调函数
    比如读取一个文件，文件读取完毕后，就会触发对应的状态，然后通过对应的回调函数来进行处理
  - 优缺点
    优点：
    - 处理高并发场景性能最佳
    - 适合 I/O 密集型应用，应用在运行极限时，CPU 占用率仍然比较低，大部分时间是在做 I/O 硬盘内存读写操作
      因为 Node.js 是单线程，带来的缺点有：
    - 不适合 CPU 密集型应用
    - 只支持单核 CPU，不能充分利用 CPU
    - 可靠性低，一旦代码某个环节崩溃，整个系统都崩溃
- 应用场景
  借助 Node.js 的特点和弊端，其应用场景分类如下：
  - 善于 I/O，不善于计算。因为 Node.js 是一个单线程，如果计算（同步）太多，则会阻塞这个线程
  - 大量并发的 I/O，应用程序内部并不需要进行非常复杂的处理
  - 与 websocket 配合，开发长连接的实时交互应用程序
    具体场景可以表现为如下：
  - 第一大类：用户表单收集系统，后台管理系统，实时交互系统，考试系统，联网软件，高并发量的 web 应用程序
  - 第二大类：基于 web，canvas 等多人联网游戏
  - 第三大类：基于 web 的多人实时聊天客户端，聊天室，图文直播
  - 第四大类：单页面浏览器应用程序
  - 第五大类：操作数据库，为前端和移动端提供基于 JSON 的 API
    其实 Node.js 能实现几乎一切的应用

# 说说对 Node 中的 fs 模块的理解？有哪些常用方法？

fs 该模块提供本地文件的读写能力，基本上是 POSIX 文件操作命令的简单包装
可以说，所有与文件的操作都是通过 fs 核心模块实现

```js
//模块导入
const fs = require("fs");
```

这个模块对所有文件系统操作提供异步（不具有 sync 后缀）和同步（具有 sync 后缀）两种操作方式

- 方法
  - 文件读取
    - fs.readFileSync
      同步读取，参数如下：
      - 第一个参数为读取文件的路径或文件的描述符
      - 第二个参数为 options，默认值为 null，其中有 encoding（编码，默 认为 null）和 flag（标识位，默认位 r），也可以直接传入 encoding
        结果为返回文件的内容
      ```js
      const fs = require("fs");
      let buf = fs.readFileSync("1.txt");
      let data = fs.readFileSync("1.txt", "utf-8");
      ```
    - fs.readFile
      异步读取方法 readFile 与 readFileSync 的前两个参数相同，最后一个参数为回调函数，函数有两个参数 err（错误）和 data（数据），该方法没有返回值，回调函数在读取文件成功后执行
      ```js
      const fs = require("fs");
      fs.readFile("1.txt", "utf-8", (err, data) => {
        if (!err) {
          console.log(data);
        }
        console.log(err);
      });
      ```
  - 文件写入
    - writeFileSync
      同步写入，有三个参数：
      - 第一个参数为写入文件的路径或文件描述符
      - 第二个参数为写入的数据，类型为 String 或 Buffer
      - 第三个参数为 options，默认值为 null，其中有 encoding，flag，和 mode，也可以直接传入 encoding
      ```js
      const fs = require("fs");
      fs.writeFileSync("2.txt", "Hello World!");
      let data = fs.readFileSync("2.txt", "utf-8");
      ```
    - writeFile
      异步写入，writeFile 与 writeFileSync 的前三个参数相同，最后一个参数为回调函数，函数内有一个参数 err，回调函数在文件写入数据成功后执行
      ```js
      const fs=require('fs')
      fs.writeFile('2.txt','Hello World!',err={
        if(!err){
            fs.readFile('2.txt','utf-8',(err,data){
                console.log(data)
            })
        }
        console.log(data)
      })
      ```
  - 文件追加写入
    - appendFileSync
    - appendFile
  - 文件拷贝
    - copyFileSync
    - copyFile
  - 创建目录
    - mkdirSync
    - mkdir
