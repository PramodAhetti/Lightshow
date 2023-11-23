const express = require('express');
const router = express.Router();


let height=5;
let width=10;
router.get('/', (req, res) => {
  let x = parseInt(req.query.x);
  let y = parseInt(req.query.y);
  let z = parseInt(req.query.z);

  let color = [x, y, z];

  for (let j = 1; j <= width; j++) {
    for (let i = 1; i <= height; i++) {
      io.to(hashMap[`${i} ${j}`]).emit('wave', color);
      color[0] -= 10; // Decrement red component
      console.log(i, j);
    }
  }

  res.send('done');
});

module.exports = router;
