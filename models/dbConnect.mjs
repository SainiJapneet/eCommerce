import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
async function dbConnect(){
    const connectionString = process.env.DB_URL;
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        writeConcern: {
            w: "majority",
            wtimeout: 0,
          },
    }).then(()=>{
        console.log("Connected to DB")
    }).catch((error)=>{
        console.log("Can't connect to DB : " + error)
    })
}

export default dbConnect;