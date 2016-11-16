/**
 * Created by zhoushujuan on 16/11/11.
 */
var socket = io('http://10.80.13.200:3002');
var btn = document.querySelector("[type='button']");
var span = document.querySelector("span");
var chat = document.querySelector("ul");
var content = document.querySelector("[type='text']");
var dataM = [];

btn.onclick = function (event) {

    console.log(chat.scrollTop,chat.scrollHeight);
    //去掉默认事件
    event.preventDefault();
    if(content.value != '') {
        var date = new Date();
        var shijian = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        socket.emit('message',{data:content.value,timee:shijian});
    }
    chat.scrollTop = chat.scrollHeight-20;
}

socket.on('back',function (data) {
    chat.innerHTML = '';
    for(var i = 0;i<data.data.length;i++){
        dataM[i] = data.data[i];
        var li = document.createElement('li');
        var a = document.createElement('a');
        li.innerHTML = data.data[i].data;
        a.href = "#";
        a.innerHTML = data.data[i].timee;
        li.appendChild(a);
        chat.appendChild(li);
    }
    span.innerHTML = data.num;
});