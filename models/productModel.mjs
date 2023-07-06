import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    price:{
        type: Number,
    },
    quantity:{
        type: Number,
    },
    other:{
        type: String
    }

})

export default mongoose.models.products || mongoose.model("products",productSchema)