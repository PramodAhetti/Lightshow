const app=require('./socket-server.js').app;
const io=require('./socket-server.js').io;
const server=require('./socket-server.js').server;
const hashMap=require('./socket-server.js').hashMap;

const {join}=require('node:path')


app.get('/home',(req,res)=>{
        res.sendFile(join(__dirname ,"index.html"));
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


