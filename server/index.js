
const express=require("express");
const cors=require("cors");
const bankRoutes = require("./src/routes/bankRoutes.js");
const transactionRoutes = require("./src/routes/transactionRoutes");
const analyticsRoutes = require("./src/routes/analyticsRoutes");
require("dotenv").config();


// console.log("Environment loaded, PORT =", process.env.PORT);

const app=express();

app.use(cors({
    origin: ["https://fin-fusion-wheat.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));
  
app.use(express.json());
app.use("/api/transactions", transactionRoutes);

const authRoutes= require("./src/routes/authRoutes");


app.use("/api/auth", authRoutes); 

app.use("/api/bank", bankRoutes);

app.use("/api/analytics", analyticsRoutes);

app.get("/",(req,res)=>{
    res.send("finfusion backend running fast")
});

const PORT=process.env.PORT || 8080;

app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))


