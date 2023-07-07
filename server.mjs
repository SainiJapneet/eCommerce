import express from "express";
import dbConnect from "./models/dbConnect.mjs";
import routes from './routes/routes.mjs'

const app = express();
dbConnect();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api',routes)
const port = 8080;
app.listen(port, ()=>{
    console.log("Server running on port " + port);
})