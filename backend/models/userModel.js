import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name :{type:String , required:true},
    email :{type:String , required:true,unique:true},
    password :{type:String , required:true},
    verfiyOtp:{type:String ,default:''},
    verfiyOtpExpireAt:{type:Number ,default:0},
    isAccountverified:{type:Boolean ,default:false},
    resetOtp:{type:String ,default:''},
    resetOtpExpireAt:{type:Number ,default:0},
})

const userModel = mongoose.models.user  || mongoose.model('user',userSchema);

export default userModel;
// import mongoose from "mongoose";
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });

// export default mongoose.model("User", userSchema);  // ✅ Use a simple collection name like "User"
