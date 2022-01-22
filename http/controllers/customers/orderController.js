const Order = require('./../../../models/order');
function orderController(){
    return {
        async index(req, res){
            const orders =  await Order.find({customerId:req.user._id})
            res.send('customer/Orders', {orders:orders})  //send it to front-end.
            console.log(orders);

        },

        store(Req,res){
            //  console.log(`Order: ${req.body}`);
            //Validate Request
            const {phone, address} = req.body
            if(!phone || !address){
                req.flash('error', 'All fields are required')
                return res.redirect('/cart');
            }

            const order =  new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            })

            order.save().then(result=>{
                req.flash('success', 'Order Placed Successfully!');
                return res.redirect('/orders');
            }).catch(err=>{
                req.flash('error', 'Something Went Wrong')
                return res.redirect('/cart')
            })
        }
    }
}

module.exports = orderController;