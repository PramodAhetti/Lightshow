const express=require('express');
const http=require('http');
const {Server}=require('socket.io');
const {join}=require('node:path')
const app=express();
const fs=require('fs');
const server=http.createServer(app);
const io= new Server(server);

const display=require('./functions/display.js')

const hashMap={};


app.get('/home',(req,res)=>{
        res.sendFile(join(__dirname ,"index.html"));
})


io.on('connection',user=>{
       console.log("user connected")

       

       user.on('coordinates',(data)=>{
         
          hashMap[data]=user.id;
          console.log(data);
          console.log(hashMap[data]);
        })
})




app.get('/wave',(req,res)=>{
    let x=parseInt(req.query.x);
    let y=parseInt(req.query.y);
    let z=parseInt(req.query.z);
    let delay=parseInt(req.query.delay);
    let height=parseInt(req.query.height);
    let width=parseInt(req.query.width);
    let color=[x,y,z];
    for(let j=1;j<=width;j++){
        for(let i=1;i<=height;i++){
            io.to(hashMap[`${i} ${j}`]).emit('wave',color);   
            color[2]+=20;   
            console.log(i,j);
        }
        let wait=delay;
        while(wait--){console.log(wait)};
        
    }

    res.send('done');
})

app.get('/display',(req,res)=>{
    let x=parseInt(req.query.x);
    let y=parseInt(req.query.y);
    let z=parseInt(req.query.z);
    let index=parseInt(req.query.index);
    let color=[x,y,z];
    display(color,index);
    res.send("done");
})



server.listen(9000,()=>{
    console.log("started server");
})


