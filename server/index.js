
const express=require("express");
const cors=require("cors");
const bankRoutes = require("./src/routes/bankRoutes.js");
const transactionRoutes = require("./src/routes/transactionRoutes");
require("dotenv").config();


// console.log("Environment loaded, PORT =", process.env.PORT);

const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/transactions", transactionRoutes);

const authRoutes= require("./src/routes/authRoutes");

app.use("/api/auth", authRoutes); 

app.use("/api/bank", bankRoutes);


app.get("/",(req,res)=>{
    res.send("finfusion backend running fast")
});

const PORT=process.env.PORT || 8080;

app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))


