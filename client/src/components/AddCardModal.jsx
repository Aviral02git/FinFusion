import React, { useState } from 'react';
import { X, CreditCard, AlertCircle } from 'lucide-react';

export default function AddCardModal({ isOpen, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolderName: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        cardType: 'DEBIT',
        bank: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const banks = ['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB', 'Bank of Baroda', 'Canara Bank', 'Other'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        setFormData(prev => ({ ...prev, cardNumber: formatted }));
        if (errors.cardNumber) {
            setErrors(prev => ({ ...prev, cardNumber: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        // Card number validation (should be 16 digits)
        const cardNumberDigits = formData.cardNumber.replace(/\s/g, '');
        if (!cardNumberDigits) {
            newErrors.cardNumber = 'Card number is required';
        } else if (cardNumberDigits.length < 13 || cardNumberDigits.length > 19) {
            newErrors.cardNumber = 'Card number must be between 13-19 digits';
        }

        // Cardholder name validation
        if (!formData.cardHolderName.trim()) {
            newErrors.cardHolderName = 'Cardholder name is required';
        } else if (formData.cardHolderName.trim().length < 3) {
            newErrors.cardHolderName = 'Name must be at least 3 characters';
        }

        // Expiry validation
        if (!formData.expiryMonth) {
            newErrors.expiryMonth = 'Month required';
        }
        if (!formData.expiryYear) {
            newErrors.expiryYear = 'Year required';
        }

        // Check if card is not expired
        if (formData.expiryMonth && formData.expiryYear) {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            const expYear = parseInt(formData.expiryYear);
            const expMonth = parseInt(formData.expiryMonth);

            if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
                newErrors.expiryMonth = 'Card is expired';
            }
        }

        // CVV validation
        if (!formData.cvv) {
            newErrors.cvv = 'CVV is required';
        } else if (formData.cvv.length < 3 || formData.cvv.length > 4) {
            newErrors.cvv = 'CVV must be 3-4 digits';
        }

        // Bank validation
        if (!formData.bank) {
            newErrors.bank = 'Bank is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In a real app, you would call an API here
            console.log('Adding card:', formData);

            // Show success state and pass card data to parent
            if (onSuccess) {
                onSuccess(formData);
            }
            handleClose();
        } catch (error) {
            console.error('Error adding card:', error);
            setErrors({ submit: 'Failed to add card. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            cardNumber: '',
            cardHolderName: '',
            expiryMonth: '',
            expiryYear: '',
            cvv: '',
            cardType: 'DEBIT',
            bank: ''
        });
        setErrors({});
        setIsSubmitting(false);
        onClose();
    };

    if (!isOpen) return null;

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 15 }, (_, i) => currentYear + i);
    const months = Array.from({ length: 12 }, (_, i) => ({
        value: String(i + 1).padStart(2, '0'),
        label: new Date(2000, i).toLocaleString('default', { month: 'short' })
    }));

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-scale-in">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                            <CreditCard className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Add New Card</h2>
                            <p className="text-sm text-gray-600">Link your debit or credit card</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                        disabled={isSubmitting}
                    >
                        <X className="text-gray-500" size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-5">
                        {/* Error Message */}
                        {errors.submit && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                                <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                                <p className="text-sm text-red-700">{errors.submit}</p>
                            </div>
                        )}

                        {/* Card Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Card Type *
                            </label>
                            <div className="flex gap-4">
                                <label className="flex-1">
                                    <input
                                        type="radio"
                                        name="cardType"
                                        value="DEBIT"
                                        checked={formData.cardType === 'DEBIT'}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer transition peer-checked:border-emerald-500 peer-checked:bg-emerald-50 hover:border-emerald-300">
                                        <p className="font-semibold text-gray-900">Debit Card</p>
                                        <p className="text-sm text-gray-600">Direct bank account</p>
                                    </div>
                                </label>
                                <label className="flex-1">
                                    <input
                                        type="radio"
                                        name="cardType"
                                        value="CREDIT"
                                        checked={formData.cardType === 'CREDIT'}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer transition peer-checked:border-emerald-500 peer-checked:bg-emerald-50 hover:border-emerald-300">
                                        <p className="font-semibold text-gray-900">Credit Card</p>
                                        <p className="text-sm text-gray-600">Credit line</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Bank */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bank *
                            </label>
                            <select
                                name="bank"
                                value={formData.bank}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.bank ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                    }`}
                            >
                                <option value="">Select your bank</option>
                                {banks.map(bank => (
                                    <option key={bank} value={bank}>{bank}</option>
                                ))}
                            </select>
                            {errors.bank && (
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle size={14} /> {errors.bank}
                                </p>
                            )}
                        </div>

                        {/* Card Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Card Number *
                            </label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="1234 5678 9012 3456"
                                maxLength="19"
                                className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-lg ${errors.cardNumber ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                    }`}
                            />
                            {errors.cardNumber && (
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle size={14} /> {errors.cardNumber}
                                </p>
                            )}
                        </div>

                        {/* Cardholder Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cardholder Name *
                            </label>
                            <input
                                type="text"
                                name="cardHolderName"
                                value={formData.cardHolderName}
                                onChange={handleChange}
                                placeholder="JOHN DOE"
                                className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase ${errors.cardHolderName ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                    }`}
                            />
                            {errors.cardHolderName && (
                                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle size={14} /> {errors.cardHolderName}
                                </p>
                            )}
                        </div>

                        {/* Expiry and CVV */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Month *
                                </label>
                                <select
                                    name="expiryMonth"
                                    value={formData.expiryMonth}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.expiryMonth ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                        }`}
                                >
                                    <option value="">MM</option>
                                    {months.map(month => (
                                        <option key={month.value} value={month.value}>
                                            {month.value} - {month.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.expiryMonth && (
                                    <p className="mt-1 text-xs text-red-600">{errors.expiryMonth}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Year *
                                </label>
                                <select
                                    name="expiryYear"
                                    value={formData.expiryYear}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${errors.expiryYear ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                        }`}
                                >
                                    <option value="">YYYY</option>
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                                {errors.expiryYear && (
                                    <p className="mt-1 text-xs text-red-600">{errors.expiryYear}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CVV *
                                </label>
                                <input
                                    type="password"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                    placeholder="123"
                                    maxLength="4"
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-center ${errors.cvv ? 'border-red-300 bg-red-50' : 'border-gray-200'
                                        }`}
                                />
                                {errors.cvv && (
                                    <p className="mt-1 text-xs text-red-600">{errors.cvv}</p>
                                )}
                            </div>
                        </div>

                        {/* Privacy Notice */}
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                            <p className="text-sm text-emerald-800">
                                🔒 Your card information is encrypted and stored securely. We never share your data with third parties.
                            </p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="loading-spinner w-5 h-5"></div>
                                    Adding Card...
                                </>
                            ) : (
                                <>
                                    <CreditCard size={20} />
                                    Add Card
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
