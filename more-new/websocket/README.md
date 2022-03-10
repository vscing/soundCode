# WebSocket、 Engine.IO、 Socket.IO 之间的关系

```
WebSocket 基础与应用系列（二）—— Engine.IO 原理了解
原创 yongxia 腾讯IMWeb前端团队 2022-03-10 19:24
本系列第一篇《WebSocket 基础与应用系列（一）——  抓个 WebSocket 的包》，没看过的同学可以看看，看过的同学也可以回顾一把。



1、WebSocket、 Engine.IO、 Socket.IO 之间的关系
WebSocket 是一种在单个 TCP 连接上进行全双工通信的协议。WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

Socket.IO 在 Socket.IO server (Node.js) 和 Socket.IO client ( browser, Node.js, or another programming language ) 之间，基于 WebSocket ( 不支持 WebSocket 的情况下，退化成 HTTP long-polling ) 建立一条全双工实时通信通道.

Engine.IO 是一个 Socket.IO 的抽象实现，作为 Socket.IO 的服务器和浏览器之间交换的数据的传输层。它不会取代 Socket.IO，它只是抽象出固有的复杂性，支持多种浏览器，设备和网络的实时数据交换。Engine.IO 使用了 Websocket 和 HTTP long-polling 方式封装了一套 socket 协议。为了兼容不支持 Websocket 的低版本浏览器，使用长轮询 ( polling ) 替代 WebSocket。

图片

2、Engine.IO 支持的功能
Engine.IO 负责在服务器和客户端之间建立底层连接。包括以下功能：

多种传输通道及升级机制

断连检测

2.1、传输通道
现在主要有 2 种传输通道实现

HTTP long-polling

WebSocket

2.1.1、HTTP long-polling
HTTP long-polling transport (也简称 "polling") 由连续的 HTTP requests 组成:

long-running GET requests, for receiving data from the server

short-running POST requests, for sending data to the server

基于 HTTP long-polling transport 的特性，连续的 emits 可能合并在一个 HTTP Request 中发送。

2.1.2、WebSocket
The WebSocket 传输通道 包含一条 WebSocket 连接，WebSocket 提供了服务端和客户端之间双向通信及低时延的通信通道。

基于传输通道特性，每个 emit 会以一个 WebSocket 数据帧发送，有时候会分为 2 个不同的数据帧发送。

2.2、Handshake
Engine.IO 连接建立的时候， Server 端会发送一些消息到客户端：

{
  "sid": "FSDjX-WRwSA4zTZMALqx",
  "upgrades": ["websocket"],
  "pingInterval": 25000,
  "pingTimeout": 20000
}
sid: 是 session 的 ID，在所有的子序列 HTTP Request 中都会在参数带上这个 sid.

upgrades: upgrades array 包含了服务端可以支持的更好的 transport.

pingInterval 和 pingTimeout：用于心跳机制.

2.3、升级机制
默认的情况下，客户端先建立 HTTP long-polling 通信通道。

为什么呢？

WebSocket 无疑是最好的双向通道，但是由于公司的代理、个人的防火墙、杀毒软件等，它并不是在什么情况下都能成功建立。

从用户的角度来看，如果 WebSocket 连接建立失败，那么用户至少要等 10S 才能开始真正的数据传输，这无疑伤害了用户的体验。

总的来说，Engine.IO 首先关注可靠性和用户体验，其次才是服务器性能。

升级的时候，客户端会做如下动作:

保证要发送的队列中是空的

把当前的传输通道设为只读

使用另外的 transport 建立新的连接

如果新传输通道建立成功，关掉第一条传输通道

可以在浏览器抓包看到如下网络连接：

图片

握手协议 (contains the session ID — here, zBjrh...AAAK — that is used in subsequent requests)

发送数据 (HTTP long-polling)

接收数据 (HTTP long-polling)

升级协议 (WebSocket)

接收数据 (HTTP long-polling, closed once the WebSocket connection in 4. is successfully established)

2.4、断连检测
当以下情况出现时，Engine.IO 的连接会判断为关闭。

一次 HTTP request (either GET or POST) 失败 (比如服务器挂了)

WebSocket 连接关闭 (比如用户关闭了浏览器的 tab)

在服务端或者客户端调用 socket.disconnect ()

还有一个心跳机制用来检测服务端和客户端的连接是否正常在运行。

服务端会以 pingInterval 的间隔发送 PING 数据包，客户端收到后在 pingTimeout 时间之内需要发送 PONG 数据包给服务端，如果服务端在 pingTimeout 时间内没有收到，那么就认为这条连接关闭了。相反，客户端如果在 pingInterval + pingTimeout 时间内没有收到 PING 数据包，客户端也判断连接关闭。

服务端触发断连事件的原因有：

Reason	Description
server namespace disconnect	The socket was forcefully disconnected with socket.disconnect
client namespace disconnect	The client has manually disconnected the socket using socket.disconnect()
server shutting down	The server is, well, shutting down
ping timeout	The client did not send a PONG packet in the pingTimeout delay
transport close	The connection was closed (example: the user has lost connection, or the network was changed from WiFi to 4G)
transport error	The connection has encountered an error
客户端触发断连事件的原因有：

Reason	Description
io server disconnect	The server has forcefully disconnected the socket with socket.disconnect()
io client disconnect	The socket was manually disconnected using socket.disconnect()
ping timeout	The server did not send a PING within the pingInterval + pingTimeout range
transport close	The connection was closed (example: the user has lost connection, or the network was changed from WiFi to 4G)
transport error	The connection has encountered an error (example: the server was killed during a HTTP long-polling cycle)
3、Engine.IO 的协议
3.1 一次 Engine.IO 会话
传输通道通过 Engine.IO URL 进行连接建立

连接建立之后，服务端会发一个 JSON 格式的握手数据

sid：会话 id (string)

upgrades: 允许升级的传输通道 (Array of String)

pingTimeout: 服务端配置的 ping 超时时间，发送给客户端，客户端用来检测服务端是否还正常响应 (Number)

pingInterval: 服务端配置的心跳间隔，客户端用来检测服务端是否还正常响应 (Number)

客户端收到服务端定时的 ping packet 之后，需要回复客户端 pong packet

客户端和服务端之间可以传输 message packets

Polling transports 可以发送 close packet 来关闭 socket

会话例子
Request n°1 (open packet)

GET /engine.io/?EIO=4&transport=polling&t=N8hyd6w
< HTTP/1.1 200 OK
< Content-Type: text/plain; charset=UTF-8
0{"sid":"N-YWtQT1K9uQsb15AAAD","upgrades":["websocket"],"pingInterval":25000,"pingTimeout":5000}
Details:

0           => "open" packet type
{"sid":...  => the handshake data
Note: query 参数中的 t 是用来防止浏览器缓存请求.

Request n°2 (message in)

服务端执行 socket.send ('hey') :

GET /engine.io/?EIO=4&transport=polling&t=N8hyd7H&sid=lv_VI97HAXpY6yYWAAAC
< HTTP/1.1 200 OK
< Content-Type: text/plain; charset=UTF-8
4hey
Details:

4           => "message" packet type
hey         => the actual message
Note: query 中的 sid 是握手协议中 sid.

Request n°3 (message out)

客户端执行：socket.send ('hello'); socket.send ('world');

POST /engine.io/?EIO=4&transport=polling&t=N8hzxke&sid=lv_VI97HAXpY6yYWAAAC
> Content-Type: text/plain; charset=UTF-8
4hello\x1e4world
< HTTP/1.1 200 OK
< Content-Type: text/plain; charset=UTF-8
ok
Details:

4           => "message" packet type
hello       => the 1st message
\x1e        => separator
4           => "message" message type
world       => the 2nd message
Request n°4 (WebSocket upgrade)

GET /engine.io/?EIO=4&transport=websocket&sid=lv_VI97HAXpY6yYWAAAC
< HTTP/1.1 101 Switching Protocols
WebSocket frames:

< 2probe    => probe request
> 3probe    => probe response
< 5         => "upgrade" packet type
> 4hello    => message (not concatenated)
> 4world
> 2         => "ping" packet type
< 3         => "pong" packet type
> 1         => "close" packet type
只有 WebSocket 连接的会话
在这个例子中，客户端只开启了 WebSocket 传输通道 (without HTTP polling).

GET /engine.io/?EIO=4&transport=websocket
< HTTP/1.1 101 Switching Protocols
WebSocket frames:

< 0{"sid":"lv_VI97HAXpY6yYWAAAC","pingInterval":25000,"pingTimeout":5000} => handshake
< 4hey
> 4hello    => message (not concatenated)
> 4world
< 2         => "ping" packet type
> 3         => "pong" packet type
> 1         => "close" packet type
3.2 URLs
Engine.IO url 包含了以下内容

/engine.io/[?<query string>]
engine.io 路径名只能由基于 Engine.io 协议之上的的更高级别框架更改，如 Socket.io.

query string 是可选的，有 6 个保留的 key:

transport: 指定的 transport， 默认为 polling, websocket.

j: 如果需要 JSONP 响应，j 必须与 JSONP 响应索引一起设置。

sid: 如果客户端已经收到 session id，那么每次请求的 query string 中都必须带上 sid

EIO: 协议的版本

t: 用来防止浏览器缓存

3.3 编码
有两种不同类型的编码

packet

payload

3.3.1 Packet
一个编码的数据包可以是 UTF-8 字符串或者二进制数据。字符串的数据包编码格式如下：

<packet type id>[<data>]
example:

4hello
对于二进制数据，不包括数据包类型（packet type），因为只有 “message” 数据包类型可以包括二进制数据。

packet type
0 open

新传输通道建立的时候，从服务端发送 Sent from the server when a new transport is opened (recheck)

1 close

请求关闭此传输，但不关闭连接本身。

2 ping

由服务器发送。客户应该用 pong 数据包应答。

example

server sends: 2
client sends: 3
3 pong

由客户端发送以响应 ping 数据包。

4 message

实际传输的消息

example 1

server sends: 4HelloWorld
client receives and calls callback socket.on('message', function (data) { console.log(data); });
example 2

client sends: 4HelloWorld
server receives and calls callback socket.on('message', function (data) { console.log(data); });
5 upgrade

在 engine.io 切换传输通道之前，它测试服务器和客户端是否可以通过该传输进行通信。如果此测试成功，客户端将发送一个升级包，请求服务器刷新旧传输上的缓存，并切换到新传输通道。

6 noop

一个 noop 包。主要用于建立 websocket 连接之后关闭长轮询。

example

client connects through new transport
client sends 2probe
server receives and sends 3probe
client receives and sends 5
server flushes and closes old transport and switches to new.
3.3.2 Payload
Payload 是捆绑在一起的一系列 encoded packets。Payload 编码格式如下：

<packet1>\x1e<packet2>\x1e<packet3>
数据包分割符使用 record separator ('\x1e'). 更多可参考: https://en.wikipedia.org/wiki/C0_and_C1_control_codes#Field_separators

当有效负载中包含二进制数据时，它将作为 base64 编码字符串发送。为了解码的目的，将标识符 b 置于包含二进制数据的分组编码之前。可以发送任意数量的字符串和 base64 编码字符串的组合。下面是 base 64 编码消息的示例：

<packet1>\x1eb<packet2 data in b64>[...]
Payload 用于不支持帧的传输通道，例如轮询协议。

不包含二进制的例子:

[
  {
    "type": "message",
    "data": "hello"
  },
  {
    "type": "message",
    "data": "€"
  }
]
编码后:

4hello\x1e4€
包含二进制的例子:

[
  {
    "type": "message",
    "data": "€"
  },
  {
    "type": "message",
    "data": buffer <01 02 03 04>
  }
]
编码后:

4€\x1ebAQIDBA==
分解：

4           => "message" packet type
€
\x1e        => record separator
b           => indicates a base64 packet
AQIDBA==    => buffer content encoded in base64
3.4 传输通道
engine.io server 必须支持三种传输通道:

websocket

server-sent events (SSE)

polling

jsonp

xhr

3.4.1 Polling
轮询传输包括客户端向服务器发送周期性 GET 请求以获取数据，以及将带有有效负载的请求从客户端发送到服务器以发送数据。

XHR
服务器必须支持 CORS 响应。

JSONP
服务器实现必须使用有效的 JavaScript 进行响应。在响应中需要使用 URL 中 query 中的 j 参数。j 是一个整数。

JSONP 数据包的格式。

`___eio[` <j> `]("` <encoded payload> `");`
为了确保 payload 得到正确处理，需要对 payload 进行转义，使得响应体是一个合法的 JavaScript。

服务器返回的 JSONP 数据帧的例子

___eio[4]("packet data");
Posting data

客户端通过隐藏的 iframe 发送数据。数据以 URI 编码格式发送给服务器，如下所示

d=<escaped packet payload>
除了常规的 qs 转义之外，为了防止浏览器处理的不一致，\n 在被 POSTd 之前将被转义为 \n。

3.4.2 Server-sent events
客户端使用 EventSource 对象接收数据，使用 XMLHttpRequest 对象发送数据。

3.4.3 WebSocket
上面的对 payloads 的编码方式并不用于 WebSocket 通道，WebSocket 通道本身已有轻量级的数据帧机制。

发送消息的时候，对数据包进行单独编码，然后依次调用 send () 进行发送。

3.5 传输通道升级
连接总是以轮询（XHR 或 JSONP）开始。WebSocket 通过发送探针在侧面进行测试 (2probe)。如果探测由服务器响应 (3probe)，则客户端会发送一个升级包 (5)。

为了确保没有消息丢失，只有在刷新现有传输的所有缓冲区并认为传输已暂停后，才会发送升级数据包。

当服务器收到升级包时，它必须假定这是新的传输通道，并将所有现有缓冲区（如果有的话）发送给它。

客户端发送的探测器是一个 ping+probe 作为数据发送。(2probe) 服务端发送的探测器是一个 pong+probe 作为数据发送。(3probe)

3.6 Timeouts
客户端必须使用握手中发送的 pingTimeout 和 pingInterval 来确定服务器是否无响应。

服务器发送一个 ping 数据包。如果在 pingTimeout 内未收到任何数据包类型，服务器将认为套接字已断开连接。如果收到了 pong 数据包，服务器将在等待 pingInterval 之后再次发送 ping 数据包。

由于这两个值在服务器和客户端之间共享，当客户端在 pingTimeout+pingInterval 内没有接收到任何数据时，客户端也能探测到服务器是否变得无响应。

4 一些注意点
Engine.IO 是 Socket.IO 的底层传输通道实现。

Engine.IO 、 Socket.IO 在上层均有自己的协议，因此服务端和客户端必须搭配才能使用。也就是说 Socket.IO 的客户端必须搭配 Socket.IO 的服务端才能正常交互数据。

图片

在浏览器中 message 中的能抓到的数据包，属于 WebSocket 协议中的 message 类型数据，WebSocket 的 PING， PONG 是和 message 类型是并列的，因此浏览器中的 devTools 并不能抓到，而 Engine.IO 的心跳机制的实现（下图中的 2 和 3），是 message 数据之上的协议定义， 是 Engine.IO 用 WebSocket 的 message 类型消息发送的。

图片

5 一个简单的例子
服务端代码

const engine = require('engine.io');
const server = engine.listen(3000,{
  cors: {
    origin: "*"
  }
});

server.on('listen', () => {
  console.log('listening on 3000')
})

server.on('connection', socket => {
  console.log('new connection')
  socket.send('utf 8 string');
  socket.send(Buffer.from('hello world')); // binary data
});

客户端代码

const { Socket } = require('engine.io-client');
const socket = new Socket('ws://localhost:3000');
socket.on('open', () => {
  socket.emit('message from client')
  socket.on('message', (data) => {
    console.log('receive message: ' + data);
    socket.send('ack from client.');
  });
  socket.on('close', (e) => {
    console.log('socket close',e)
  });
});

浏览器请求抓包

1、Polling 传输通道握手

Request:

图片

Response:

图片

2、发起长轮询请求服务端数据

Request:

图片

Response:

图片

3、POST 方式发送数据到服务端

Request:

图片

Request payload:

图片

Response:

图片

4、服务端告诉客户端传输通道已升级，回复一个 6

Request:

图片

Response:

图片

5、WebSocket 通道建立之后，切换为 WebSocket 传输数据

Connect:

图片

Message:

图片

也可以在客户端指定传输通道为 websocket ， 那么就不会先建立 Polling 传输通道，直接用 WebSocket 传输通道进行握手。

const socket = new Socket('ws://localhost:3000',{ transports: ['websocket'] } );
图片







图片
紧追技术前沿，深挖专业领域
扫码关注我们吧！
图片
图片


阅读 628
写下你的留言
```