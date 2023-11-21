const express=require('express');
const http=require('http');
const {Server}=require('socket.io');
const {join}=require('node:path')
const app=express();
const server=http.createServer(app);
const io= new Server(server);

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


const pattern=[[0,1],
[1,0]];


function display(colour){
    
    for(let i=0;i<pattern.length;i++){
        for(let j=0;j<pattern.length;j++){
            if(pattern[i][j]==1){
                let coordinates=(i+1)+" "+(j+1);
                console.log("displayed",coordinates);
                console.log(hashMap[coordinates]);
                io.to(hashMap[coordinates]).emit('colour',[colour[0],colour[1],colour[2]]);
            }
        }
    }
    colour[2]++;
}


app.get('/display',(req,res)=>{
    let x=parseInt(req.query.x);
    let y=parseInt(req.query.y);
    let z=parseInt(req.query.z);
    let colour=[x,y,z];
    console.log(colour);
    display(colour);
    
    res.send("done");
})

app.get('/rgb',(req,res)=>{
    
});

server.listen(9000,()=>{
    console.log("started server");
})


