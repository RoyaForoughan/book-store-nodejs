const { Schema , Types , default:mongoose, model } = require("mongoose");


const BookSchema = new Schema({
    title:{type:String , required:true},
    authors:{type: mongoose.Types.ObjectId , ref:'Author'},
    isbn:{type:String , unique:true , required:true},
    description:{type:String},
    publishedDate:{type:Date , required:true},
    price:{type:Number , required:true},
    stockQuantity:{type:Number , default:0},
    genre:{type:String },
    coverImageURL:{type:String},
    publisher:{type:mongoose.Types.ObjectId , ref:'Publisher'},
},{
    timestamps:true
})

const BookModel = model('Book' , BookSchema)
module.exports = BookModel
