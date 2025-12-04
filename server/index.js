const express = require("express");
const cors = require("cors");
require("dotenv").config();

const bankRoutes = require("./src/routes/bankRoutes.js");
const transactionRoutes = require("./src/routes/transactionRoutes");
const analyticsRoutes = require("./src/routes/analyticsRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

// REQUIRED when hosting on Render and calling via HTTPS (cookies/JWT)
app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://fin-fusion-wheat.vercel.app", // frontend
  "https://finfusion.onrender.com"      // backend live (Render domain)
];

// CORS Handling
app.use(
  cors({
    origin: function (origin, callback) {
      // allow no-origin calls (Render health checks, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS blocked: " + origin));
      }
    },
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Preflight CORS
app.options("*", cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bank", bankRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("FinFusion backend running smoothly 🚀");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
