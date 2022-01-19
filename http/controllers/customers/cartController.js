function cartController(req,res){
    return{
        index(){
            res.send('/cart');
        },

        update(req,res){
            //for the first time creating cart and adding basic object structure
            if(!req.session.cart){
                req.session.cart={
                    items:{},
                    totalQty:0,
                    totalPrice:0
                }
            }
            let cart = req.session.cart

            //check if item does not exist in cart
            if(cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item: req.body,
                    qty:1
                }
                cart.totalQty = cart.totalQty+1;
                cart.totalPrice = cart.totalPrice + req.body.price;
            }
            else{
                cart.items[req.body._id].qty = cart.items[req.body._id].qty+1
                cart.totalQty = cart.totalQty+1;
                cart.totalPrice = cart.totalPrice + req.body.price;
            }
            return res.json({
                data:"Cart Updated!"  //Send total Qty as response so that it could be updated in the front-end side. retry option in angular to make the call again and again if the api fails;
            });
        }
    }
}

module.exports = cartController;