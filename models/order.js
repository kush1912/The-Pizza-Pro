const mongoose = require('mongoose')
const Schema = mongoose.Schema  

const orderScehema  = new Schema({
    customerId: { 
                    type:mongoose.Schema.Types.ObjectId, 
                    ref:'User', // Model Reference
                    required:true
                },
    items: {type:Object, required:true}, 
    phone: {type:string,required:true},
    address: {type:String, required: true},
    paymentType: {type:string, default:'COD'},
    status: {type:String, default:'order-placed'},
},{timestamps:true})  

module.exports = mongoose.model('Order', orderScehema) //collectionName, SchemaName
