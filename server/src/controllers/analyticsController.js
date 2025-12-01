const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dayjs = require("dayjs");


/**
 * GET /api/analytics/summary
 * returns totals for dashboard KPIs
 */
const getSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // total balance across accounts (Decimal returned as string)
    const accounts = await prisma.bankAccount.findMany({
      where: { userId },
      select: { balance: true }
    });
    const totalBalance = accounts.reduce((s, a) => s + parseFloat(a.balance || 0), 0);

    // start of current month
    const startOfMonth = dayjs().startOf("month").toDate();
    const endOfMonth = dayjs().endOf("month").toDate();

    // total income this month (CREDIT)
    const incomeAgg = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        type: "CREDIT",
        timestamp: { gte: startOfMonth, lte: endOfMonth }
      }
    });
    const totalIncomeThisMonth = parseFloat(incomeAgg._sum.amount || 0);

    // total expenses this month (DEBIT)
    const expenseAgg = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        type: "DEBIT",
        timestamp: { gte: startOfMonth, lte: endOfMonth }
      }
    });
    const totalExpensesThisMonth = parseFloat(expenseAgg._sum.amount || 0);

    // number of accounts
    const accountsCount = await prisma.bankAccount.count({ where: { userId } });

    // latest transactions (5)
    const recentTx = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { timestamp: "desc" },
      take: 5,
      include: { account: true }
    });

    res.json({
      success: true,
      data: {
        totalBalance,
        totalIncomeThisMonth,
        totalExpensesThisMonth,
        accountsCount,
        recentTransactions: recentTx
      }
    });
  } catch (err) {
    console.error("analytics.summary err", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /api/analytics/spending-by-category?from=YYYY-MM-DD&to=YYYY-MM-DD
 * returns array [{ category, total }]
 */
const spendingByCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const from = req.query.from ? new Date(req.query.from) : dayjs().startOf("month").toDate();
    const to = req.query.to ? new Date(req.query.to) : dayjs().endOf("month").toDate();

    const results = await prisma.transaction.groupBy({
      by: ["category"],
      where: {
        userId,
        timestamp: { gte: from, lte: to },
        type: "DEBIT" // spending only
      },
      _sum: { amount: true },
      orderBy: { _sum: { amount: "desc" } }
    });

    const data = results.map(r => ({
      category: r.category,
      total: parseFloat(r._sum.amount || 0)
    }));

    res.json({ success: true, data });
  } catch (err) {
    console.error("analytics.spendingByCategory err", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /api/analytics/monthly-trends?months=6
 * returns last N months income & expense aggregated per month
 */
const monthlyTrends = async (req, res) => {
  try {
    const userId = req.user.id;
    const months = parseInt(req.query.months || "6", 10);
    const start = dayjs().subtract(months - 1, "month").startOf("month").toDate();

    // Raw SQL grouping is simpler for month buckets in MySQL
    const rows = await prisma.$queryRaw`
      SELECT
        DATE_FORMAT(timestamp, "%Y-%m") AS month,
        SUM(CASE WHEN type = 'CREDIT' THEN amount ELSE 0 END) AS income,
        SUM(CASE WHEN type = 'DEBIT' THEN amount ELSE 0 END) AS expense
      FROM transaction
      WHERE userId = ${userId} AND timestamp >= ${start}
      GROUP BY month
      ORDER BY month;
    `;

    // Ensure months with 0 are included in response
    const monthsArr = [];
    for (let i = months - 1; i >= 0; i--) {
      const m = dayjs().subtract(i, "month").format("YYYY-MM");
      monthsArr.push(m);
    }

    const map = {};
    rows.forEach(r => {
      const m = r.month; // e.g. "2025-11"
      map[m] = { income: parseFloat(r.income || 0), expense: parseFloat(r.expense || 0) };
    });

    const data = monthsArr.map(m => ({
      month: m,
      income: (map[m] && map[m].income) || 0,
      expense: (map[m] && map[m].expense) || 0
    }));

    res.json({ success: true, data });
  } catch (err) {
    console.error("analytics.monthlyTrends err", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /api/analytics/top-merchants?limit=5
 */
const topMerchants = async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit || "5", 10);

    // Group by description (merchant) for DEBIT transactions
    const rows = await prisma.$queryRaw`
      SELECT description AS merchant, SUM(amount) AS total
      FROM transaction
      WHERE userId = ${userId} AND type = 'DEBIT' AND description IS NOT NULL
      GROUP BY description
      ORDER BY total DESC
      LIMIT ${limit};
    `;

    const data = rows.map(r => ({ merchant: r.merchant, total: parseFloat(r.total || 0) }));

    res.json({ success: true, data });
  } catch (err) {
    console.error("analytics.topMerchants err", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET /api/analytics/net-worth
 * returns list of accounts and total net worth
 */
const netWorth = async (req, res) => {
  try {
    const userId = req.user.id;
    const accounts = await prisma.bankAccount.findMany({
      where: { userId },
      select: { id: true, bankName: true, shortName: true, accountNo: true, balance: true, logo: true, color: true, bgColor: true }
    });

    const total = accounts.reduce((s, a) => s + parseFloat(a.balance || 0), 0);

    res.json({ success: true, data: { accounts, total } });
  } catch (err) {
    console.error("analytics.netWorth err", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getSummary,
  spendingByCategory,
  monthlyTrends,
  topMerchants,
  netWorth
};
