const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
import mongoose from 'mongoose';

const User = require('../Models/dbUser');


module.exports = function(passport:any) {
    passport.use(
      new LocalStrategy({ usernameField: 'email' }, (email:any, password:any, done:any) => {
        // Match user
        User.findOne({
          email: email
        }).then((user: { password: any; }) => {
          if (!user) {
            return done(null, false, { message: 'That email is not registered' });
          }
  
          // Match password
          bcrypt.compare(password, user.password, (err:string, isMatch:any) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        });
      })
    );
  
    passport.serializeUser(function(user:any, done:any) {
      done(null, user.id);
    });
  
    passport.deserializeUser(function(id:string, done:any) {
      User.findById(id, function(err:string, user:any) {
        done(err, user);
      });
    });
  };