import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { transactionService } from '../services/transactionService';
import {
    ArrowLeft,
    Filter,
    X,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    Calendar,
    DollarSign,
    ShoppingBag,
    Coffee,
    Car,
    Zap,
    Activity,
    TrendingUp,
    ArrowDownLeft,
    Bell,
    LogOut
} from 'lucide-react';

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Sorting state
    const [sortBy, setSortBy] = useState('timestamp');
    const [sortOrder, setSortOrder] = useState('desc');

    // Filter state
    const [filters, setFilters] = useState({
        type: '',
        category: '',
        startDate: '',
        endDate: '',
        minAmount: '',
        maxAmount: '',
        search: ''
    });

    const user = {
        name: 'Aviral Mishra',
        email: 'aviral@example.com',
        avatar: 'AM'
    };

    // Category icons mapping
    const categoryIcons = {
        SHOPPING: ShoppingBag,
        FOOD: Coffee,
        TRANSPORT: Car,
        BILLS: Zap,
        ENTERTAINMENT: Activity,
        INCOME: TrendingUp,
        REFUND: ArrowDownLeft,
        TRANSFER: ArrowDownLeft,
        OTHER: Activity
    };

    const categoryColors = {
        SHOPPING: 'text-purple-500',
        FOOD: 'text-amber-500',
        TRANSPORT: 'text-blue-500',
        BILLS: 'text-yellow-500',
        ENTERTAINMENT: 'text-red-500',
        INCOME: 'text-emerald-500',
        REFUND: 'text-emerald-500',
        TRANSFER: 'text-blue-500',
        OTHER: 'text-gray-500'
    };

    const categories = [
        'FOOD', 'SHOPPING', 'TRANSPORT', 'BILLS',
        'ENTERTAINMENT', 'TRANSFER', 'INCOME', 'REFUND', 'OTHER'
    ];

    // Fetch transactions
    useEffect(() => {
        fetchTransactions();
    }, [currentPage, itemsPerPage, sortBy, sortOrder, filters]);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            // Build query parameters for the API
            const params = {
                page: currentPage,
                limit: itemsPerPage,
                sortBy,
                sortOrder,
                ...(filters.type && { type: filters.type }),
                ...(filters.category && { category: filters.category }),
                ...(filters.startDate && { startDate: filters.startDate }),
                ...(filters.endDate && { endDate: filters.endDate }),
                ...(filters.minAmount && { minAmount: filters.minAmount }),
                ...(filters.maxAmount && { maxAmount: filters.maxAmount }),
                ...(filters.search && { search: filters.search })
            };

            // Call the transaction service
            const data = await transactionService.getAll(params);

            setTransactions(data.transactions || []);
            setTotalCount(data.total || 0);
            setTotalPages(data.totalPages || 1);

        } catch (error) {
            console.error('Error fetching transactions:', error);
            // Set empty state on error
            setTransactions([]);
            setTotalCount(0);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1); // Reset to first page when filters change
    };

    const clearFilters = () => {
        setFilters({
            type: '',
            category: '',
            startDate: '',
            endDate: '',
            minAmount: '',
            maxAmount: '',
            search: ''
        });
        setCurrentPage(1);
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const renderPagination = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${currentPage === i
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-emerald-50'
                        }`}
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">=</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">FinFusion</h1>
                                <p className="text-xs text-gray-600">Transactions</p>
                            </div>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">{user.avatar}</span>
                                </div>
                                <div className="hidden md:block">
                                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-600">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <Link
                            to="/dashboard"
                            className="p-2 hover:bg-emerald-100 rounded-lg transition"
                        >
                            <ArrowLeft className="text-gray-700" size={24} />
                        </Link>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">All Transactions</h2>
                            <p className="text-gray-600">View and manage your transaction history</p>
                        </div>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex-1 w-full md:max-w-md">
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition ${showFilters
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-500'
                                }`}
                        >
                            <Filter size={20} />
                            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
                        </button>
                    </div>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-100 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                            <button
                                onClick={clearFilters}
                                className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium"
                            >
                                <X size={18} />
                                <span>Clear All</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Transaction Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Transaction Type
                                </label>
                                <select
                                    value={filters.type}
                                    onChange={(e) => handleFilterChange('type', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                                >
                                    <option value="">All Types</option>
                                    <option value="CREDIT">Credit</option>
                                    <option value="DEBIT">Debit</option>
                                </select>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Start Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={filters.startDate}
                                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                                />
                            </div>

                            {/* End Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={filters.endDate}
                                    onChange={(e) => handleFilterChange('endDate', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                                />
                            </div>

                            {/* Min Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Min Amount (₹)
                                </label>
                                <input
                                    type="number"
                                    value={filters.minAmount}
                                    onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                                    placeholder="0"
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                                />
                            </div>

                            {/* Max Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Max Amount (₹)
                                </label>
                                <input
                                    type="number"
                                    value={filters.maxAmount}
                                    onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                                    placeholder="999999"
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Sorting and Items Per Page */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Sort by:</span>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleSort('timestamp')}
                                className={`px-4 py-2 rounded-lg font-medium transition flex items-center space-x-2 ${sortBy === 'timestamp'
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-500'
                                    }`}
                            >
                                <Calendar size={16} />
                                <span>Date</span>
                                {sortBy === 'timestamp' && (
                                    <ArrowUpDown size={16} className={sortOrder === 'asc' ? 'rotate-180' : ''} />
                                )}
                            </button>
                            <button
                                onClick={() => handleSort('amount')}
                                className={`px-4 py-2 rounded-lg font-medium transition flex items-center space-x-2 ${sortBy === 'amount'
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-500'
                                    }`}
                            >
                                <DollarSign size={16} />
                                <span>Amount</span>
                                {sortBy === 'amount' && (
                                    <ArrowUpDown size={16} className={sortOrder === 'asc' ? 'rotate-180' : ''} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Show:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        <span className="text-sm text-gray-600">per page</span>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} transactions
                    </p>
                </div>

                {/* Transactions List */}
                <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden mb-8">
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
                            <p className="text-gray-600 mt-4">Loading transactions...</p>
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className="p-12 text-center">
                            <p className="text-gray-600">No transactions found</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {transactions.map((transaction) => {
                                const Icon = categoryIcons[transaction.category] || Activity;
                                const iconColor = categoryColors[transaction.category] || 'text-gray-500';

                                return (
                                    <div key={transaction.id} className="p-4 hover:bg-gray-50 transition">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4 flex-1">
                                                <div className={`w-12 h-12 ${transaction.type === 'CREDIT' ? 'bg-emerald-100' : 'bg-red-100'} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                                    <Icon className={iconColor} size={20} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-gray-900 truncate">{transaction.description}</p>
                                                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                                                        <span className="px-2 py-1 bg-gray-100 rounded">{transaction.category}</span>
                                                        <span>•</span>
                                                        <span>{formatDate(transaction.timestamp)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right ml-4">
                                                <p className={`font-bold text-lg ${transaction.type === 'CREDIT' ? 'text-emerald-600' : 'text-red-600'}`}>
                                                    {transaction.type === 'CREDIT' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {!loading && transactions.length > 0 && (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition ${currentPage === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-500'
                                }`}
                        >
                            <ChevronLeft size={20} />
                            <span>Previous</span>
                        </button>

                        <div className="flex items-center space-x-2">
                            {renderPagination()}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition ${currentPage === totalPages
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-500'
                                }`}
                        >
                            <span>Next</span>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
