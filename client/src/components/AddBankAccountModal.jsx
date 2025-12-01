import React, { useState } from 'react';
import { X, Building2, CreditCard, DollarSign } from 'lucide-react';

export default function AddBankAccountModal({ isOpen, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        bankName: '',
        shortName: '',
        accountNo: '',
        type: 'SAVINGS',
        balance: '',
        logo: '',
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const colorOptions = [
        { value: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', label: 'Blue', preview: 'bg-blue-500' },
        { value: 'from-red-500 to-red-600', bg: 'bg-red-50', label: 'Red', preview: 'bg-red-500' },
        { value: 'from-orange-500 to-orange-600', bg: 'bg-orange-50', label: 'Orange', preview: 'bg-orange-500' },
        { value: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50', label: 'Emerald', preview: 'bg-emerald-500' },
        { value: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', label: 'Purple', preview: 'bg-purple-500' },
        { value: 'from-pink-500 to-pink-600', bg: 'bg-pink-50', label: 'Pink', preview: 'bg-pink-500' },
        { value: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-50', label: 'Indigo', preview: 'bg-indigo-500' },
        { value: 'from-teal-500 to-teal-600', bg: 'bg-teal-50', label: 'Teal', preview: 'bg-teal-500' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleColorSelect = (color, bgColor) => {
        setFormData(prev => ({ ...prev, color, bgColor }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!formData.bankName || !formData.accountNo) {
            setError('Bank name and account number are required');
            return;
        }

        if (formData.accountNo.length < 8) {
            setError('Account number must be at least 8 characters');
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token'); // Adjust based on your auth implementation

            const response = await fetch('http://localhost:5000/bank/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    balance: formData.balance ? parseFloat(formData.balance) : 0
                })
            });

            const data = await response.json();

            if (data.success) {
                // Reset form
                setFormData({
                    bankName: '',
                    shortName: '',
                    accountNo: '',
                    type: 'SAVINGS',
                    balance: '',
                    logo: '',
                    color: 'from-blue-500 to-blue-600',
                    bgColor: 'bg-blue-50'
                });

                onSuccess(data.data);
                onClose();
            } else {
                setError(data.message || 'Failed to add bank account');
            }
        } catch (err) {
            console.error('Error adding bank account:', err);
            setError('Failed to add bank account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                            <Building2 className="text-white" size={20} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Add Bank Account</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <X size={24} className="text-gray-600" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {error && (
                        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                            <p className="text-red-600 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Bank Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Bank Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                            placeholder="e.g., State Bank of India"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition"
                            required
                        />
                    </div>

                    {/* Short Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Short Name (Optional)
                        </label>
                        <input
                            type="text"
                            name="shortName"
                            value={formData.shortName}
                            onChange={handleChange}
                            placeholder="e.g., SBI"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition"
                        />
                    </div>

                    {/* Account Number */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Account Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="accountNo"
                            value={formData.accountNo}
                            onChange={handleChange}
                            placeholder="Enter your account number"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition"
                            required
                        />
                    </div>

                    {/* Account Type and Balance */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Account Type
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition"
                            >
                                <option value="SAVINGS">Savings</option>
                                <option value="CURRENT">Current</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Initial Balance (₹)
                            </label>
                            <input
                                type="number"
                                name="balance"
                                value={formData.balance}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                                step="0.01"
                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition"
                            />
                        </div>
                    </div>

                    {/* Logo URL */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Bank Logo URL (Optional)
                        </label>
                        <input
                            type="url"
                            name="logo"
                            value={formData.logo}
                            onChange={handleChange}
                            placeholder="https://example.com/logo.png"
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition"
                        />
                    </div>

                    {/* Color Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Choose Card Color
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                            {colorOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleColorSelect(option.value, option.bg)}
                                    className={`p-4 rounded-xl border-2 transition ${formData.color === option.value
                                            ? 'border-emerald-500 bg-emerald-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className={`w-full h-12 ${option.preview} rounded-lg mb-2`}></div>
                                    <p className="text-xs font-medium text-gray-700">{option.label}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Preview */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Preview
                        </label>
                        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-14 h-14 ${formData.bgColor} rounded-xl p-2 shadow-sm border border-gray-200 flex items-center justify-center`}>
                                    {formData.logo ? (
                                        <img src={formData.logo} alt="Bank logo" className="w-full h-full object-contain" />
                                    ) : (
                                        <Building2 className="text-gray-400" size={24} />
                                    )}
                                </div>
                            </div>
                            <h4 className="font-bold text-gray-900 mb-1">
                                {formData.bankName || 'Bank Name'}
                            </h4>
                            <p className="text-xs text-gray-600 mb-3">
                                {formData.type} • {formData.accountNo ? `****${formData.accountNo.slice(-4)}` : '****0000'}
                            </p>
                            <p className="text-2xl font-bold text-gray-900">
                                ₹{formData.balance ? parseFloat(formData.balance).toLocaleString() : '0'}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:from-emerald-600 hover:to-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Adding...' : 'Add Account'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
