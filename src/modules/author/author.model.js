const { Schema , default:mongoose, model } = require("mongoose");

const AuthorSchema = new Schema({
    first_name:{type:String , required:true},
    last_name:{type:String , required:true},
    biography:{type:String},
    birthDate:{type:Date},
    deathDate:{type:Date},
    books:{type: [mongoose.Types.ObjectId] , ref:'Book'}
})

const AuthModel = model('Author' , AuthorSchema)
module.exports = AuthModel