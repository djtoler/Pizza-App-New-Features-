const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
import mongoose from 'mongoose';

const User = require('../Models/dbUser');


module.exports = function (passport: any) {
    passport.use(
        new LocalStrategy({
            usernameField: 'email',
            // passwordField: 'password'
            }, 
            (email: string, password: any, done: any) => {
            User.findOne( {email:email} )
                .then((user: any) => {
                    if ( !user ) {
                        console.log("didnt A find user");
                        return done(null, false, { message: 'That email is not registered'} )
                    }
                    bcrypt.compare(password, user.password, (err: any, isMatch: boolean) => {
                        if (err) throw "line31:" + err;
                        console.log( "Error is:" + err);
                        if (isMatch) {
                            console.log( "Found a match:" + isMatch);
                            return done(null, user)
                            console.log( "Found a match:" + isMatch);
                            } else {
                            console.log( "Found a match:" + isMatch);
                            return done(null, false, { message: 'Password incorrect'} )
                            }
                    });
                })
                .catch((err: any) => {
                    console.log( "line31:" + err);
                    
                })
        })
    );        
    passport.serializeUser((user: any, done: any) => {
        done(null, user.id);
    });    
    passport.deserializeUser((id: any, done: any) => {
        User.findById(id, (err:any, user:any) => {
          done(err, user);
        });
    });
};
