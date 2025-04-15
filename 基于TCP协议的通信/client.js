//导入node内置net模块
//可用于TCP通信
const net = require('net')
//创建客户端连接，目标127.0.0.1:9000服务器
const client = net.createConnection({ host: '127.0.0.1', port: 9000 })
//连接已建立
client.on('connect', () => {
    console.log('已连接到服务器')
    //向服务器发送消息
    client.write('Hello,serve')
    //连接断开
    // client.end('886')
    //连接结束
    client.on('end', () => {
        console.log('与服务器断开连接')
    })
    //连接出现错误
    client.on('error', err => {
        console.log('与服务器连接出现错误',err)
    })
})
//接收服务器端数据
client.on('data', chunk => {
    console.log('接收到服务器端的数据',chunk,chunk.toString());        
})
//客户端不需要像服务器一样绑定具体的端口号，使用随机端口号