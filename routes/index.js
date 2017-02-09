let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  let currentDate = new Date();
  res.render('index', {
     title: 'Home',
     date: (currentDate.getMonth() +1) + "/"+ currentDate.getDate()+"/"+ currentDate.getFullYear()
    });
});

//get the about page
router.get('/about', (req, res, next) => {
  res.render('about', { title: 'About' });
});

module.exports = router;
