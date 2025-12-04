const { PrismaClient } = require("@prisma/client");
require('dotenv').config();
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data (Transactions, Notifications, BankAccounts) but NOT Users
  await prisma.notification.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.bankAccount.deleteMany();
  

  const demoUsers = [
    {
      name: "Aviral Mishra",
      email: "aviral@example.com",
      password: "$2b$10$abcdefghijklmnopqrstuvwxyz123456", // hashed "password123"
      role: "USER",
    },
    {
      name: "Priya Sharma",
      email: "priya@example.com",
      password: "$2b$10$abcdefghijklmnopqrstuvwxyz123456",
      role: "USER",
    },

    {
      name: "Admin User",
      email: "admin@finfusion.com",
      password: "$2b$10$abcdefghijklmnopqrstuvwxyz123456",
      role: "ADMIN",
    }
  ];

  for (const u of demoUsers) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {}, // Don't update if exists
      create: u,
    });
  }

  console.log("✅ Users synced");

  // ============================================
  // 🔄 FETCH ALL USERS
  // ============================================
  const allUsers = await prisma.user.findMany();
  console.log(`Found ${allUsers.length} users to populate.`);

  const now = new Date();
  const getDateDaysAgo = (days) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  // ============================================
  // 🏦 & 💸 POPULATE DATA FOR EACH USER
  // ============================================

  for (const user of allUsers) {
    console.log(`Processing user: ${user.name} (${user.email})`);

    // 1. Create Bank Accounts
    const sbi = await prisma.bankAccount.create({
      data: {
        userId: user.id,
        bankName: "State Bank of India",
        shortName: "SBI",
        accountNo: `SBI-${user.id}-${Math.floor(Math.random() * 10000)}`,
        type: "SAVINGS",
        balance: 125840.50,
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg",
        color: "#1E6898",
        bgColor: "#E6F2FF",
      },
    });

    const hdfc = await prisma.bankAccount.create({
      data: {
        userId: user.id,
        bankName: "HDFC Bank",
        shortName: "HDFC",
        accountNo: `HDFC-${user.id}-${Math.floor(Math.random() * 10000)}`,
        type: "CURRENT",
        balance: 89320.75,
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg",
        color: "#C62828",
        bgColor: "#FDECEC",
      },
    });

    const icici = await prisma.bankAccount.create({
      data: {
        userId: user.id,
        bankName: "ICICI Bank",
        shortName: "ICICI",
        accountNo: `ICICI-${user.id}-${Math.floor(Math.random() * 10000)}`,
        type: "SAVINGS",
        balance: 67450.25,
        logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg",
        color: "#F57C00",
        bgColor: "#FFF3E0",
      },
    });

    // 2. Create Transactions
    const transactions = [
      // Recent transactions (Current Month)
      { userId: user.id, accountId: sbi.id, type: "CREDIT", amount: 85000, category: "INCOME", description: "Salary Credit - November", timestamp: getDateDaysAgo(2) },
      { userId: user.id, accountId: sbi.id, type: "DEBIT", amount: 2499, category: "SHOPPING", description: "Amazon - Electronics", timestamp: getDateDaysAgo(3) },
      { userId: user.id, accountId: sbi.id, type: "DEBIT", amount: 450, category: "FOOD", description: "Starbucks Coffee", timestamp: getDateDaysAgo(4) },
      { userId: user.id, accountId: hdfc.id, type: "DEBIT", amount: 1850, category: "BILLS", description: "Electricity Bill", timestamp: getDateDaysAgo(5) },
      { userId: user.id, accountId: hdfc.id, type: "DEBIT", amount: 680, category: "FOOD", description: "Swiggy Order", timestamp: getDateDaysAgo(6) },
      { userId: user.id, accountId: icici.id, type: "DEBIT", amount: 280, category: "TRANSPORT", description: "Uber Ride", timestamp: getDateDaysAgo(7) },
      { userId: user.id, accountId: sbi.id, type: "DEBIT", amount: 649, category: "ENTERTAINMENT", description: "Netflix Subscription", timestamp: getDateDaysAgo(8) },
      { userId: user.id, accountId: hdfc.id, type: "CREDIT", amount: 1299, category: "REFUND", description: "Flipkart Refund", timestamp: getDateDaysAgo(9) },
      { userId: user.id, accountId: sbi.id, type: "DEBIT", amount: 3500, category: "SHOPPING", description: "Grocery Shopping - BigBasket", timestamp: getDateDaysAgo(10) },
      { userId: user.id, accountId: icici.id, type: "DEBIT", amount: 1200, category: "TRANSPORT", description: "Petrol Pump", timestamp: getDateDaysAgo(11) },
      { userId: user.id, accountId: hdfc.id, type: "DEBIT", amount: 4500, category: "ENTERTAINMENT", description: "Weekend Dinner & Drinks", timestamp: getDateDaysAgo(12) },
      { userId: user.id, accountId: sbi.id, type: "DEBIT", amount: 15000, category: "TRANSFER", description: "Transfer to Mom", timestamp: getDateDaysAgo(13) },
      { userId: user.id, accountId: sbi.id, type: "DEBIT", amount: 299, category: "BILLS", description: "Spotify Premium", timestamp: getDateDaysAgo(14) },
      { userId: user.id, accountId: hdfc.id, type: "DEBIT", amount: 799, category: "SHOPPING", description: "Uniqlo T-shirt", timestamp: getDateDaysAgo(15) },

      // Last Month
      { userId: user.id, accountId: sbi.id, type: "CREDIT", amount: 85000, category: "INCOME", description: "Salary Credit - October", timestamp: getDateDaysAgo(32) },
      { userId: user.id, accountId: sbi.id, type: "DEBIT", amount: 15000, category: "BILLS", description: "Credit Card Payment", timestamp: getDateDaysAgo(35) },
      { userId: user.id, accountId: hdfc.id, type: "DEBIT", amount: 3500, category: "SHOPPING", description: "Myntra - Clothing", timestamp: getDateDaysAgo(38) },
      { userId: user.id, accountId: icici.id, type: "DEBIT", amount: 8500, category: "BILLS", description: "House Rent", timestamp: getDateDaysAgo(40) },
      { userId: user.id, accountId: sbi.id, type: "DEBIT", amount: 1200, category: "FOOD", description: "Zomato - Multiple Orders", timestamp: getDateDaysAgo(42) },
      { userId: user.id, accountId: hdfc.id, type: "DEBIT", amount: 2500, category: "ENTERTAINMENT", description: "BookMyShow - Movie Tickets", timestamp: getDateDaysAgo(45) },
      { userId: user.id, accountId: sbi.id, type: "DEBIT", amount: 450, category: "TRANSPORT", description: "Uber to Airport", timestamp: getDateDaysAgo(46) },
      { userId: user.id, accountId: sbi.id, type: "DEBIT", amount: 12000, category: "TRANSPORT", description: "Flight Booking", timestamp: getDateDaysAgo(47) },
      { userId: user.id, accountId: icici.id, type: "DEBIT", amount: 2000, category: "SHOPPING", description: "Decathlon Sports Gear", timestamp: getDateDaysAgo(48) },

      // 2 Months Ago
      { userId: user.id, accountId: sbi.id, type: "CREDIT", amount: 85000, category: "INCOME", description: "Salary Credit - September", timestamp: getDateDaysAgo(62) },
      { userId: user.id, accountId: hdfc.id, type: "DEBIT", amount: 12000, category: "SHOPPING", description: "Amazon - Laptop Accessories", timestamp: getDateDaysAgo(65) },
      { userId: user.id, accountId: sbi.id, type: "DEBIT", amount: 4500, category: "TRANSPORT", description: "Ola - Monthly Rides", timestamp: getDateDaysAgo(70) },
      { userId: user.id, accountId: icici.id, type: "DEBIT", amount: 899, category: "ENTERTAINMENT", description: "Amazon Prime Subscription", timestamp: getDateDaysAgo(75) },
      { userId: user.id, accountId: sbi.id, type: "DEBIT", amount: 5000, category: "FOOD", description: "Monthly Groceries", timestamp: getDateDaysAgo(76) },
      { userId: user.id, accountId: hdfc.id, type: "DEBIT", amount: 1500, category: "BILLS", description: "Broadband Bill", timestamp: getDateDaysAgo(78) },
    ];

    await prisma.transaction.createMany({ data: transactions });

    // 3. Create Notifications
    await prisma.notification.createMany({
      data: [
        { userId: user.id, title: "Payment Successful", message: "Your payment of ₹2,499 was successful", read: false },
        { userId: user.id, title: "Low Balance Alert", message: "Your ICICI account balance is below ₹70,000", read: false },
        { userId: user.id, title: "Salary Credited", message: "₹85,000 credited to your SBI account", read: true },
      ],
    });
  }

  console.log("✅ Data populated for all users");

  // ============================================
  // 📊 SUMMARY
  // ============================================

  const userCount = await prisma.user.count();
  const accountCount = await prisma.bankAccount.count();
  const transactionCount = await prisma.transaction.count();
  const notificationCount = await prisma.notification.count();

  console.log("\n🎉 Seed completed successfully!");
  console.log("=====================================");
  console.log(`👥 Users: ${userCount}`);
  console.log(`🏦 Bank Accounts: ${accountCount}`);
  console.log(`💸 Transactions: ${transactionCount}`);
  console.log(`🔔 Notifications: ${notificationCount}`);
  console.log("=====================================\n");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
