const { Schema, model } = require("mongoose");

const RoleSchema = new Schema({
    name:{type:String , unique:true, required:true},
    description:{type:String},
    permissions:{type:[String] , default:'User'}
})

const RoleModel = model('Role' , RoleSchema)
module.exports = RoleModel