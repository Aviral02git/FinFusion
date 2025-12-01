import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";
import { mockAnalytics, mockUser } from '../data/mockData';
import {
    BarChart3,
    TrendingUp,
    PieChart,
    Activity,
    Target,
    AlertCircle,
    Award,
    Sparkles,
    Menu,
    Bell,
    LogOut
} from "lucide-react";
import { Link } from 'react-router-dom';

export default function Insights() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    // Use mock data
    const analytics = mockAnalytics;
    const user = mockUser;

    // Calculations
    const totalExpense = analytics.totalSpending; // Use analytics total
    const totalIncome = analytics.totalIncome;
    const savingsRate = analytics.savingsRate;

    // Financial Health Score (0-100)
    const calculateHealthScore = () => {
        let score = 0;
        // Savings rate (40 points)
        score += Math.min(savingsRate * 0.8, 40);
        // Account balance (30 points) - simplified for insights page
        score += 25;
        // Budget adherence (30 points)
        const budgetScore = analytics.categories.reduce((acc, cat) => {
            return acc + (cat.amount <= cat.budget ? 5 : 0);
        }, 0);
        score += budgetScore;
        return Math.round(Math.min(score, 100));
    };

    const healthScore = calculateHealthScore();

    const getHealthLabel = (score) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Fair';
        return 'Needs Attention';
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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
                                    <BarChart3 className="text-white" size={24} />
                                </div>

                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Financial Insights</h1>
                                    <p className="text-xs text-gray-500">Analytics & Trends</p>
                                </div>
                            </div>

                            {/* Right - Notifications + Profile */}
                            <div className="flex items-center space-x-4">
                                <button
                                    className="relative p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                                >
                                    <Bell size={20} />
                                </button>

                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow">
                                        <span className="text-white font-semibold lowercase">{user.avatar}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

                    {/* FINANCIAL HEALTH HERO SECTION */}
                    <div className="mb-8 animate-scale-in">
                        <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl hover-lift relative overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                            <Award className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <p className="text-white/80 text-sm">Financial Health Score</p>
                                            <p className="text-3xl font-bold">{healthScore}/100</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                            <Sparkles size={16} />
                                            <span className="font-semibold">{getHealthLabel(healthScore)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-white/20 rounded-full h-3 mb-4 overflow-hidden">
                                    <div
                                        className="bg-white h-full rounded-full progress-bar-animated shadow-lg"
                                        style={{ width: `${healthScore}%` }}
                                    ></div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                        <p className="text-white/70 text-xs mb-1">Savings Rate</p>
                                        <p className="text-2xl font-bold">{savingsRate}%</p>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                        <p className="text-white/70 text-xs mb-1">Monthly Income</p>
                                        <p className="text-2xl font-bold">₹{(totalIncome / 1000).toFixed(0)}K</p>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                        <p className="text-white/70 text-xs mb-1">Monthly Expenses</p>
                                        <p className="text-2xl font-bold">₹{(totalExpense / 1000).toFixed(0)}K</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* EXPENSE BREAKDOWN PIE CHART */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-2">
                                    <PieChart className="text-emerald-600" size={20} />
                                    <h3 className="text-xl font-bold">Expense Breakdown</h3>
                                </div>
                                <span className="text-sm text-gray-500">This Month</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Pie Chart Visual */}
                                <div className="flex items-center justify-center">
                                    <div className="relative w-48 h-48">
                                        {/* Simple CSS Pie Chart */}
                                        <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                            {analytics.categories.map((category, index) => {
                                                const prevPercentage = analytics.categories
                                                    .slice(0, index)
                                                    .reduce((sum, cat) => sum + cat.percentage, 0);
                                                const strokeDasharray = `${category.percentage} ${100 - category.percentage}`;
                                                const strokeDashoffset = -prevPercentage;

                                                return (
                                                    <circle
                                                        key={category.name}
                                                        cx="50"
                                                        cy="50"
                                                        r="15.915"
                                                        fill="transparent"
                                                        stroke={category.color}
                                                        strokeWidth="31.83"
                                                        strokeDasharray={strokeDasharray}
                                                        strokeDashoffset={strokeDashoffset}
                                                        className="transition-all duration-500 hover:opacity-80"
                                                    />
                                                );
                                            })}
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-gray-900">₹{(analytics.totalSpending / 1000).toFixed(0)}K</p>
                                                <p className="text-xs text-gray-500">Total</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Category List */}
                                <div className="space-y-3">
                                    {analytics.categories.map((category) => (
                                        <div key={category.name} className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition">
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: category.color }}
                                                ></div>
                                                <span className="text-sm font-medium text-gray-700">{category.name}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-gray-900">₹{category.amount.toLocaleString()}</p>
                                                <p className="text-xs text-gray-500">{category.percentage}%</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* SPENDING TRENDS */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-2">
                                    <BarChart3 className="text-emerald-600" size={20} />
                                    <h3 className="text-xl font-bold">Spending Trends</h3>
                                </div>
                                <span className="text-sm text-gray-500">Last 6 Months</span>
                            </div>

                            {/* Simple Bar Chart */}
                            <div className="flex items-end justify-between space-x-2 h-48">
                                {analytics.monthlyTrends.map((trend, index) => {
                                    const maxSpending = Math.max(...analytics.monthlyTrends.map(t => t.spending));
                                    const heightPercentage = (trend.spending / maxSpending * 100);

                                    return (
                                        <div key={trend.month} className="flex-1 flex flex-col items-center group">
                                            <div className="w-full flex flex-col items-center justify-end h-full">
                                                <div className="relative w-full">
                                                    <div
                                                        className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg hover:from-emerald-600 hover:to-emerald-500 transition-all cursor-pointer"
                                                        style={{
                                                            height: `${heightPercentage * 1.5}px`,
                                                            animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                                                        }}
                                                    ></div>
                                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                                        ₹{(trend.spending / 1000).toFixed(0)}K
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-600 mt-2 font-medium">{trend.month}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* BUDGET TRACKING */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover-lift mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-2">
                                <Target className="text-emerald-600" size={20} />
                                <h3 className="text-xl font-bold">Budget Tracking</h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {analytics.categories.map((category) => {
                                const percentage = (category.amount / category.budget * 100).toFixed(0);
                                const isOverBudget = category.amount > category.budget;

                                return (
                                    <div key={category.name} className="group">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-gray-700">{category.name}</span>
                                            <span className={`text-sm font-bold ${isOverBudget ? 'text-red-600' : 'text-gray-900'}`}>
                                                ₹{category.amount.toLocaleString()} / ₹{category.budget.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full progress-bar-animated ${isOverBudget ? 'bg-red-500' : 'bg-emerald-500'
                                                    }`}
                                                style={{ width: `${Math.min(percentage, 100)}%` }}
                                            ></div>
                                        </div>
                                        {isOverBudget && (
                                            <p className="text-xs text-red-600 mt-1 flex items-center">
                                                <AlertCircle size={12} className="mr-1" />
                                                Over budget by ₹{(category.amount - category.budget).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
