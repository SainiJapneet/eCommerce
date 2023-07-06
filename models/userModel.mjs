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
        type: String
    }
})

export default mongoose.models.myUser || mongoose.model("myUser",userSchema)