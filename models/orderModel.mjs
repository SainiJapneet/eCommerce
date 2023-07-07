import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    products:{
        type: String
    },
    quantity:{
        type: Number
    },
    price:{
        type: Number
    }
});

export default mongoose.models.Orders || mongoose.model("Orders",orderSchema);