# FinFusion Backend API Documentation

A secure RESTful API for managing personal finances, bank accounts, and transactions.

## 🚀 Base URL

**Local Development:**
```
http://localhost:8080
```

**Production (Render):**
```
https://your-app.onrender.com
```

---

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication. Include the token in the Authorization header for protected routes:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📋 API Endpoints

### 🔑 Authentication

#### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 🏦 Bank Accounts

All bank account endpoints require authentication.

#### Get All Bank Accounts
```http
GET /api/bank
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "bankName": "State Bank of India",
      "shortName": "SBI",
      "accountNo": "1234567890",
      "type": "SAVINGS",
      "balance": 125840.50,
      "logo": "https://example.com/sbi-logo.png",
      "color": "#0066cc",
      "bgColor": "#e6f2ff",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "userId": 1
    }
  ]
}
```

#### Create Bank Account
```http
POST /api/bank/create
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**
```json
{
  "bankName": "HDFC Bank",
  "shortName": "HDFC",
  "accountNo": "9876543210",
  "type": "SAVINGS",
  "balance": 50000,
  "logo": "https://example.com/hdfc-logo.png",
  "color": "#004c8c",
  "bgColor": "#e6f0ff"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Bank account added successfully",
  "data": {
    "id": 2,
    "bankName": "HDFC Bank",
    "shortName": "HDFC",
    "accountNo": "9876543210",
    "type": "SAVINGS",
    "balance": 50000,
    "userId": 1
  }
}
```

#### Delete Bank Account
```http
DELETE /api/bank/:id
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "message": "Bank account deleted successfully"
}
```

---

### 💸 Transactions

All transaction endpoints require authentication.

#### Get All Transactions
```http
GET /api/transactions
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| accountId | number | Filter by bank account ID |
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |
| search | string | Search in description/category |
| category | string | Filter by category (FOOD, SHOPPING, etc.) |
| type | string | Filter by type (CREDIT, DEBIT) |
| sortBy | string | Sort field (timestamp, amount, type) |
| sortOrder | string | Sort order (asc, desc) |
| startDate | string | Start date (ISO format) |
| endDate | string | End date (ISO format) |
| minAmount | number | Minimum amount |
| maxAmount | number | Maximum amount |

**Example:**
```
GET /api/transactions?accountId=1&type=DEBIT&limit=20&page=1
```

**Response:**
```json
{
  "success": true,
  "transactions": [
    {
      "id": 1,
      "amount": 1500.00,
      "type": "DEBIT",
      "category": "FOOD",
      "description": "Grocery shopping",
      "timestamp": "2024-01-15T14:30:00.000Z",
      "userId": 1,
      "accountId": 1,
      "account": {
        "id": 1,
        "bankName": "State Bank of India",
        "accountNo": "1234567890"
      }
    }
  ],
  "total": 50,
  "page": 1,
  "totalPages": 5
}
```

#### Create Transaction
```http
POST /api/transactions/create
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**
```json
{
  "amount": 1500,
  "type": "DEBIT",
  "category": "FOOD",
  "description": "Grocery shopping",
  "accountId": 1
}
```

**Valid Categories:**
- `FOOD`
- `SHOPPING`
- `TRANSPORT`
- `BILLS`
- `ENTERTAINMENT`
- `TRANSFER`
- `INCOME`
- `REFUND`
- `OTHER`

**Valid Types:**
- `CREDIT`
- `DEBIT`

**Response:**
```json
{
  "message": "Transaction successful",
  "transaction": {
    "id": 1,
    "amount": 1500.00,
    "type": "DEBIT",
    "category": "FOOD",
    "description": "Grocery shopping",
    "timestamp": "2024-01-15T14:30:00.000Z",
    "userId": 1,
    "accountId": 1
  },
  "updatedBalance": 124340.50
}
```

---

### 📊 Analytics

All analytics endpoints require authentication.

#### Get Summary
```http
GET /api/analytics/summary
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "totalBalance": 125840.50,
  "totalIncome": 50000.00,
  "totalExpenses": 24159.50,
  "savingsRate": 51.68,
  "transactionCount": 45
}
```

#### Get Spending by Category
```http
GET /api/analytics/spending-by-category
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "categories": [
    {
      "category": "FOOD",
      "total": 12000.00,
      "percentage": 49.7
    },
    {
      "category": "TRANSPORT",
      "total": 8000.00,
      "percentage": 33.1
    }
  ]
}
```

#### Get Monthly Trends
```http
GET /api/analytics/monthly-trends
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "trends": [
    {
      "month": "2024-01",
      "income": 50000.00,
      "expenses": 24159.50,
      "savings": 25840.50
    }
  ]
}
```

#### Get Top Merchants
```http
GET /api/analytics/top-merchants
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "merchants": [
    {
      "description": "Grocery shopping",
      "total": 12000.00,
      "count": 12
    }
  ]
}
```

#### Get Net Worth
```http
GET /api/analytics/net-worth
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "netWorth": 125840.50,
  "assets": 125840.50,
  "liabilities": 0
}
```

---

### 🔔 Notifications

All notification endpoints require authentication.

#### Get All Notifications
```http
GET /api/notifications
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "title": "Payment made",
      "message": "₹1500 deducted from your account",
      "read": false,
      "createdAt": "2024-01-15T14:30:00.000Z"
    }
  ]
}
```

#### Mark Notification as Read
```http
PUT /api/notifications/:id/read
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "message": "Notification marked as read",
  "data": {
    "id": 1,
    "read": true
  }
}
```

#### Delete Notification
```http
DELETE /api/notifications/:id
```

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "message": "Notification deleted successfully"
}
```

---

## 🛠️ Error Responses

All errors follow this format:

```json
{
  "message": "Error description"
}
```

**Common HTTP Status Codes:**

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 🔒 Security

- All passwords are hashed using bcrypt
- JWT tokens expire after 1 day
- Protected routes require valid JWT token
- CORS enabled for specified origins
- Input validation on all endpoints

---

## 🗄️ Database Schema

### User
- id (Int, Primary Key)
- name (String)
- email (String, Unique)
- password (String, Hashed)
- role (Enum: USER, ADMIN)
- createdAt (DateTime)

### BankAccount
- id (Int, Primary Key)
- bankName (String)
- shortName (String)
- accountNo (String, Unique)
- type (Enum: SAVINGS, CURRENT)
- balance (Decimal)
- logo (String)
- color (String)
- bgColor (String)
- userId (Int, Foreign Key)
- createdAt (DateTime)

### Transaction
- id (Int, Primary Key)
- amount (Decimal)
- type (Enum: CREDIT, DEBIT)
- category (Enum: FOOD, SHOPPING, etc.)
- description (String)
- timestamp (DateTime)
- userId (Int, Foreign Key)
- accountId (Int, Foreign Key)

### Notification
- id (Int, Primary Key)
- title (String)
- message (String)
- read (Boolean)
- createdAt (DateTime)
- userId (Int, Foreign Key)

---

## 🚀 Getting Started

### Prerequisites
- Node.js v14+
- MySQL database
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/finfusion.git
cd finfusion/server
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run database migrations
```bash
npx prisma migrate dev
```

5. (Optional) Seed the database
```bash
npm run seed
```

6. Start the server
```bash
# Development
npm run dev

# Production
npm start
```

---

## 📝 Environment Variables

```env
PORT=8080
DATABASE_URL="mysql://user:password@localhost:3306/finfusion"
JWT_SECRET="your-secret-key-here"
NODE_ENV="development"
```

---

## 🧪 Testing

Test the API using tools like:
- Postman
- Insomnia
- cURL
- Thunder Client (VS Code Extension)

### Example cURL Request:

```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login and get token
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get bank accounts (use token from login)
curl -X GET http://localhost:8080/api/bank \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📦 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Prisma
- **Authentication:** JWT
- **Password Hashing:** bcrypt

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 📄 License

This project is licensed under the ISC License.
