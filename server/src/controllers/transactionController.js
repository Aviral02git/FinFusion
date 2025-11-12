const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


// ✅ Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { amount, type, description, accountId } = req.body;
    const userId = req.user.id;

    // Check if the account belongs to the logged-in user
    const account = await prisma.bankAccount.findFirst({
      where: { id: accountId, userId },
    });

    if (!account) {
      return res.status(404).json({ message: "Bank account not found" });
    }

    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        type,
        description,
        accountId,
      },
    });

    // Update account balance
    const newBalance =
      type === "credit"
        ? account.balance + parseFloat(amount)
        : account.balance - parseFloat(amount);

    await prisma.bankAccount.update({
      where: { id: accountId },
      data: { balance: newBalance },
    });

    res.status(201).json({ message: "Transaction successful", transaction });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Failed to create transaction" });
  }
};

// ✅ Get all transactions for a user's account
const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accountId, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    const transactions = await prisma.transaction.findMany({
      where: {
        account: { userId: userId },
        ...(accountId && { accountId: parseInt(accountId) }),
      },
      orderBy: { createdAt: "desc"},
      skip: parseInt(skip),
      take: parseInt(limit),
    });

    const total = await prisma.transaction.count({
      where: {
        account: { userId: userId },
        ...(accountId && { accountId: parseInt(accountId) }),
      },
    });

    res.json({
      transactions,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

module.exports = { createTransaction, getTransactions };
