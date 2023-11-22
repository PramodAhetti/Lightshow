const express=require('express');
const http=require('http');
const {Server}=require('socket.io');
const {join}=require('node:path')
const app=express();
const fs=require('fs');
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





let pattern=[[0,1,0],
             [1,0,1],
             [0,1,0],
             [1,0,1],
             [1,1,1],
             [0,0,0]];
function display(colour){
  
        let i=1;
        for(i;i<(pattern.length-1);i+=3){
            for(let j=1;j<(pattern[0].length-1);j+=3){
                let char=97;
                for(let k=i-1;k<=i+1;k++){
                    for(let m=j-1;m<=j+1;m++){
                        if(pattern[k][m]==1){
                            let box=String.fromCharCode(char);
                            
                            console.log(char,box,`${i} ${j}`)
                            io.to(hashMap[`${i} ${j}`]).emit('colour',box,[colour[0],colour[1],colour[2]]);
                            
                        }
                        char++;
                    }
                }
            }
        }
        
}

app.get('/playsound',(req,res)=>{
      const audioBuffer=fs.readFileSync('left.wav')
      for (let i = 0; i < audioBuffer.length; i += 1024) {
        const chunk = audioBuffer.slice(i, i + 1024);
        io.emit('audioChunk', chunk);
      }
      res.send('done');
})



app.get('/display',(req,res)=>{
    let x=parseInt(req.query.x);
    let y=parseInt(req.query.y);
    let z=parseInt(req.query.z);
    let color=[x,y,z];
    display(color);
    res.send("done");
})



server.listen(9000,()=>{
    console.log("started server");
})


