const mongoose = require('mongoose')
const Schema = mongoose.Schema  //Class and constructor function variables follow Title Case 

const menuScehema  = new Schema({
    name: {type:String, required:true},
    image: {type:String, required:true}, //always store the path to the image
    price: {type:Number,required:true},
    size: {type:String, required:true}
})

module.exports = mongoose.model('Menu', menuScehema) //collectionName, SchemaName

//Model - singular
//Models - Plural naming convention