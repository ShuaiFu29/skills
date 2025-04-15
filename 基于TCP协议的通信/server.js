//导入node内置net模块
//可用于TCP通信
const net = require('net')
//创建TCP服务器
const server = net.createServer()
//有新的连接
server.on('connection', clientSocket => {
    //clientSocket可以理解为客户端和服务器的一个连接对象
    //每一次连接，服务器这边就会创建一个对象来管理这个连接，
    // 可以使用它在服务端接收和发送数据
    //Socket翻译过来就是插座，也有叫套接字的
    console.log('有新的连接')
    const { remoteAddress, remotePort } = clientSocket
    //客户端IP和端口号
    console.log(`客户端${remoteAddress}:${remotePort}和服务器建立连接`)
    //接收客户端数据
    clientSocket.on('data', chunk => {
        console.log('接收到客户端的数据',chunk,chunk.toString())
    })
    //向客户端发送数据
    clientSocket.write('Hello,client')
    //通过end断开这次连接
    // clientSocket.end('886')
    //连接结束
    clientSocket.on('end', () => {
        console.log(`客户端${remoteAddress}:${remotePort}和服务器断开连接`)
        
    })
    //连接出现错误
    clientSocket.on('error', err => {
        console.log(`客户端${remoteAddress}:${remotePort}和服务器连接出现错误`,err)
    })
})
//监听本机9000端口
//在本机可以通过127.0.0.1:9000或者localhost:9000访问本服务器
server.listen(9000, '127.0.0.1', () => {
    console.log('服务器已在127.0.0.1:9000启动')
})