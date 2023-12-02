const express = require('express');
const router = express.Router();
const socketServer=require('../socket-server.js')

const LTM=require('./matrix.js');
const io=socketServer.io;
const hashMap=socketServer.hashMap;




function display(pattern){
            let color=[255,25,2];
            let i=2;
            for(let j=2;j<(pattern[0].length-1);j+=5){
                let char=97;
                for(let k=i-2;k<=i+2;k++){
                    for(let m=j-2;m<=j+2;m++){
                        if(pattern[k][m]==1){
                            let box=String.fromCharCode(char);
                            
                            console.log(char,box,`${i} ${j}`)
                            io.to(hashMap[`${i} ${j}`]).emit('colour',box,[color[0],color[1],color[2]]);
                           
                        }
                        color[0]-=10;
                        color[2]+=10;
                        char++;
                    }
                }
                console.log("here",j);
            }
        }
        









router.get('/',(req,res)=>{
    let msg=req.query.msg;
    let pixels=[[],[],[],[],[]];
    msg=msg.toUpperCase();
    console.log(msg);
    for(let i=0;i<msg.length;i++){
        const current=LTM[msg[i]];
        for(let j=0;j<5;j++){
            for(let k=0;k<5;k++){
                pixels[j].push(current[j][k]);
            }
        }
    }
    display(pixels);
    console.log(pixels);
    res.send("done");
})

module.exports = router;
