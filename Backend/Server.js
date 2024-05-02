import express, { json } from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import Registerroutes from "./Routes/Registerroutes.js"
const Mongo_URL="mongodb+srv://Ritesh:123@cluster1.lgo3ddb.mongodb.net/Vote";
const app = express();
app.use(json());
app.use(cors());
app.use(Registerroutes);
const PORT = 8080;
app.get('/', (req, res) => {
    return res.status(200).send({
        message: "welcome"
    });
});
mongoose.connect(Mongo_URL)
.then(()=>{
    console.log("connnected");
    app.listen(PORT, () => {
        console.log(`server is running ${PORT}`);
    });
    
})
.catch(()=>{
    console.log("error");
})