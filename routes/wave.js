const express = require('express');
const router = express.Router();
const socketServer=require('../socket-server.js')


const io=socketServer.io;
const hashMap=socketServer.hashMap;

router.get('/',(req,res)=>{
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
            console.log(i,j);
        }
        color[2]+=10;   
        let wait=delay;
        while(wait--){console.log(wait)};
        
    }

    res.send('done');
})


module.exports = router;
