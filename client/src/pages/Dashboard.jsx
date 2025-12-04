import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddBankAccountModal from '../components/AddBankAccountModal';
import AddTransactionModal from '../components/AddTransactionModal';
import ProfileSettings from '../components/ProfileSettings';
import Sidebar from '../components/Sidebar';
import { bankAccountService } from '../services/bankAccountService';
import { transactionService } from '../services/transactionService';
import { mockUser, mockNotifications, mockAnalytics, mockUpcomingBills, mockSmartAlerts, mockSpendingSnapshot } from '../data/mockData';

import {
  TrendingUp,
  TrendingDown,
  Bell,
  ArrowUpRight,
  ArrowDownLeft,
  ShoppingBag,
  Coffee,
  Car,
  Zap,
  MoreVertical,
  LogOut,
  DollarSign,
  Activity,
  AlertCircle,
  Trash2,
  PlusCircle,
  Menu,
  Wallet,
  CreditCard,
  Wifi,
  AlertTriangle,
  ArrowRight,
  Plus,
  Minus,
  RefreshCw,
  FileText
} from 'lucide-react';

export default function Dashboard() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================

  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionType, setTransactionType] = useState('DEBIT'); // CREDIT or DEBIT

  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  const user = mockUser;

  // ============================================
  // LOAD DATA
  // ============================================
  useEffect(() => {
    loadAccounts();
    loadTransactions();
  }, []);

  const loadAccounts = async () => {
    try {
      const data = await bankAccountService.getAll();
      setAccounts(data);
    } catch (error) {
      console.error('Error loading accounts:', error);
    }
  };

  const loadTransactions = async () => {
    try {
      setLoadingTransactions(true);
      const data = await transactionService.getAll({ limit: 5, sortBy: 'timestamp', sortOrder: 'desc' });
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error('Error loading transactions:', error);
      setTransactions([]);
    } finally {
      setLoadingTransactions(false);
    }
  };

  // ============================================
  // ADD ACCOUNT
  // ============================================
  const handleAccountAdded = async () => {
    // Just reload the accounts list - the modal already created the account
    await loadAccounts();
    setShowAddAccountModal(false);
  };

  // ============================================
  // DELETE ACCOUNT
  // ============================================
  const handleDeleteAccount = async (accountId) => {
    try {
      await bankAccountService.delete(accountId);
      await loadAccounts();
      setDeleteConfirm(null);
      setOpenDropdown(null);
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  // ============================================
  // CALCULATIONS
  // ============================================
  const notifications = mockNotifications;
  const analytics = mockAnalytics;

  const unreadCount = notifications.filter(n => !n.read).length;

  const totalBalance = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);

  const totalIncome = transactions
    .filter(t => t.type === 'CREDIT')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'DEBIT')
    .reduce((sum, t) => sum + t.amount, 0);

  // ============================================
  // TRANSACTION ICON FUNCTION
  // ============================================
  const getTransactionIcon = (category) => {
    const iconMap = {
      'Shopping': ShoppingBag,
      'Income': TrendingUp,
      'Food': Coffee,
      'Transport': Car,
      'Entertainment': Activity,
      'Bills': Zap,
      'Refund': ArrowDownLeft
    };
    return iconMap[category] || DollarSign;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-blue-50/30 flex">

      {/* SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* MAIN WRAPPER */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* HEADER */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">

              {/* Left - Logo + Menu */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                >
                  <Menu size={24} />
                </button>

                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">₹</span>
                </div>

                <div>
                  <h1 className="text-xl font-bold text-gray-900">FinFusion</h1>
                  <p className="text-xs text-gray-500">Dashboard</p>
                </div>
              </div>

              {/* Right - Notifications + Profile */}
              <div className="flex items-center space-x-4">

                {/* Notification Bell */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                  </button>

                  {/* Notification dropdown */}
                  {showNotifications && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowNotifications(false)}
                      ></div>

                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-20 animate-scale-in">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-gray-900">Notifications</h3>
                            {unreadCount > 0 && (
                              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                                {unreadCount} new
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                          {notifications.slice(0, 4).map((notification) => {
                            const getIcon = () => {
                              if (notification.type === 'alert' || notification.type === 'warning')
                                return { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' };
                              if (notification.type === 'success')
                                return { icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' };
                              return { icon: Bell, color: 'text-blue-600', bg: 'bg-blue-100' };
                            };

                            const { icon: Icon, color, bg } = getIcon();

                            return (
                              <div
                                key={notification.id}
                                className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-100 ${!notification.read ? 'bg-emerald-50' : ''}`}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center`}>
                                    <Icon className={color} size={16} />
                                  </div>

                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                                    <p className="text-xs text-gray-500">{notification.time}</p>
                                  </div>

                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                          <Link
                            to="/notifications"
                            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium block text-center"
                          >
                            View All →
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Profile Button */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowProfileSettings(true)}
                    className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
                  >
                    <span className="text-white font-semibold lowercase">{user.avatar}</span>
                  </button>

                  <div className="hidden md:block">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>

                <Link to="/home" className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                  <LogOut size={20} />
                </Link>

              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* 1. Welcome Section */}
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text text-transparent">
              Welcome back, {user.name.split(' ')[0]}! 👋
            </h2>
            <p className="text-gray-600 mt-1">Here’s your financial overview at a glance.</p>
          </div>

          {/* 2. Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Balance */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift animate-fade-in-up">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Wallet className="text-white" size={24} />
                </div>
                <TrendingUp className="text-emerald-500" size={20} />
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Balance</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalBalance.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2">Your net worth across all accounts.</p>
            </div>

            {/* Income */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <ArrowDownLeft className="text-white" size={24} />
                </div>
                <TrendingUp className="text-blue-500" size={20} />
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Income</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalIncome.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2">This month’s credited earnings.</p>
            </div>

            {/* Expenses */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                  <ArrowUpRight className="text-white" size={24} />
                </div>
                <TrendingDown className="text-red-500" size={20} />
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalExpense.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-2">All tracked spending for this month.</p>
            </div>
          </div>

          {/* 3. Quick Insights Strip */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Zap size={20} className="text-indigo-600" />
              </div>
              <span className="font-bold text-indigo-900">Quick Insights</span>
            </div>
            <div className="flex-1 flex flex-wrap gap-4 md:gap-8 text-sm text-indigo-800">
              <span className="flex items-center gap-1">
                <span className="font-semibold">Savings Rate:</span> You're saving {mockAnalytics.savingsRate}% of your income.
              </span>
              <span className="flex items-center gap-1">
                <span className="font-semibold">Top Spend:</span> {mockAnalytics.categories[0].name} — ₹{mockAnalytics.categories[0].amount.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <span className="font-semibold">Cash Flow:</span> Positive — great job!
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT COLUMN (2/3) */}
            <div className="lg:col-span-2 space-y-8">

              {/* 4. Accounts Section */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Your Accounts</h3>
                    <p className="text-sm text-gray-500">All your bank balances in one place.</p>
                  </div>
                  <button
                    onClick={() => setShowAddAccountModal(true)}
                    className="text-emerald-600 hover:text-emerald-700 flex items-center space-x-1 hover:bg-emerald-50 px-3 py-1 rounded-lg transition"
                  >
                    <PlusCircle size={16} />
                    <span className="text-sm font-medium">Add Account</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {accounts.map((account) => (
                    <div
                      key={account.id}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition relative group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 ${account.bgColor} rounded-lg p-2 border flex items-center justify-center`}>
                          <img
                            src={account.logo}
                            alt={account.bankName}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML =
                                `<span class='text-sm font-bold text-gray-700'>${account.shortName?.charAt(0) || 'B'}</span>`;
                            }}
                          />
                        </div>
                        <div className="relative">
                          <button
                            onClick={() => setOpenDropdown(openDropdown === account.id ? null : account.id)}
                            className="text-gray-400 hover:text-gray-600 p-1 opacity-0 group-hover:opacity-100 transition"
                          >
                            <MoreVertical size={18} />
                          </button>
                          {openDropdown === account.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} />
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-20 animate-scale-in">
                                <button
                                  onClick={() => {
                                    setDeleteConfirm(account.id);
                                    setOpenDropdown(null);
                                  }}
                                  className="w-full px-4 py-3 text-left flex items-center space-x-3 hover:bg-red-50 text-red-600 rounded-lg"
                                >
                                  <Trash2 size={18} />
                                  <span>Delete Account</span>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm">{account.bankName}</h4>
                      <p className="text-xs text-gray-500 mb-2">{account.type} • {account.accountNo}</p>
                      <p className="text-xl font-bold text-gray-900">₹{account.balance?.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. Spending Snapshot */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
                <h3 className="text-xl font-bold text-gray-900 mb-4">This Month’s Snapshot</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Total Spent</p>
                    <p className="text-lg font-bold text-gray-900">₹{mockSpendingSnapshot.totalSpent.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Most Active Day</p>
                    <p className="text-lg font-bold text-gray-900">{mockSpendingSnapshot.mostActiveDay}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Avg Daily Spend</p>
                    <p className="text-lg font-bold text-gray-900">₹{mockSpendingSnapshot.avgDailySpend.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Highest Single Spend</p>
                    <p className="text-lg font-bold text-gray-900">₹{mockSpendingSnapshot.highestSingleSpend.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* 5. Recent Activity */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                    <p className="text-sm text-gray-500">Your latest transactions across all accounts.</p>
                  </div>
                  <Link to="/transactions" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1">
                    View All <ArrowRight size={16} />
                  </Link>
                </div>

                {transactions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No recent activity. All your financial movements will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((transaction) => {
                      const Icon = getTransactionIcon(transaction.category);
                      return (
                        <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition group border border-transparent hover:border-gray-100">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${transaction.type === 'CREDIT' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                              <Icon className={transaction.type === 'CREDIT' ? 'text-emerald-600' : 'text-red-600'} size={18} />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{transaction.merchant}</p>
                              <p className="text-xs text-gray-500">{transaction.category} • {transaction.date}</p>
                            </div>
                          </div>
                          <p className={`font-bold text-sm ${transaction.type === 'CREDIT' ? 'text-emerald-600' : 'text-red-600'}`}>
                            {transaction.type === 'CREDIT' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT COLUMN (1/3) */}
            <div className="space-y-8">

              {/* 9. Quick Actions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Actions</h3>
                <p className="text-sm text-gray-500 mb-4">Manage your finances quickly.</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setTransactionType('CREDIT');
                      setShowTransactionModal(true);
                    }}
                    className="p-3 bg-emerald-50 hover:bg-emerald-100 rounded-xl flex flex-col items-center justify-center gap-2 transition text-emerald-700"
                  >
                    <Plus size={20} />
                    <span className="text-xs font-semibold">Add Income</span>
                  </button>
                  <button
                    onClick={() => {
                      setTransactionType('DEBIT');
                      setShowTransactionModal(true);
                    }}
                    className="p-3 bg-red-50 hover:bg-red-100 rounded-xl flex flex-col items-center justify-center gap-2 transition text-red-700"
                  >
                    <Minus size={20} />
                    <span className="text-xs font-semibold">Add Expense</span>
                  </button>
                  <button
                    onClick={() => alert('Transfer feature coming soon!')}
                    className="p-3 bg-blue-50 hover:bg-blue-100 rounded-xl flex flex-col items-center justify-center gap-2 transition text-blue-700"
                  >
                    <RefreshCw size={20} />
                    <span className="text-xs font-semibold">Transfer</span>
                  </button>
                  <button
                    onClick={() => alert('Bill Reminder feature coming soon!')}
                    className="p-3 bg-purple-50 hover:bg-purple-100 rounded-xl flex flex-col items-center justify-center gap-2 transition text-purple-700"
                  >
                    <FileText size={20} />
                    <span className="text-xs font-semibold">Bill Reminder</span>
                  </button>
                </div>
              </div>

              {/* 6. Upcoming Bills */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Upcoming Bills</h3>
                  <p className="text-sm text-gray-500">Stay ahead of your monthly dues.</p>
                </div>
                <div className="space-y-4">
                  {mockUpcomingBills.map((bill) => (
                    <div key={bill.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          {bill.icon === 'Zap' && <Zap size={16} className="text-orange-600" />}
                          {bill.icon === 'CreditCard' && <CreditCard size={16} className="text-orange-600" />}
                          {bill.icon === 'Wifi' && <Wifi size={16} className="text-orange-600" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{bill.name}</p>
                          <p className="text-xs text-orange-600 font-medium">{bill.dueDate}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-gray-900">₹{bill.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. Smart Alerts */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Alerts</h3>
                <div className="space-y-4">
                  {mockSmartAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                        alert.type === 'info' ? 'bg-blue-100 text-blue-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                        {alert.icon === 'AlertTriangle' && <AlertTriangle size={14} />}
                        {alert.icon === 'Bell' && <Bell size={14} />}
                        {alert.icon === 'TrendingUp' && <TrendingUp size={14} />}
                      </div>
                      <p className="text-sm text-gray-600 leading-snug">{alert.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 10. Financial Health Meter */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg hover-lift">
                <h3 className="font-bold text-lg mb-1">Your Financial Health</h3>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-bold">89</span>
                  <span className="text-emerald-100 mb-1">/100</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-medium mb-1.5">Excellent</span>
                </div>
                <p className="text-sm text-emerald-50 opacity-90">Strong savings habits and balanced spending.</p>
                <div className="w-full bg-black/20 h-2 rounded-full mt-4 overflow-hidden">
                  <div className="bg-white h-full rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>

            </div>

          </div>

        </main>

        {/* ADD ACCOUNT MODAL */}
        <AddBankAccountModal
          isOpen={showAddAccountModal}
          onClose={() => setShowAddAccountModal(false)}
          onSuccess={handleAccountAdded}
        />

        {/* PROFILE SETTINGS */}
        <ProfileSettings
          isOpen={showProfileSettings}
          onClose={() => setShowProfileSettings(false)}
          user={user}
          accounts={accounts}
        />

        {/* DELETE CONFIRMATION */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in-up">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 animate-scale-in">

              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl font-bold">Delete Bank Account?</h3>
              </div>

              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this account? This action cannot be undone.
              </p>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteAccount(deleteConfirm)}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition"
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ADD TRANSACTION MODAL */}
        <AddTransactionModal
          isOpen={showTransactionModal}
          onClose={() => setShowTransactionModal(false)}
          type={transactionType}
          accounts={accounts}
          onSuccess={async () => {
            // Reload accounts and transactions after successful transaction
            await loadAccounts();
            await loadTransactions();
          }}
        />

      </div>
    </div>
  );
}
