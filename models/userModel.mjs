import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Email is a required field"],
        unique: [true, "This Email already exists"]
    },
    password:{
        type: String,
        required: [true, "Password is a required field"]
    },
    age:{
        type: Number,
    },
    address:{
        type: String,
        required: [true, "Email is a required field"]
    }
})

export default mongoose.model.myUser || mongoose.model("myUser",userSchema)