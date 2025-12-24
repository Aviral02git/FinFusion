import { bankAccountAPI } from './api';
import { mockAccounts } from '../data/mockData';

// Configuration: Set to true to use mock data, false to use real API
const USE_MOCK_DATA = false;

/**
 * Bank Account Service
 * Handles all bank account operations with automatic fallback to mock data
 */
export const bankAccountService = {
    /**
     * Get all bank accounts
     * @returns {Promise<Array>} Array of bank accounts
     */
    getAll: async () => {
        if (USE_MOCK_DATA) {
            // Use localStorage for persistence with mock data
            const savedAccounts = localStorage.getItem('finfusion_accounts');
            return savedAccounts ? JSON.parse(savedAccounts) : mockAccounts;
        }

        try {
            const response = await bankAccountAPI.getAll();
            return response.data || [];
        } catch (error) {
            console.error('Error fetching accounts:', error);
            throw error;
        }
    },

    /**
     * Create new bank account
     * @param {Object} accountData - Account details
     * @returns {Promise<Object>} Created account
     */
    create: async (accountData) => {
        if (USE_MOCK_DATA) {
            // Mock creation - add to localStorage
            const accounts = await bankAccountService.getAll();
            const newAccount = {
                ...accountData,
                id: Math.max(...accounts.map(a => a.id), 0) + 1,
            };
            const updatedAccounts = [...accounts, newAccount];
            localStorage.setItem('finfusion_accounts', JSON.stringify(updatedAccounts));
            return newAccount;
        }

        try {
            const response = await bankAccountAPI.create(accountData);
            return response.data;
        } catch (error) {
            console.error('Error creating account:', error);
            throw error;
        }
    },

    /**
     * Delete bank account
     * @param {number} accountId - Account ID to delete
     * @returns {Promise<boolean>} Success status
     */
    delete: async (accountId) => {
        if (USE_MOCK_DATA) {
            // Mock deletion - remove from localStorage
            const accounts = await bankAccountService.getAll();
            const updatedAccounts = accounts.filter(acc => acc.id !== accountId);
            localStorage.setItem('finfusion_accounts', JSON.stringify(updatedAccounts));
            return true;
        }

        try {
            await bankAccountAPI.delete(accountId);
            return true;
        } catch (error) {
            console.error('Error deleting account:', error);
            throw error;
        }
    },

    /**
     * Update bank account
     * @param {number} accountId - Account ID to update
     * @param {Object} accountData - Updated account details
     * @returns {Promise<Object>} Updated account
     */
    update: async (accountId, accountData) => {
        if (USE_MOCK_DATA) {
            // Mock update - update in localStorage
            const accounts = await bankAccountService.getAll();
            const updatedAccounts = accounts.map(acc =>
                acc.id === accountId ? { ...acc, ...accountData } : acc
            );
            localStorage.setItem('finfusion_accounts', JSON.stringify(updatedAccounts));
            return updatedAccounts.find(acc => acc.id === accountId);
        }

        try {
            const response = await bankAccountAPI.update(accountId, accountData);
            return response.data;
        } catch (error) {
            console.error('Error updating account:', error);
            throw error;
        }
    },
};

export default bankAccountService;
