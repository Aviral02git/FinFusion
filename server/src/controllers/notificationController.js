const prisma = require("../utils/prismaClient");

// CREATE NOTIFICATION (can be triggered after a transaction, card block, etc.)
const createNotification = async (req, res) => {
  try {
    const { title, message } = req.body;
    const userId = req.user.id;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        userId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Notification created",
      data: notification,
    });

  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Server error creating notification" });
  }
};

// GET ALL NOTIFICATIONS OF LOGGED-IN USER
const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      count: notifications.length,
      data: notifications,
    });

  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

// MARK NOTIFICATION AS READ
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await prisma.notification.update({
      where: { id: Number(id) },
      data: { read: true },
    });

    res.json({
      success: true,
      message: "Notification marked as read",
      data: notification,
    });

  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Failed to update notification" });
  }
};

// DELETE NOTIFICATION
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.notification.delete({
      where: { id: Number(id) },
    });

    res.json({
      success: true,
      message: "Notification deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ message: "Failed to delete notification" });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  deleteNotification,
};
