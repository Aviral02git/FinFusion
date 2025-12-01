const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const analytics = require("../controllers/analyticsController");

router.get("/summary", verifyToken, analytics.getSummary);
router.get("/spending-by-category", verifyToken, analytics.spendingByCategory);
router.get("/monthly-trends", verifyToken, analytics.monthlyTrends);
router.get("/top-merchants", verifyToken, analytics.topMerchants);
router.get("/net-worth", verifyToken, analytics.netWorth);

module.exports = router;
