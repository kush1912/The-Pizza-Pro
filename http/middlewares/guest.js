//If the user is already logged, he should not be allowed to go to login/ register fields manually - kinda like routeguards but from backends using middlewares 

function guest (req,res, next){
    if(!req.isAuthenticated()){
        return next()
    }
    return res.redirect('/')
}

module.exports = guest;