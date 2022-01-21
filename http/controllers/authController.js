const User = require('./../../models/user');
const bcrypt = require('bcrypyt');
const passport = require('passport');

function authController(){
    return{
        login(req, res){
            res.send('auth/login')
        },
        postLogin(req,res, next){
            passport.authenticate('local', (err, user, info)=>{
                if(err){
                    req.flash('error', info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }
                req.login(user, (err)=>{
                    if(err){
                        req.flash('error', info.message);
                        return next(err);
                    }
                    
                    return res.redirect('/');
                })(req, res, next) // passport return a function 
            })
        },
        
        register(req, res){
            res.send('/auth/register');
        },

        async postRegister(req, res){
            const {name, email, password} = req.body;
            //Validate request
            if(!name || !email || !password){
                req.flash('error','All fields are required')
                req.flash('name', name);
                req.flash('email',  email);
                return res.redirect('/register')
            }

            //check if email exists
            User.exists({email:email},(err, result)=>{
                if(result){
                    req.flash('error', 'Email already registered!');
                    req.flash('name', name);
                    req.flash('email', email);
                    return res.redirect('/register') // response 
                }
            })

            // Hash password
            const hashedPassword  = await bcrypt.hash(password,10) // Parameters Info, bcrypt library//
            // won't work if not used with async and await. 

            //Create User
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            })

            user.save().then((user)=>{
                // Redirecting to orders Page/login page(automatically)
                return res.redirect('/');
            }).catch(err=>{
                req.flash('error','Some error occured!');
                return res.redirect('/register');
            });
        },

        logout(req,res){
            req.logout()
            return res.redirect('/login');
        }
    }
}

module.exports = authController;