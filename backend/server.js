import express from "express"
 import Broute from "./routes/bookRoute.js"
import mongoose from "mongoose"

async function connectDB() {
     try {
        await mongoose.connect("mongodb://localhost:27017/library")
        console.log("Database connected");
    } catch (err) {
        console.log(err)
      }
}

const app = express()
const PORT = 3000;

app.use(express.json())
app.use("/api/books", Broute);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "You are at home page"
    });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is listening")
    });
});











// import express from 'express'
// import Broute from './routes/bookRoute'
// import mongoose from 'mongoose'
// function connectDB(){
//     try{
//         mongoose.connect("mongodb://localhost:27017/")
//         return res.status(200).json({
//             message: "Database connected"
//         })
//     }catch(err){
//         console.log(err)
//         return res.status(500).json({
//             message: "Somethong went wrong"
//         })
//     }
// }

// const app = express()
// const PORT = 3000

// app.get("/api/books", (req, res)=>{
//     res.json({message: 'You are at home page'})
// })

// app.listen(PORT, (req,res)=>{
//     console.log("Server is listening")
// })