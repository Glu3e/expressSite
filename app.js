let express = require('express');
global.jQuery = require('jquery');
//let bootstrap = require('bootstrap');

const app = express()
let port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to root')
})
app.get('/about', (req, res) => {
  res.send('about Kevin')
})

app.get('/contact', (req, res) => {
  res.send('How to contact me: ')
})

app.listen(port) 
  console.log(`server running at https://localhost${port}`);
