let express = require('express');
global.jQuery = require('jquery');
//let bootstrap = require('bootstrap');

const app = express()
//let port = 3000;

app.use('/', (req, res) => {
  res.send('Welcome to root')
})
app.use('/about', (req, res) => {
  res.send('about Kevin')
})

app.use('/contact', (req, res) => {
  res.send('How to contact me: ')
})

app.listen(()=> {
  console.log(`server started...`);
}) 
  //console.log(`server running at https://localhost${port}`);

 module.exports = app;  