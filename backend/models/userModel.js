import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    lname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    addressLine1:{
        type:String,
        required:true
    },
    addressLine2:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
      type: Number,
      default: 0,
    },

},{timestamps:true}
);

export default mongoose.model('users',userSchema)