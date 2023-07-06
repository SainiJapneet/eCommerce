import express from "express";
import dbConnect from "./models/dbConnect.mjs";
import routes from './routes/routes.mjs'

const app = express();
dbConnect();

//cors error
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods","POST, GET, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/api',routes)
const port = 8080;
app.listen(port, ()=>{
    console.log("Server running on port " + port);
})