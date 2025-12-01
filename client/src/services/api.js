// Base API URL - uses environment variable in production, localhost in development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Helper function to get auth token
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Helper function to make authenticated requests
const authenticatedFetch = async (url, options = {}) => {
    const token = getAuthToken();

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API request failed');
    }

    return response.json();
};

// Bank Account APIs
export const bankAccountAPI = {
    // Get all bank accounts
    getAll: async () => {
        return authenticatedFetch('/api/bank');
    },

    // Create new bank account
    create: async (accountData) => {
        return authenticatedFetch('/api/bank/create', {
            method: 'POST',
            body: JSON.stringify(accountData),
        });
    },

    // Delete bank account
    delete: async (accountId) => {
        return authenticatedFetch(`/api/bank/${accountId}`, {
            method: 'DELETE',
        });
    },

    // Update bank account
    update: async (accountId, accountData) => {
        return authenticatedFetch(`/api/bank/${accountId}`, {
            method: 'PUT',
            body: JSON.stringify(accountData),
        });
    },
};

// Transaction APIs
export const transactionAPI = {
    // Get all transactions with filters
    getAll: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return authenticatedFetch(`/api/transactions?${queryString}`);
    },

    // Create new transaction
    create: async (transactionData) => {
        return authenticatedFetch('/api/transactions/create', {
            method: 'POST',
            body: JSON.stringify(transactionData),
        });
    },
};

// Notification APIs
export const notificationAPI = {
    // Get all notifications
    getAll: async () => {
        return authenticatedFetch('/notifications');
    },

    // Mark notification as read
    markAsRead: async (notificationId) => {
        return authenticatedFetch(`/notifications/${notificationId}/read`, {
            method: 'PUT',
        });
    },
};

// Analytics APIs
export const analyticsAPI = {
    // Get spending analytics
    getSpendingAnalytics: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return authenticatedFetch(`/analytics?${queryString}`);
    },
};

// Authentication APIs
export const authAPI = {
    // User signup
    signup: async (userData) => {
        return fetch(`${API_BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }).then(res => res.json());
    },

    // User login
    login: async (credentials) => {
        return fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        }).then(res => res.json());
    },

    // User logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
};

export default {
    bankAccountAPI,
    transactionAPI,
    notificationAPI,
    analyticsAPI,
    authAPI,
};
