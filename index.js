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


function isPrime(num){
  if(num < 2)
    return false;
  const s = Math.sqrt(num);
  for(let n = 2; n <= s; n++){
    if(num % n == 0)
      return false;
  }
  return true;
}

app.get('/math/isprime/:n', (req, res) => { 
  const n = req.param("n");
  let result;
  if(isNaN(n)){
    return res.status(400).json({
        error: "Invalid input"
    });
  }
  const p =isPrime(n);
  res.json({number: n, isPrime: p});
});


function getGCD(n1, n2){
  if(n2 == 0)
    return n1;

  if(n2 > n1){
    const g = n2;
    n2 = n1;
    n1 = g;
  }

  const r = n1 % n2;
  return getGCD(n2, r);
}

function getLCM(n1, n2, gcd){
  return n1 * n2 / gcd;
}

app.get('/math/gcdlcm/:a/:b', (req, res) => { 
  const a = req.param("a");
  const b = req.param("b");
  let result;
  if(isNaN(a) || isNaN(b)){
    return res.status(400).json({
        error: "Invalid input"
    });
  }
  const gcd = getGCD(a, b);
  const lcm = getLCM(a, b, gcd);

  res.json({gcd: gcd, lcm: lcm});
});


app.get('/math/average', (req, res) => { 
  const nums = req.query.nums;
  if(!nums){
    return res.status(400).json({
        error: "Invalid input"
    });
  }

  const numbers = nums.split(',').map(Number);
  let a = 0, g = 1, h = 0;
  
  let l = numbers.length;
  let n; 
  for(let i = 0; i < l; i++){
    n = numbers[i];
    a += n;
    g *= n;
    h += 1/n;
  }
  res.json({arithmetic: a / l, geometric: Math.pow(g, 1/l), harmonic: l / h});
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});