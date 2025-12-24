import React, { useState } from 'react';
import { X, DollarSign } from 'lucide-react';

export default function AddTransactionModal({ isOpen, onClose, onSuccess, type = 'DEBIT', accounts = [] }) {
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        category: 'OTHER',
        accountId: '',
        type: type
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const categories = [
        'FOOD', 'SHOPPING', 'TRANSPORT', 'BILLS',
        'ENTERTAINMENT', 'TRANSFER', 'INCOME', 'REFUND', 'OTHER'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.accountId) {
            setError('Please select an account');
            return;
        }

        if (!formData.amount || formData.amount <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/transactions/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    amount: parseFloat(formData.amount),
                    type: formData.type,
                    description: formData.description,
                    category: formData.category,
                    accountId: parseInt(formData.accountId)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create transaction');
            }

            // Reset form
            setFormData({
                amount: '',
                description: '',
                category: 'OTHER',
                accountId: '',
                type: type
            });

            // Call success callback
            if (onSuccess) {
                onSuccess(data);
            }

            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type === 'CREDIT' ? 'bg-emerald-100' : 'bg-red-100'
                                }`}>
                                <DollarSign className={type === 'CREDIT' ? 'text-emerald-600' : 'text-red-600'} size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {type === 'CREDIT' ? 'Add Income' : 'Add Expense'}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            disabled={loading}
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Account *
                        </label>
                        <select
                            value={formData.accountId}
                            onChange={(e) => handleChange('accountId', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                            required
                        >
                            <option value="">Choose an account</option>
                            {accounts.map(account => (
                                <option key={account.id} value={account.id}>
                                    {account.bankName || account.bank || account.shortName || 'Unknown Account'}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amount (₹) *
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={formData.amount}
                            onChange={(e) => handleChange('amount', e.target.value)}
                            placeholder="0.00"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <input
                            type="text"
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            placeholder={type === 'CREDIT' ? 'e.g., Salary, Freelance' : 'e.g., Grocery, Uber'}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => handleChange('category', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-medium transition"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`flex-1 px-6 py-3 rounded-xl text-white font-medium transition hover-lift ${type === 'CREDIT'
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-lg'
                                : 'bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg'
                                } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                            disabled={loading}
                        >
                            {loading && <div className="loading-spinner w-5 h-5 border-2"></div>}
                            {loading ? 'Processing...' : type === 'CREDIT' ? 'Add Income' : 'Add Expense'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
