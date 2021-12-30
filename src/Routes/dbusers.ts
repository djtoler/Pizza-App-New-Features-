import express from "express";
import { registerPartials } from "hbs";
const bcrypt = require('bcryptjs');
const passport = require('passport');



const dbusers = express.Router();
const User = require('../Models/dbUser')

dbusers.get('/', (req, res) => {
    res.render('dbusers')
});

dbusers.get('/login', (req, res) => {
    res.render('dblogin')
});

dbusers.get('/register', (req, res) => {
    res.render('dbregister')
});

dbusers.post('/register', (req, res) => {
    const {name, email, password, password2} = req.body;
    let errors: { message: string; }[] = [];

    if (!name || !email || !password || !password2) {
        errors.push( {message: 'ERROR: All fields are required to register'} )
    }
    if (password !== password2) {
        errors.push( {message: 'ERROR: Passwords do not match, try again'} )
    }
    if (password.length < 6) {
        errors.push( {message: 'ERROR: Passwords MUST be at least 6 characters'} )
    }
    if (errors.length > 0) {
        res.render('dbregister', {
            name, 
            email:email,
            password,
            password2,
            errMessages: errors
        });
    } 
    else {
        User.findOne({email:email})
        .then((user: any) => {
            if (user) {
                errors.push({message: 'This email already in use'});
                res.render('dbregister', {
                    name, 
                    email,
                    password,
                    password2,
                    errMessages: errors
                    });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                    });
                    bcrypt.genSalt(10, (err: any, salt: any) => {
                        bcrypt.hash(newUser.password, salt, (err: any, hash: any) => {
                            if (err) {
                                throw err;
                            } else {
                                newUser.password = hash;
                                newUser
                                .save()
                                .then((user: any) => {
                                    res.redirect('/dbusers/login')
                                    })
                                .catch((err: any) => {
                                    console.log(err) 
                                    })
                            };
                    });
                });
            };
        });
    };
});


dbusers.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dbdashboard',
        failureRedirect: '/dbusers/login',
        failureFlash: true
        })(req, res, next);
    });

dbusers.get('/logout', (req, res) => {
    req.logout();
    // req.flash('success_msg', 'You are logged out');
    res.redirect('/dbusers/login');
    });
  


export default dbusers;

