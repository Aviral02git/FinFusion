import axios from "axios";

const API = "http://localhost:8080/api";

export const getSummary = (token) =>
  axios.get(`${API}/analytics/summary`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getSpendingCategory = (token) =>
  axios.get(`${API}/analytics/spending-by-category`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getMonthlyTrends = (token) =>
  axios.get(`${API}/analytics/monthly-trends?months=6`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getRecentTransactions = (token) =>
  axios.get(`${API}/transactions?limit=5`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getNetWorth = (token) =>
  axios.get(`${API}/analytics/net-worth`, {
    headers: { Authorization: `Bearer ${token}` },
  });
