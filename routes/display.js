const express = require('express');
const router = express.Router();
const socketServer=require('../socket-server.js')


const io=socketServer.io;
const hashMap=socketServer.hashMap;

const pattern = [[//hi
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1]
]
,[//gn
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1]
]
,[//a
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1]
]
,[
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1]
]
,[
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1]
]
,[
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1]
]
,[
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1]
]
,[
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1]
]
,[
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1]
]
];




function display(colour,index){
  
        let i=2;
        console.log(pattern[index]);
        for(i;i<(pattern[index].length-1);i+=5){
            for(let j=2;j<(pattern[index][0].length-1);j+=5){
                let char=97;
                for(let k=i-2;k<=i+2;k++){
                    for(let m=j-2;m<=j+2;m++){
                        if(pattern[index][k][m]==1){
                            console.log(index,i,j);
                            let box=String.fromCharCode(char);
                            
                            console.log(char,box,`${i} ${j}`)
                            io.to(hashMap[`${i} ${j}`]).emit('colour',box,[colour[0],colour[1],colour[2]]);
                           
                        }
                        colour[2]+=1;
                        char++;
                    }
                }
            }
        }
        
}








router.get('/',(req,res)=>{
    let x=parseInt(req.query.x);
    let y=parseInt(req.query.y);
    let z=parseInt(req.query.z);
    let index=parseInt(req.query.index);
    let color=[x,y,z];
    display(color,index);
    res.send("done");
})

module.exports = router;
