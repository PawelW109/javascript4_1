'use strict';

const express = require('express');
const app = express();

function Round2(num) {
  return Math.round(num * 100) / 100;
}

// define endpoint for exercise 1 here
app.get('/math/circle/:r', (req, res) => {
  const r = req.param("r");
  let result;
  if(r > 0){
    const area = Round2(r * r * Math.PI);
    const circ = Round2(r * 2 * Math.PI);
    result = {area: area, circumference: circ};
  }
  else{
    result = {error: "Invalid input"};
  }
  res.json(result);
});

app.get('/math/rectangle/:width/:height', (req, res) => { 
  const w = req.param("width");
  const h = req.param("height");
  let result;
  if(w > 0 && h > 0){
    const area = w * h;
    const per = w * 2 + h * 2;
    result = {area: area, perimeter: per};
  }
  else{
    result = {error: "Invalid input"};
  }
  res.json(result);
});

app.get('/math/power/:base/:exponent', (req, res) => { 
  const b = req.param("base");
  const e = req.param("exponent");
  const r = req.param("root");
  const re = Math.pow(b, e);
  const ro = Round2( Math.sqrt(b) );
  let result;
  if(isNaN(b) || isNaN(e)){
    result = {error: "Invalid input"};  
  }
  else{
    if(r == "true")
      result = {result: re, root: ro};
    else
      result = {result: re};
  }
    
  res.json(result);
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});