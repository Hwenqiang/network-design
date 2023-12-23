
function useWebSocket(handleMessage,username){
    const ws = new WebSocket('ws://localhost:8000');
    ws.addEventListener('open',(e)=>{
        console.log('client open');
        let time = new Date();
        ws.send(JSON.stringify({
          id: time.getTime(),
          user: username,
          dataTime:`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
          msg:`Hello I'm ${username}`,
        }));
    },false);

    ws.addEventListener('message',handleMessage);
    ws.addEventListener('close',(event)=>{
        console.log(`${username} closed`);
    });
    ws.addEventListener('error',(event)=>{
        console.log('error: ',event);
    })

    return ws;
}

export default useWebSocket;