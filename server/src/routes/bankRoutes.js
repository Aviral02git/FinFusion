const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { createAccount, getAccounts } = require("../controllers/bankController");

const router = express.Router();

router.post("/create", verifyToken, createAccount);
router.get("/", verifyToken, getAccounts);

module.exports = router;


