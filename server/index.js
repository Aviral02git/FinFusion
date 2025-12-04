
const express = require("express");
const cors = require("cors");
const bankRoutes = require("./src/routes/bankRoutes.js");
const transactionRoutes = require("./src/routes/transactionRoutes");
const analyticsRoutes = require("./src/routes/analyticsRoutes");
require("dotenv").config();


// console.log("Environment loaded, PORT =", process.env.PORT);

const app = express();

// CORS - Allow all origins (required for Vercel deployments)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://fin-fusion-git-main-aviral-mishras-projects-eb5536f4.vercel.app",
      "https://fin-fusion-1prcb42fw-aviral-mishras-projects-eb5536f4.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use("/api/transactions", transactionRoutes);
const authRoutes = require("./src/routes/authRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/bank", bankRoutes);
app.use("/api/analytics", analyticsRoutes);
app.get("/", (req, res) => {
  res.send("finfusion backend running fast")
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))


