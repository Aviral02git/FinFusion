const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { createAccount, getAccounts, deleteAccount } = require("../controllers/bankController");

const router = express.Router();

router.post("/create", verifyToken, createAccount);
router.get("/", verifyToken, getAccounts);
router.delete("/:id", verifyToken, deleteAccount);

module.exports = router;


