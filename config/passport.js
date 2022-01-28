
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy =  require('passport-google').Strategy
const Facebook = require('passport-facebook').Strategy
const User = require('./../models/user');
const bcrypt = require('bcrypt')

function init(passport){
    passport.use(new LocalStrategy({ usernameField:'email'}, async (email, password, done)=>{
        //Login
        //Check if email exists
        const user = await User.findOne({email:email})
        if(err) throw err;
        if(!user){
            return done(null, false, {message: 'No user registered with this email!'})
        } 

        bcrypt.compare(password, user.password).then(match=>{
            if(match){
                return  done(null, user, {message: 'Logged in Successfully!'});
            }
            return done(null, false, {message: 'Wrong UserName or Password!'});
        }).catch(err=>{
            return done(null, false, {message: 'Some Internal Error Occured!'});
        })
    }));

    //Stores a cookie inside a browser
    passport.serializeUser((user, done)=>{
        done(null, user._id);
    })

    // takes that cookie and unravels it
    passport.deserializeUser((id,done)=>{
        User.findById(id,(err, user)=>{
            done(err, user);
        })
    })
    
}

module.exports = init