const prisma = require("../utils/prismaClient");

// CREATE ACCOUNT
const createAccount = async (req, res) => {
  try {
    const {
      bankName,
      shortName,
      accountNo,
      type,
      balance,
      logo,
      color,
      bgColor
    } = req.body;

    const userId = req.user.id;

    const account = await prisma.bankAccount.create({
      data: {
        bankName,
        shortName,
        accountNo,
        type: type || "SAVINGS",
        balance: balance || 0,
        logo,
        color,
        bgColor,
        userId
      }
    });

    res.status(201).json({
      success: true,
      message: "Bank account added successfully",
      data: account
    });
  } catch (error) {
    console.error("Error creating bank account:", error);

    // Handle duplicate account number
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: "This account number already exists. Please use a different number."
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create bank account"
    });
  }
};

// GET ALL ACCOUNTS
const getAccounts = async (req, res) => {
  try {
    const userId = req.user.id;

    const accounts = await prisma.bankAccount.findMany({
      where: { userId }
    });

    res.json({
      success: true,
      count: accounts.length,
      data: accounts
    });
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Failed to fetch accounts" });
  }
};

// DELETE ACCOUNT
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Verify the account belongs to the user
    const account = await prisma.bankAccount.findFirst({
      where: {
        id: Number(id),
        userId
      }
    });

    if (!account) {
      return res.status(404).json({ message: "Bank account not found" });
    }

    // Delete the account
    await prisma.bankAccount.delete({
      where: { id: Number(id) }
    });

    res.json({
      success: true,
      message: "Bank account deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting bank account:", error);
    res.status(500).json({ message: "Failed to delete bank account" });
  }
};

module.exports = { createAccount, getAccounts, deleteAccount };
