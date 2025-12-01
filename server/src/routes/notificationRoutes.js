const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/authMiddleware");
const {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

router.post("/create", verifyToken, createNotification);
router.get("/", verifyToken, getNotifications);
router.put("/read/:id", verifyToken, markAsRead);
router.delete("/:id", verifyToken, deleteNotification);

module.exports = router;
