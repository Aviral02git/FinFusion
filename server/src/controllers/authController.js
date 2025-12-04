const prisma = require("../utils/prismaClient");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check user existence
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with sample bank account and transactions in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1️⃣ Create user
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      // 2️⃣ Create a sample bank account for the new user
      const sampleAccount = await tx.bankAccount.create({
        data: {
          userId: newUser.id,
          accountNumber: `DEMO${Math.floor(100000 + Math.random() * 900000)}`,
          bankName: "Sample Bank",
          accountType: "SAVINGS",
          balance: 50000, // Starting balance of ₹50,000
        },
      });

      // 3️⃣ Create sample transactions for the new user
      const sampleTransactions = [
        {
          amount: 35000,
          type: "CREDIT",
          category: "INCOME",
          description: "Monthly Salary",
          accountId: sampleAccount.id,
          userId: newUser.id,
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        },
        {
          amount: 2500,
          type: "DEBIT",
          category: "SHOPPING",
          description: "Online Shopping - Amazon",
          accountId: sampleAccount.id,
          userId: newUser.id,
          timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        },
        {
          amount: 450,
          type: "DEBIT",
          category: "FOOD",
          description: "Starbucks Coffee",
          accountId: sampleAccount.id,
          userId: newUser.id,
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        },
        {
          amount: 320,
          type: "DEBIT",
          category: "TRANSPORT",
          description: "Uber Ride",
          accountId: sampleAccount.id,
          userId: newUser.id,
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        },
        {
          amount: 1200,
          type: "DEBIT",
          category: "BILLS",
          description: "Electricity Bill",
          accountId: sampleAccount.id,
          userId: newUser.id,
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        },
        {
          amount: 850,
          type: "DEBIT",
          category: "ENTERTAINMENT",
          description: "Movie Tickets",
          accountId: sampleAccount.id,
          userId: newUser.id,
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        },
        {
          amount: 5000,
          type: "CREDIT",
          category: "REFUND",
          description: "Product Return Refund",
          accountId: sampleAccount.id,
          userId: newUser.id,
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        },
        {
          amount: 680,
          type: "DEBIT",
          category: "FOOD",
          description: "Restaurant Dinner",
          accountId: sampleAccount.id,
          userId: newUser.id,
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        },
        {
          amount: 1500,
          type: "DEBIT",
          category: "SHOPPING",
          description: "Clothing Store",
          accountId: sampleAccount.id,
          userId: newUser.id,
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        },
        {
          amount: 200,
          type: "DEBIT",
          category: "TRANSPORT",
          description: "Metro Card Recharge",
          accountId: sampleAccount.id,
          userId: newUser.id,
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        },
      ];

      // Create all sample transactions
      await tx.transaction.createMany({
        data: sampleTransactions,
      });

      // 4️⃣ Create a welcome notification
      await tx.notification.create({
        data: {
          title: "Welcome to FinFusion! 🎉",
          message: "Your account has been created with sample transactions to help you explore the app.",
          userId: newUser.id,
        },
      });

      return newUser;
    });

    // JWT PAYLOAD FIX (must use `id`)
    const token = jwt.sign(
      {
        id: result.id,
        email: result.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: result.id,
        name: result.name,
        email: result.email,
      },
      token,
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password are required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // JWT PAYLOAD FIX
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser };
