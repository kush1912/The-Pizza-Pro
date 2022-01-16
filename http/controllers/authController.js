function authController(){
    return{
        login(req,res){
            res.send('auth/login')
        },
        register(req,res){
            res.send('/auth/register');
        }
    }
}

module.exports = authController;