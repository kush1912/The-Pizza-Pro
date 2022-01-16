function cartController(req,res){
    return{
        index(){
            res.send('/cart');
        }
    }
}

module.exports = cartController;