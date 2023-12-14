const { Schema , Types , mongoose, model } = require("mongoose");

const OtpSchema = new Schema({
    code:{type:String , required:false , default:undefined},
    expiresIn:{type:Number , required:false , default:0},
})
const AddressSchema = new Schema({
    province:{type:String , required:true , lowercase:true},
    city:{type:String , required:true , lowercase:true},
    zipCode:{type:String , required:true}

})

const UserSchema = new Schema({
    first_name:{type:String},
    last_name:{type:String},
    username:{type:String ,lowercase:true},
    mobile:{type:String , unique:true , required:true},
    email:{type:String , lowercase:true},
    password:{type:String},
    otp:{type: OtpSchema},
    verifiedMobile:{type:Boolean,default:false , required:true},
    accessToken:{type:String},
    bills:{type:[] , default:[]},
    discount:{type:Number , default:0},
    birthday:{type:String},
    Role:{type:String , default:'USER'},
    address:{type: AddressSchema , required:false},
    Books:{type:[mongoose.Types.ObjectId] , ref: 'book' , default:[]}   
} , {
    timestamps:true
})

const UserModel = model('user' , UserSchema)
module.exports = UserModel