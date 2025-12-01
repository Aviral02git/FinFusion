import React, { useState } from 'react';
import { X, User, Mail, Phone, Building2, CreditCard, Hash, MapPin, Eye, EyeOff } from 'lucide-react';

export default function ProfileSettings({ isOpen, onClose, user, accounts }) {
    // ============================================
    // STATE - Store editable user information
    // ============================================
    const [userInfo, setUserInfo] = useState({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '+91 98765 43210'
    });

    // ============================================
    // STATE - Track which account numbers are visible
    // ============================================
    const [visibleAccounts, setVisibleAccounts] = useState({});

    // ============================================
    // TOGGLE ACCOUNT NUMBER VISIBILITY
    // ============================================
    const toggleAccountVisibility = (accountId) => {
        setVisibleAccounts(prev => ({
            ...prev,
            [accountId]: !prev[accountId]
        }));
    };

    // ============================================
    // MASK ACCOUNT NUMBER - Show only last 4 digits
    // ============================================
    const maskAccountNumber = (accountNumber) => {
        if (!accountNumber) return '****';
        const lastFour = accountNumber.slice(-4);
        return `**** **** **** ${lastFour}`;
    };

    // ============================================
    // HANDLE INPUT CHANGES
    // ============================================
    const handleChange = (field, value) => {
        setUserInfo(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // ============================================
    // SAVE PROFILE CHANGES
    // ============================================
    const handleSave = () => {
        // In a real app, this would call an API to update user info
        console.log('Saving user info:', userInfo);
        alert('Profile updated successfully!');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* ============================================ */}
                {/* HEADER */}
                {/* ============================================ */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <X size={24} className="text-gray-600" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* ============================================ */}
                    {/* PROFILE PICTURE */}
                    {/* ============================================ */}
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-3xl">{user.avatar}</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{userInfo.name}</h3>
                            <p className="text-sm text-gray-600">FinFusion User</p>
                        </div>
                    </div>

                    {/* ============================================ */}
                    {/* PERSONAL INFORMATION */}
                    {/* ============================================ */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <User size={16} className="inline mr-2" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={userInfo.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Mail size={16} className="inline mr-2" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={userInfo.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Phone size={16} className="inline mr-2" />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={userInfo.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ============================================ */}
                    {/* LINKED BANK ACCOUNTS - Detailed Information */}
                    {/* ============================================ */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Linked Bank Accounts</h3>
                        <div className="space-y-4">
                            {accounts.map((account) => (
                                <div
                                    key={account.id}
                                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                                >
                                    {/* Bank Name Header */}
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className={`w-12 h-12 ${account.bgColor} rounded-lg p-2 border border-gray-200 flex items-center justify-center`}>
                                            <img
                                                src={account.logo}
                                                alt={account.bank}
                                                className="w-full h-full object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.parentElement.innerHTML = `<span class="text-lg font-bold text-gray-700">${account.shortName.charAt(0)}</span>`;
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{account.bank}</h4>
                                            <p className="text-sm text-gray-600">{account.type} Account</p>
                                        </div>
                                    </div>

                                    {/* Account Details Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {/* Account Number with Eye Icon */}
                                        <div className="flex items-start space-x-2">
                                            <CreditCard size={16} className="text-gray-500 mt-1" />
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-600">Account Number</p>
                                                <div className="flex items-center space-x-2">
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {visibleAccounts[account.id]
                                                            ? account.fullAccountNumber || '1234567890123456'
                                                            : maskAccountNumber(account.fullAccountNumber || '1234567890123456')
                                                        }
                                                    </p>
                                                    <button
                                                        onClick={() => toggleAccountVisibility(account.id)}
                                                        className="p-1 hover:bg-gray-200 rounded transition"
                                                        title={visibleAccounts[account.id] ? 'Hide account number' : 'Show account number'}
                                                    >
                                                        {visibleAccounts[account.id] ? (
                                                            <EyeOff size={16} className="text-gray-600" />
                                                        ) : (
                                                            <Eye size={16} className="text-gray-600" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* IFSC Code */}
                                        <div className="flex items-start space-x-2">
                                            <Hash size={16} className="text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-xs text-gray-600">IFSC Code</p>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {account.ifscCode || `${account.shortName}0001234`}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Branch */}
                                        <div className="flex items-start space-x-2">
                                            <Building2 size={16} className="text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-xs text-gray-600">Branch</p>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {account.branch || 'Connaught Place, New Delhi'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* UPI ID */}
                                        <div className="flex items-start space-x-2">
                                            <MapPin size={16} className="text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-xs text-gray-600">UPI ID</p>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {account.upiId || `${userInfo.name.toLowerCase().replace(' ', '')}@${account.shortName.toLowerCase()}`}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Balance */}
                                        <div className="flex items-start space-x-2 md:col-span-2">
                                            <div className="w-4 h-4 bg-emerald-500 rounded-full mt-1"></div>
                                            <div>
                                                <p className="text-xs text-gray-600">Current Balance</p>
                                                <p className="text-lg font-bold text-emerald-600">
                                                    ₹{account.balance.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {accounts.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    <Building2 size={48} className="mx-auto mb-2 text-gray-400" />
                                    <p>No bank accounts linked yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ============================================ */}
                    {/* ACTION BUTTONS */}
                    {/* ============================================ */}
                    <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex-1 px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
