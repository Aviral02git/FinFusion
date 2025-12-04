const prisma = require("../utils/prismaClient");

// CREATE TRANSACTION
const createTransaction = async (req, res) => {
  try {
    const { amount, type, description, accountId, category } = req.body;
    const userId = req.user.id;

    // Convert amount safely
    const amt = Number(amount);
    if (isNaN(amt) || amt <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // Validate enum type
    const txType = type?.toUpperCase();
    if (!["CREDIT", "DEBIT"].includes(txType)) {
      return res.status(400).json({ message: "Invalid transaction type" });
    }

    // Validate category enum (matches Prisma enum)
    const validCategories = [
      "FOOD", "SHOPPING", "TRANSPORT", "BILLS", "ENTERTAINMENT",
      "TRANSFER", "INCOME", "REFUND", "OTHER"
    ];

    const txCategory = category?.toUpperCase() || "OTHER";
    if (!validCategories.includes(txCategory)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    // Verify bank account belongs to the user
    const account = await prisma.bankAccount.findFirst({
      where: { id: Number(accountId), userId },
    });

    if (!account) {
      return res.status(404).json({ message: "Bank account not found" });
    }

    // Prevent negative balance for debit
    if (txType === "DEBIT" && account.balance < amt) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Calculate updated balance
    const newBalance =
      txType === "CREDIT"
        ? account.balance + amt
        : account.balance - amt;

    // 🔥 ATOMIC OPERATION (Transaction + Balance Update + Notification)
    const result = await prisma.$transaction([
      // 1️⃣ Create transaction record
      prisma.transaction.create({
        data: {
          amount: amt,
          type: txType,
          category: txCategory,
          description,
          accountId: Number(accountId),
          userId,
        },
      }),

      // 2️⃣ Update bank balance
      prisma.bankAccount.update({
        where: { id: Number(accountId) },
        data: { balance: newBalance },
      }),

      // 3️⃣ Create notification
      prisma.notification.create({
        data: {
          title: txType === "CREDIT" ? "Money received" : "Payment made",
          message: `₹${amt} ${txType === "CREDIT" ? "added to" : "deducted from"} your account`,
          userId,
        },
      }),
    ]);

    res.status(201).json({
      message: "Transaction successful",
      transaction: result[0],
      updatedBalance: newBalance,
    });

  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Failed to create transaction" });
  }
};

// GET TRANSACTIONS WITH PAGINATION + FILTERING + SORTING
const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      accountId,
      page = 1,
      limit = 10,
      search = "",
      category,
      type,
      sortBy = "timestamp",
      sortOrder = "desc",
      startDate,
      endDate,
      minAmount,
      maxAmount
    } = req.query;

    const skip = (page - 1) * limit;

    // Build filters object
    const filters = {
      userId,
      ...(accountId && { accountId: Number(accountId) }),
      ...(category && { category: category.toUpperCase() }),
      ...(type && { type: type.toUpperCase() }),
      ...(search && {
        OR: [
          { description: { contains: search, mode: "insensitive" } },
          { category: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    // Add date range filtering
    if (startDate || endDate) {
      filters.timestamp = {};
      if (startDate) {
        filters.timestamp.gte = new Date(startDate);
      }
      if (endDate) {
        // Set to end of day for endDate
        const endDateTime = new Date(endDate);
        endDateTime.setHours(23, 59, 59, 999);
        filters.timestamp.lte = endDateTime;
      }
    }

    // Add amount range filtering
    if (minAmount || maxAmount) {
      filters.amount = {};
      if (minAmount) {
        filters.amount.gte = Number(minAmount);
      }
      if (maxAmount) {
        filters.amount.lte = Number(maxAmount);
      }
    }

    // Build orderBy object
    const validSortFields = ["timestamp", "amount", "type"];
    const sortField = validSortFields.includes(sortBy) ? sortBy : "timestamp";
    const sortDirection = sortOrder === "asc" ? "asc" : "desc";

    const orderBy = { [sortField]: sortDirection };

    const transactions = await prisma.transaction.findMany({
      where: filters,
      orderBy,
      skip: Number(skip),
      take: Number(limit),
      include: {
        account: true,
      },
    });

    const total = await prisma.transaction.count({ where: filters });

    res.json({
      success: true,
      transactions,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

module.exports = { createTransaction, getTransactions };
