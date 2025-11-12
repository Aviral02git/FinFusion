const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const {
  createTransaction,
  getTransactions,
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/create", verifyToken, createTransaction);
router.get("/", verifyToken, getTransactions);

module.exports = router;
