// Mock bank accounts data
export const mockAccounts = [
    {
        id: 1,
        bank: 'State Bank of India',
        shortName: 'SBI',
        accountNumber: '****1234',
        fullAccountNumber: '1234567890123456',
        balance: 125840,
        type: 'Savings',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg',
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        ifscCode: 'SBIN0001234',
        branch: 'Connaught Place, New Delhi',
        upiId: 'aviralmishra@sbi'
    },
    {
        id: 2,
        bank: 'HDFC Bank',
        shortName: 'HDFC',
        accountNumber: '****5678',
        fullAccountNumber: '5678901234567890',
        balance: 89320,
        type: 'Current',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg',
        color: 'from-red-500 to-red-600',
        bgColor: 'bg-red-50',
        ifscCode: 'HDFC0001567',
        branch: 'Nehru Place, New Delhi',
        upiId: 'aviralmishra@hdfcbank'
    },
    {
        id: 3,
        bank: 'ICICI Bank',
        shortName: 'ICICI',
        accountNumber: '****9012',
        fullAccountNumber: '9012345678901234',
        balance: 67450,
        type: 'Savings',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg',
        color: 'from-orange-500 to-orange-600',
        bgColor: 'bg-orange-50',
        ifscCode: 'ICIC0001890',
        branch: 'Saket, New Delhi',
        upiId: 'aviralmishra@icici'
    },
    {
        id: 4,
        bank: 'Kotak Mahindra',
        shortName: 'Kotak',
        accountNumber: '****3456',
        fullAccountNumber: '3456789012345678',
        balance: 45280,
        type: 'Savings',
        logo: 'https://upload.wikimedia.org/wikipedia/en/7/74/Kotak_Mahindra_Bank_logo.svg',
        color: 'from-rose-500 to-rose-600',
        bgColor: 'bg-rose-50',
        ifscCode: 'KKBK0002345',
        branch: 'Dwarka, New Delhi',
        upiId: 'aviralmishra@kotak'
    }
];

// Mock user data
export const mockUser = {
    name: 'Aviral Mishra',
    email: 'aviral@example.com',
    phone: '+91 98765 43210',
    avatar: 'AM'
};

// Mock transactions data
export const mockTransactions = [
    {
        id: 1,
        type: 'debit',
        merchant: 'Amazon India',
        category: 'Shopping',
        amount: 2499,
        date: '2024-11-19',
        timestamp: '2024-11-19T10:30:00Z',
        description: 'Online shopping'
    },
    {
        id: 2,
        type: 'credit',
        merchant: 'Salary Credit',
        category: 'Income',
        amount: 85000,
        date: '2024-11-18',
        timestamp: '2024-11-18T09:00:00Z',
        description: 'Monthly salary'
    },
    {
        id: 3,
        type: 'debit',
        merchant: 'Starbucks',
        category: 'Food',
        amount: 450,
        date: '2024-11-18',
        timestamp: '2024-11-18T14:20:00Z',
        description: 'Coffee and snacks'
    },
    {
        id: 4,
        type: 'debit',
        merchant: 'Uber',
        category: 'Transport',
        amount: 280,
        date: '2024-11-17',
        timestamp: '2024-11-17T18:45:00Z',
        description: 'Cab ride'
    },
    {
        id: 5,
        type: 'debit',
        merchant: 'Netflix',
        category: 'Entertainment',
        amount: 649,
        date: '2024-11-15',
        timestamp: '2024-11-15T12:00:00Z',
        description: 'Monthly subscription'
    }
];

// Mock notifications data
export const mockNotifications = [
    {
        id: 1,
        message: 'Low balance alert on ICICI account',
        time: '2 hours ago',
        type: 'warning',
        read: false
    },
    {
        id: 2,
        message: 'Salary credited to SBI account',
        time: '1 day ago',
        type: 'success',
        read: false
    },
    {
        id: 3,
        message: 'Card payment of ₹2,499 successful',
        time: '2 days ago',
        type: 'info',
        read: true
    }
];

// Mock analytics data
export const mockAnalytics = {
    totalSpending: 44000,
    totalIncome: 85000,
    savingsRate: 48.2, // percentage
    categories: [
        {
            name: 'Food & Dining',
            amount: 12450,
            percentage: 28.3,
            color: '#10b981',
            budget: 15000,
            icon: 'Coffee'
        },
        {
            name: 'Shopping',
            amount: 9800,
            percentage: 22.3,
            color: '#8b5cf6',
            budget: 10000,
            icon: 'ShoppingBag'
        },
        {
            name: 'Transport',
            amount: 8500,
            percentage: 19.3,
            color: '#3b82f6',
            budget: 8000,
            icon: 'Car'
        },
        {
            name: 'Bills & Utilities',
            amount: 8900,
            percentage: 20.2,
            color: '#f59e0b',
            budget: 12000,
            icon: 'Zap'
        },
        {
            name: 'Entertainment',
            amount: 4200,
            percentage: 9.5,
            color: '#ef4444',
            budget: 5000,
            icon: 'Activity'
        },
        {
            name: 'Others',
            amount: 2150,
            percentage: 4.9,
            color: '#6b7280',
            budget: 3000,
            icon: 'DollarSign'
        }
    ],
    monthlyTrends: [
        { month: 'Jun', spending: 38000, income: 85000 },
        { month: 'Jul', spending: 42000, income: 85000 },
        { month: 'Aug', spending: 39500, income: 85000 },
        { month: 'Sep', spending: 45000, income: 85000 },
        { month: 'Oct', spending: 41000, income: 85000 },
        { month: 'Nov', spending: 44000, income: 85000 }
    ],
    financialGoals: {
        emergencyFund: {
            target: 300000,
            current: 125840,
            percentage: 41.9
        },
        savingsGoal: {
            target: 100000,
            current: 67450,
            percentage: 67.5
        }
    }
};

// Mock upcoming bills
export const mockUpcomingBills = [
    { id: 1, name: 'Electricity Bill', amount: 1250, dueDate: 'Due in 3 days', icon: 'Zap' },
    { id: 2, name: 'Credit Card Payment', amount: 15000, dueDate: 'Due in 6 days', icon: 'CreditCard' },
    { id: 3, name: 'WiFi Plan', amount: 999, dueDate: 'Due tomorrow', icon: 'Wifi' }
];

// Mock smart alerts
export const mockSmartAlerts = [
    { id: 1, message: 'You’re nearing your Transport budget for this month.', type: 'warning', icon: 'AlertTriangle' },
    { id: 2, message: 'Your HDFC credit card bill is due in 6 days.', type: 'info', icon: 'Bell' },
    { id: 3, message: 'Your dining expenses increased by 12% compared to last month.', type: 'trend', icon: 'TrendingUp' }
];

// Mock spending snapshot
export const mockSpendingSnapshot = {
    totalSpent: 44000,
    mostActiveDay: 'Saturday',
    avgDailySpend: 1466,
    highestSingleSpend: 8900
};
