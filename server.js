const express = require('express');
const app = express();
const http=require('http').createServer(app);
const PORT = process.env.PORT || 3000;

http.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})

app.use(express.static(__dirname+'/public'))  //path to use static files from public folder

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

//socket

const io=require('socket.io')(http); //connect socket on what server
io.on('connection',(socket)=>{
    console.log('Connected');
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);//send message to all connected persons other than who had send
    })
})
