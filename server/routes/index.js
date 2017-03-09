let express = require('express');
let mongoose = require('mongoose');
let passport = require('passport');
let router = express.Router();

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User Model - User object
// define the contact model
let contact = require('../models/contacts');

// create a function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}


/* GET home page. */
router.get('/', (req, res, next) => {
  let currentDate = new Date();
  res.render('content/index', {
     title: 'Home',
     contacts: '',
     displayName: req.user ? req.user.displayName : ''
//date: (currentDate.getMonth() +1) + "/"+ currentDate.getDate()+"/"+ currentDate.getFullYear()
    });
});

//get the about page
router.get('/about', (req, res, next) => {
  res.render('about', { title: 'About' });
});

//get the Contact me page
router.get('/contact', (req, res, next) => {
  res.render('content/contact', { 
    title: 'Contact me', 
    contact: '',
    displayName: req.user ? req.user.displayName : '' });
});

router.get('/login', (req, res, next)=>{
  // check to see if the user is not already logged in
  if(!req.user) {
    // render the login page
    res.render('auth/login', {
      title: "Login",
      contacts: '',
      messages: req.flash('loginMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
    return;
  } else {
    return res.redirect('/contacts'); // redirect to games list
  }
});

// POST /login - process the login attempt
router.post('/login', passport.authenticate('local', {
  successRedirect: '/', //redirects to home instead of contact list
  failureRedirect: '/login',
  failureFlash: 'bad login'
}));

// GET /register - render the registration view
router.get('/register', (req, res, next)=>{
   // check to see if the user is not already logged in
  if(!req.user) {
    // render the registration page
      res.render('auth/register', {
      title: "Register",
      contacts: '',
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName : ''
    });
    return;
  } else {
    return res.redirect('/contacts'); // redirect to games list
  }
});

// POST / register - process the registration submission
router.post('/register', (req, res, next)=>{
  User.register(
    new User({
      username: req.body.username,
      //password: req.body.password,
      email: req.body.email,
      displayName: req.body.displayName
    }),
    req.body.password,
    (err) => {
      if(err) {
        console.log('Error inserting new user');
        if(err.name == "UserExistsError") {
          req.flash('registerMessage', 'Registration Error: User Already Exists');
        }
        return res.render('auth/register', {
          title: "Register",
          contacts: '',
          messages: req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName : ''
        });
      }
      // if registration is successful
      return passport.authenticate('local')(req, res, ()=>{
        res.redirect('/contacts');
      });
    });
});

// GET /logout - process the logout request
router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect('/'); // redirect to the home page
});

module.exports = router;
