const mongoose = require('mongoose')
const Schema = mongoose.Schema  

const userScehema  = new Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true}, 
    password: {type:String,required:true},
    role: {type:String, default:'customer'}
},{timestamps:true})  
// time stamps will store the data when user registerd and loggedin
// role by default we will give value as customer,
// admin can not register themseleves, we will create them manually

module.exports = mongoose.model('User', userScehema) //collectionName, SchemaName
