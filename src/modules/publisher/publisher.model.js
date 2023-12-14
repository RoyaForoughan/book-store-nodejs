const { Schema , default:mongoose, model } = require("mongoose");

const PublisherSchema = new Schema({
    name:{type:String , required:true},
    address: {type:AddressSchema },
    phone:{type:String},
    email:{type:String , unique:true , lowercase:true , trim:true},
    books:{type:[mongoose.Types.ObjectId] , ref: 'Book'}
})

const PublisherModel = model('Publisher' , PublisherSchema)
module.exports = PublisherModel