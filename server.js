const express=require('express');
const http=require('http');
const {Server}=require('socket.io');
const {join}=require('node:path')
const app=express();
const server=http.createServer(app);
const io= new Server(server);
app.get('/home',(req,res)=>{
        res.sendFile(join(__dirname ,"index.html"));
})
io.on('connection',user=>{
       console.log("user connected")
       console.log(user.id);
       io.emit('colour',"black");
       user.on('message',(msg)=>{
             console.log(msg);
       })
})

server.listen(9000,()=>{
    console.log("started server");
})


