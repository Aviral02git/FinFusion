const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.auditLog.deleteMany();
  await prisma.transfer.deleteMany();
  await prisma.chequeRequest.deleteMany();
  await prisma.card.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.bankAccount.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();

  // ============================================
  // 👤 CREATE USERS
  // ============================================
  const user1 = await prisma.user.create({
    data: {
      name: "Aviral Mishra",
      email: "aviral@finfusion.com",
      password: "$2b$10$abcdefghijklmnopqrstuvwxyz123456", // hashed "password123"
      role: "USER",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Priya Sharma",
      email: "priya@example.com",
      password: "$2b$10$abcdefghijklmnopqrstuvwxyz123456",
      role: "USER",
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@finfusion.com",
      password: "$2b$10$abcdefghijklmnopqrstuvwxyz123456",
      role: "ADMIN",
    },
  });

  console.log("✅ Users created");

  // ============================================
  // 🏦 CREATE BANK ACCOUNTS
  // ============================================

  // User 1 Accounts
  const sbi1 = await prisma.bankAccount.create({
    data: {
      userId: user1.id,
      bankName: "State Bank of India",
      shortName: "SBI",
      accountNo: "10234567890",
      type: "SAVINGS",
      balance: 125840.50,
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg",
      color: "#1E6898",
      bgColor: "#E6F2FF",
    },
  });

  const hdfc1 = await prisma.bankAccount.create({
    data: {
      userId: user1.id,
      bankName: "HDFC Bank",
      shortName: "HDFC",
      accountNo: "50012345678",
      type: "CURRENT",
      balance: 89320.75,
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg",
      color: "#C62828",
      bgColor: "#FDECEC",
    },
  });

  const icici1 = await prisma.bankAccount.create({
    data: {
      userId: user1.id,
      bankName: "ICICI Bank",
      shortName: "ICICI",
      accountNo: "60098765432",
      type: "SAVINGS",
      balance: 67450.25,
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg",
      color: "#F57C00",
      bgColor: "#FFF3E0",
    },
  });

  // User 2 Accounts
  const kotak2 = await prisma.bankAccount.create({
    data: {
      userId: user2.id,
      bankName: "Kotak Mahindra Bank",
      shortName: "Kotak",
      accountNo: "71123456789",
      type: "SAVINGS",
      balance: 45280.00,
      logo: "https://upload.wikimedia.org/wikipedia/en/7/74/Kotak_Mahindra_Bank_logo.svg",
      color: "#E91E63",
      bgColor: "#FCE4EC",
    },
  });

  const axis2 = await prisma.bankAccount.create({
    data: {
      userId: user2.id,
      bankName: "Axis Bank",
      shortName: "Axis",
      accountNo: "91987654321",
      type: "CURRENT",
      balance: 112500.50,
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg",
      color: "#7B1FA2",
      bgColor: "#F3E5F5",
    },
  });

  console.log("✅ Bank accounts created");

  // ============================================
  // 💸 CREATE TRANSACTIONS (Last 3 months)
  // ============================================

  const now = new Date();
  const getDateDaysAgo = (days) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const transactions = [
    // User 1 - Recent transactions
    { userId: user1.id, accountId: sbi1.id, type: "CREDIT", amount: 85000, category: "INCOME", description: "Salary Credit - November", timestamp: getDateDaysAgo(2) },
    { userId: user1.id, accountId: sbi1.id, type: "DEBIT", amount: 2499, category: "SHOPPING", description: "Amazon - Electronics", timestamp: getDateDaysAgo(3) },
    { userId: user1.id, accountId: sbi1.id, type: "DEBIT", amount: 450, category: "FOOD", description: "Starbucks Coffee", timestamp: getDateDaysAgo(4) },
    { userId: user1.id, accountId: hdfc1.id, type: "DEBIT", amount: 1850, category: "BILLS", description: "Electricity Bill", timestamp: getDateDaysAgo(5) },
    { userId: user1.id, accountId: hdfc1.id, type: "DEBIT", amount: 680, category: "FOOD", description: "Swiggy Order", timestamp: getDateDaysAgo(6) },
    { userId: user1.id, accountId: icici1.id, type: "DEBIT", amount: 280, category: "TRANSPORT", description: "Uber Ride", timestamp: getDateDaysAgo(7) },
    { userId: user1.id, accountId: sbi1.id, type: "DEBIT", amount: 649, category: "ENTERTAINMENT", description: "Netflix Subscription", timestamp: getDateDaysAgo(8) },
    { userId: user1.id, accountId: hdfc1.id, type: "CREDIT", amount: 1299, category: "REFUND", description: "Flipkart Refund", timestamp: getDateDaysAgo(9) },

    // User 1 - Last month
    { userId: user1.id, accountId: sbi1.id, type: "CREDIT", amount: 85000, category: "INCOME", description: "Salary Credit - October", timestamp: getDateDaysAgo(32) },
    { userId: user1.id, accountId: sbi1.id, type: "DEBIT", amount: 15000, category: "BILLS", description: "Credit Card Payment", timestamp: getDateDaysAgo(35) },
    { userId: user1.id, accountId: hdfc1.id, type: "DEBIT", amount: 3500, category: "SHOPPING", description: "Myntra - Clothing", timestamp: getDateDaysAgo(38) },
    { userId: user1.id, accountId: icici1.id, type: "DEBIT", amount: 8500, category: "BILLS", description: "House Rent", timestamp: getDateDaysAgo(40) },
    { userId: user1.id, accountId: sbi1.id, type: "DEBIT", amount: 1200, category: "FOOD", description: "Zomato - Multiple Orders", timestamp: getDateDaysAgo(42) },
    { userId: user1.id, accountId: hdfc1.id, type: "DEBIT", amount: 2500, category: "ENTERTAINMENT", description: "BookMyShow - Movie Tickets", timestamp: getDateDaysAgo(45) },

    // User 1 - 2 months ago
    { userId: user1.id, accountId: sbi1.id, type: "CREDIT", amount: 85000, category: "INCOME", description: "Salary Credit - September", timestamp: getDateDaysAgo(62) },
    { userId: user1.id, accountId: hdfc1.id, type: "DEBIT", amount: 12000, category: "SHOPPING", description: "Amazon - Laptop Accessories", timestamp: getDateDaysAgo(65) },
    { userId: user1.id, accountId: sbi1.id, type: "DEBIT", amount: 4500, category: "TRANSPORT", description: "Ola - Monthly Rides", timestamp: getDateDaysAgo(70) },
    { userId: user1.id, accountId: icici1.id, type: "DEBIT", amount: 899, category: "ENTERTAINMENT", description: "Amazon Prime Subscription", timestamp: getDateDaysAgo(75) },

    // User 2 - Recent transactions
    { userId: user2.id, accountId: kotak2.id, type: "CREDIT", amount: 95000, category: "INCOME", description: "Salary Credit", timestamp: getDateDaysAgo(1) },
    { userId: user2.id, accountId: kotak2.id, type: "DEBIT", amount: 5600, category: "SHOPPING", description: "Lifestyle - Shopping", timestamp: getDateDaysAgo(3) },
    { userId: user2.id, accountId: axis2.id, type: "DEBIT", amount: 890, category: "FOOD", description: "Cafe Coffee Day", timestamp: getDateDaysAgo(4) },
    { userId: user2.id, accountId: kotak2.id, type: "DEBIT", amount: 2100, category: "BILLS", description: "Mobile Recharge", timestamp: getDateDaysAgo(6) },
    { userId: user2.id, accountId: axis2.id, type: "DEBIT", amount: 15000, category: "SHOPPING", description: "Apple Store - iPhone", timestamp: getDateDaysAgo(10) },
    { userId: user2.id, accountId: kotak2.id, type: "DEBIT", amount: 3200, category: "ENTERTAINMENT", description: "PVR Cinemas", timestamp: getDateDaysAgo(12) },
    { userId: user2.id, accountId: axis2.id, type: "CREDIT", amount: 5000, category: "REFUND", description: "Insurance Refund", timestamp: getDateDaysAgo(15) },
  ];

  await prisma.transaction.createMany({ data: transactions });
  console.log("✅ Transactions created");

  // ============================================
  // 💳 CREATE CARDS
  // ============================================

  await prisma.card.createMany({
    data: [
      { userId: user1.id, number: "4532********1234", status: "ACTIVE" },
      { userId: user1.id, number: "5425********5678", status: "ACTIVE" },
      { userId: user1.id, number: "6011********9012", status: "BLOCKED" },
      { userId: user2.id, number: "3782********3456", status: "ACTIVE" },
      { userId: user2.id, number: "4916********7890", status: "ACTIVE" },
    ],
  });
  console.log("✅ Cards created");

  // ============================================
  // 🔔 CREATE NOTIFICATIONS
  // ============================================

  await prisma.notification.createMany({
    data: [
      { userId: user1.id, title: "Payment Successful", message: "Your payment of ₹2,499 was successful", read: false },
      { userId: user1.id, title: "Low Balance Alert", message: "Your ICICI account balance is below ₹70,000", read: false },
      { userId: user1.id, title: "Salary Credited", message: "₹85,000 credited to your SBI account", read: true },
      { userId: user1.id, title: "Card Blocked", message: "Your card ending in 9012 has been blocked", read: true },
      { userId: user2.id, title: "New Login Detected", message: "New login from Chrome on Windows", read: false },
      { userId: user2.id, title: "Refund Processed", message: "₹5,000 refund has been processed", read: true },
    ],
  });
  console.log("✅ Notifications created");

  // ============================================
  // 🧾 CREATE CHEQUE REQUESTS
  // ============================================

  await prisma.chequeRequest.createMany({
    data: [
      { userId: user1.id, status: "APPROVED" },
      { userId: user1.id, status: "PENDING" },
      { userId: user2.id, status: "REJECTED" },
      { userId: user2.id, status: "APPROVED" },
    ],
  });
  console.log("✅ Cheque requests created");

  // ============================================
  // 🔁 CREATE TRANSFERS
  // ============================================

  await prisma.transfer.createMany({
    data: [
      { fromAccountId: sbi1.id, toAccountId: hdfc1.id, amount: 10000, note: "Internal transfer", idempotencyKey: "txn_001" },
      { fromAccountId: hdfc1.id, toAccountId: icici1.id, amount: 5000, note: "Savings transfer", idempotencyKey: "txn_002" },
      { fromAccountId: kotak2.id, toAccountId: axis2.id, amount: 15000, note: "Business expense", idempotencyKey: "txn_003" },
    ],
  });
  console.log("✅ Transfers created");

  // ============================================
  // 🪪 CREATE AUDIT LOGS
  // ============================================

  await prisma.auditLog.createMany({
    data: [
      { userId: user1.id, action: "LOGIN", ip: "192.168.1.100", ua: "Mozilla/5.0 Chrome" },
      { userId: user1.id, action: "TRANSFER", meta: JSON.stringify({ amount: 10000, from: "SBI", to: "HDFC" }), ip: "192.168.1.100" },
      { userId: user2.id, action: "LOGIN", ip: "192.168.1.101", ua: "Mozilla/5.0 Safari" },
      { userId: user2.id, action: "CARD_BLOCK", meta: JSON.stringify({ cardNumber: "****9012" }), ip: "192.168.1.101" },
      { userId: admin.id, action: "ADMIN_LOGIN", ip: "192.168.1.1", ua: "Mozilla/5.0 Edge" },
    ],
  });
  console.log("✅ Audit logs created");

  // ============================================
  // 📊 SUMMARY
  // ============================================

  const userCount = await prisma.user.count();
  const accountCount = await prisma.bankAccount.count();
  const transactionCount = await prisma.transaction.count();
  const cardCount = await prisma.card.count();
  const notificationCount = await prisma.notification.count();

  console.log("\n🎉 Seed completed successfully!");
  console.log("=====================================");
  console.log(`👥 Users: ${userCount}`);
  console.log(`🏦 Bank Accounts: ${accountCount}`);
  console.log(`💸 Transactions: ${transactionCount}`);
  console.log(`💳 Cards: ${cardCount}`);
  console.log(`🔔 Notifications: ${notificationCount}`);
  console.log("=====================================\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

