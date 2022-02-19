const express = require('express');
const dbusers = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
dbusers.get('/login', forwardAuthenticated, (req:any, res:any) => res.render('login'));

// Register Page
dbusers.get('/register', forwardAuthenticated, (req:any, res:any) => res.render('register'));

// Register
dbusers.post('/register', (req:any, res:any) => {
  const { name, email, password, password2 } = req.body;
  let errors:any = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then((user: any) => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err: any, salt: any) => {
          bcrypt.hash(newUser.password, salt, (err: any, hash: any) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user: any) => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch((err: any) => console.log(err));
          });
        });
      }
    });
  }
});

// Login
dbusers.post('/login', (req:any, res:any, next:any) => {
  passport.authenticate('local', {
    successRedirect: '/dbdashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
dbusers.get('/logout', (req:any, res:any) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});



// if (  req.isAuthenticated()  ) {
//     res.render("chatindex")
// }
// else {
//     res.redirect('/login')
// }

export default dbusers;