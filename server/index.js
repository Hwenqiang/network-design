var userNum = 0
var chatList = []
var userList = []

const WebSocket = require('ws');

const server = new WebSocket.Server({port:8000});


server.on('open',()=>{
    console.log('server open');
})

server.on('error',()=>{
    console.log('server error');
})

server.on('connection',(ws)=>{
    console.log('has connected');
    userNum++;
    server.clients.forEach((item)=>{
        if(item.readyState === WebSocket.OPEN)
            item.send(JSON.stringify({tag:"userUpdate",userNum:userNum,userList:userList}));
    })
    ws.on('message',(msg)=>{
        msg = msg.toString();
        console.log(`received message ${msg}`);
        var res = JSON.parse(msg);
        server.clients.forEach((item)=>{
            if(item.readyState === WebSocket.OPEN)
                item.send(JSON.stringify({tag:"msgUpdate",chatList:chatList}));
        })
        chatList.push(res);
        var f = false;
        for(let i = 0;i < userList.length;i++)
            if(userList[i] === res.user)
                f = true;
        if(!f){
            userNum=server.clients.size;
            userList.push(res.user);
            server.clients.forEach((item)=>{
                if(item.readyState === WebSocket.OPEN)
                    item.send(JSON.stringify({tag:"userUpdate",userNum:userNum,userList:userList}));
            })
        }
        server.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN)
                client.send(msg);
        })
    })
})

server.on('close',()=>{
    userNum--;
    server.clients.forEach((item)=>{
        if(item.readyState === WebSocket.OPEN)
            item.send(JSON.stringify({tag:"userUpdate",userNum:userNum,userList:userList}));
    })
    console.log('disconnected');
})