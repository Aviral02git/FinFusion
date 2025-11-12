
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new bank account
const createAccount = async (req, res) => {
  try {
    const {bankname,accountNo,balance } = req.body;
    const userId = req.user.id; // user info comes from verifyToken

    const account = await prisma.bankAccount.create({
      data: { bankname, accountNo, balance, userId },
    });

    res.status(201).json(account);
  } catch (error) {
    console.error("Error creating bank account:", error);
    res.status(500).json({ message: "Failed to create bank account" });
  }
};

// Get all bank accounts for logged-in user
const getAccounts = async (req, res) => {
  try {
    const userId = req.user.id;
    const accounts = await prisma.bankAccount.findMany({
      where: { userId },
    });
    res.json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ message: "Failed to fetch accounts" });
  }
};

module.exports = { createAccount, getAccounts };
