import { transactionAPI } from './api';
import { mockTransactions } from '../data/mockData';

// Configuration: Set to true to use mock data, false to use real API
const USE_MOCK_DATA = false;

/**
 * Transaction Service
 * Handles all transaction operations with automatic fallback to mock data
 */
export const transactionService = {
    /**
     * Get all transactions with optional filters
     * @param {Object} params - Query parameters (page, limit, sortBy, filters, etc.)
     * @returns {Promise<Object>} Transactions with pagination info
     */
    getAll: async (params = {}) => {
        if (USE_MOCK_DATA) {
            // Return mock transactions
            // In a real scenario, you'd apply filters here
            return {
                transactions: mockTransactions,
                total: mockTransactions.length,
                page: params.page || 1,
                totalPages: Math.ceil(mockTransactions.length / (params.limit || 10)),
            };
        }

        try {
            const response = await transactionAPI.getAll(params);
            return response;
        } catch (error) {
            console.error('Error fetching transactions:', error);
            throw error;
        }
    },

    /**
     * Create new transaction
     * @param {Object} transactionData - Transaction details
     * @returns {Promise<Object>} Created transaction
     */
    create: async (transactionData) => {
        if (USE_MOCK_DATA) {
            // Mock creation
            const newTransaction = {
                ...transactionData,
                id: Math.max(...mockTransactions.map(t => t.id), 0) + 1,
                timestamp: new Date().toISOString(),
            };
            return newTransaction;
        }

        try {
            const response = await transactionAPI.create(transactionData);
            return response.data;
        } catch (error) {
            console.error('Error creating transaction:', error);
            throw error;
        }
    },
};

export default transactionService;
