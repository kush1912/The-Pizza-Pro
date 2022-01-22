function auth(req, res, next){
    if(req.isAuthenticated()){
        return next();   // process
    }
    return res.redirect('/login');
}

module.exports = auth;
// for protecting the authorized pages
