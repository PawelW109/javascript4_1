'use strict';

const express = require('express');
const app = express();

function Round2(num) {
  return Math.round(num * 100) / 100;
}

// define endpoint for exercise 1 here
app.get('/math/circle/:r', (req, res) => {
//TODO1  
  const r = req.param("r");
  const area = Round2(r * r * Math.PI);
  const circ = Round2(r * 2 * Math.PI);
  const result = {area: area, circumference: circ}
  res.json(result);
});

//TODO2


//TODO3


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});