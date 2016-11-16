/**
 * Created by zhoushujuan on 16/11/11.
 */
var http = require('http');
var fs = require('fs');
var mime = require('mime');
var server = http.createServer(handle);
//绑定服务器
var io = require('socket.io')(server);
function handle(req,res) {
    var filePath = '';
    if(req.url == '/'){
        filePath = './html/index.html';
    }else{
        filePath = '.'+req.url;
    }
    exit(filePath,res);
}
function exit(filePath,res) {
    fs.exists(filePath,function (exits) {
        if(exits){
            fs.readFile(filePath,'utf-8',function (err,data) {
                if(err){
                    goTo404(res);
                }
                res.end(data);
            })
        }else {
            goTo404(res);
        }
    })
}
function goTo404(res) {
    res.writeHead(404,{
        "content-type":"text/plain"
    })
    res.end("404!   Sorry! no such file!");
}
server.listen(3002,function () {
    console.log('OK');
});
var num = 0;
//用户连接，回调
io.on('connection',function (socket) {
    //emit,事件名，发射主体
    //on,事件名，接收信息，(服务端和客户端一一对应)
    socket.on('message',function (data) {
        fs.readFile('./data.json',function (err,dat) {
            if(err){
                goTo404(res);
            }
            var shuju = JSON.parse(dat);
            shuju.data.push(data)
            fs.writeFile('./data.json',JSON.stringify(shuju),function (err) {
                if(err){
                    goTo404(res);
                }
                read();
            })
        })
        num++;
    })
function read() {
    fs.readFile('./data.json','utf-8',function (err,dat) {
        if(err){
            goTo404(res);
        }
        var shu1 = JSON.parse(dat).data;
        io.sockets.emit('back',{data:shu1,num:JSON.parse(dat).data.length});
    })
}
    read();
});
