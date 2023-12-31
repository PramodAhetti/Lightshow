
const pattern = [[//hi
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1]
]
,[//gn
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 1, 0, 0, 1, 0],
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




function display(colour,index,io){
  
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
                        char++;
                    }
                }
            }
        }
        
}
module.exports=display;