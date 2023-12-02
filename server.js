const app=require('./socket-server.js').app;
const io=require('./socket-server.js').io;
const server=require('./socket-server.js').server;
const hashMap=require('./socket-server.js').hashMap;

const path=require('path');


app.get('/home',(req,res)=>{
        res.sendFile(path.join(__dirname ,"index.html"));
})


app.get('/control',(req,res)=>{
        res.sendFile(path.join(__dirname ,"controller.html"));
})

io.on('connection',user=>{
       console.log("user connected");

       user.on('coordinates',(data)=>{
         
          hashMap[data]=user.id;
          console.log(data);
          console.log(hashMap[data]);
        })
})



app.use('/display',require('./routes/display.js'))


app.use('/wave',require('./routes/wave.js'));

server.listen(9000,()=>{
    console.log("started server");
})


