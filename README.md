# FinFusion 💰

A modern, full-stack personal finance management application built with React and Node.js. Track your transactions, manage multiple bank accounts, and gain insights into your spending patterns with beautiful visualizations.

![FinFusion](https://img.shields.io/badge/FinFusion-v1.0.0-emerald)
![License](https://img.shields.io/badge/license-ISC-blue)
![React](https://img.shields.io/badge/React-19.0.0-61dafb)
![Node](https://img.shields.io/badge/Node.js-Express-green)

---

## 🌟 Features

- **🏦 Multi-Bank Account Management** - Connect and manage multiple bank accounts in one place
- **💸 Transaction Tracking** - Comprehensive transaction history with advanced filtering and sorting
- **📊 Analytics Dashboard** - Visual insights into spending patterns, categories, and trends
- **🔔 Real-time Notifications** - Stay updated with transaction alerts and account updates
- **🔐 Secure Authentication** - JWT-based authentication with bcrypt password hashing
- **📱 Responsive Design** - Beautiful UI that works seamlessly across all devices
- **🎨 Modern UI/UX** - Built with Tailwind CSS and Lucide icons

---

## 🛠️ Tech Stack

### Frontend
- **React** 19.0.0 - UI library
- **React Router DOM** - Client-side routing
- **Recharts** - Data visualization
- **Lucide React** - Icon system
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** 5.1.0 - Web framework
- **Prisma** 6.18.0 - ORM for database management
- **PostgreSQL** - Primary database (via Neon)
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **dotenv** - Environment configuration
- **CORS** - Cross-origin resource sharing

---

## 📁 Project Structure

```
FinFusion/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       ├── services/       # API services
│       ├── data/           # Mock data
│       └── App.js
│
└── server/                 # Node.js backend
    ├── prisma/
    │   ├── schema.prisma   # Database schema
    │   └── seed.js         # Database seeding
    ├── src/
    │   ├── controllers/    # Business logic
    │   ├── routes/         # API routes
    │   └── middlewares/    # Auth & validation
    └── index.js            # Entry point
```

---

## 🔌 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login user | ❌ |
| `GET` | `/api/auth/test` | Test auth route | ❌ |

**Request Body (Register/Login):**
```json
{
  "name": "John Doe",       // Register only
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

---

### 🏦 Bank Accounts

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/bank` | Get all user's bank accounts | ✅ |
| `POST` | `/api/bank/create` | Create new bank account | ✅ |
| `DELETE` | `/api/bank/:id` | Delete bank account | ✅ |

**Request Body (Create):**
```json
{
  "bankName": "State Bank of India",
  "shortName": "SBI",
  "accountNo": "1234567890",
  "type": "SAVINGS",
  "balance": 50000.00,
  "logo": "https://example.com/logo.svg",
  "color": "#1E6898",
  "bgColor": "#E6F2FF"
}
```

---

### 💸 Transactions

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/transactions` | Get transactions with filters | ✅ |
| `POST` | `/api/transactions/create` | Create new transaction | ✅ |

**Query Parameters (GET):**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field: `timestamp`, `amount` (default: timestamp)
- `sortOrder` - `asc` or `desc` (default: desc)
- `type` - Filter by type: `CREDIT` or `DEBIT`
- `category` - Filter by category: `FOOD`, `SHOPPING`, `TRANSPORT`, `BILLS`, etc.
- `search` - Search in description
- `startDate` - Start date filter (ISO format)
- `endDate` - End date filter (ISO format)
- `minAmount` - Minimum amount
- `maxAmount` - Maximum amount

**Request Body (Create):**
```json
{
  "amount": 2500,
  "type": "DEBIT",
  "category": "FOOD",
  "description": "Grocery shopping",
  "accountId": 1
}
```

**Categories:**
- `FOOD` - Food and dining
- `SHOPPING` - Shopping and retail
- `TRANSPORT` - Transportation
- `BILLS` - Utilities and bills
- `ENTERTAINMENT` - Entertainment
- `TRANSFER` - Money transfers
- `INCOME` - Income
- `REFUND` - Refunds
- `OTHER` - Miscellaneous

---

### 📊 Analytics

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/analytics/summary` | Get financial summary | ✅ |
| `GET` | `/api/analytics/spending-by-category` | Get spending breakdown by category | ✅ |
| `GET` | `/api/analytics/monthly-trends` | Get monthly income/expense trends | ✅ |
| `GET` | `/api/analytics/top-merchants` | Get top spending merchants | ✅ |
| `GET` | `/api/analytics/net-worth` | Get net worth calculation | ✅ |

**Query Parameters:**
- `period` - Time period: `7d`, `30d`, `90d`, `1y` (default: 30d)
- `accountId` - Filter by specific account

---

### 🔔 Notifications

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/notifications` | Get all notifications | ✅ |
| `POST` | `/api/notifications/create` | Create notification | ✅ |
| `PUT` | `/api/notifications/read/:id` | Mark notification as read | ✅ |
| `DELETE` | `/api/notifications/:id` | Delete notification | ✅ |

---

## 🔄 Backend Architecture & Flow

### 1️⃣ Request Flow

```mermaid
graph LR
    A[Client Request] --> B[Express Server]
    B --> C{Auth Required?}
    C -->|Yes| D[JWT Verification]
    C -->|No| E[Route Handler]
    D -->|Valid| E
    D -->|Invalid| F[401 Unauthorized]
    E --> G[Controller Logic]
    G --> H[Prisma ORM]
    H --> I[(PostgreSQL)]
    I --> H
    H --> G
    G --> J[JSON Response]
```

### 2️⃣ Authentication Flow

1. **Registration:**
   - User submits credentials
   - Password is hashed using bcrypt
   - User record created in database
   - JWT token generated and returned

2. **Login:**
   - User submits credentials
   - Password verified against hash
   - JWT token generated with user payload
   - Token sent to client

3. **Protected Routes:**
   - Client sends JWT in `Authorization: Bearer <token>` header
   - `verifyToken` middleware validates JWT
   - User info extracted and attached to `req.user`
   - Controller accesses `req.user.id` for database queries

### 3️⃣ Transaction Creation Flow

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant DB
    
    Client->>Server: POST /api/transactions/create
    Server->>Server: Verify JWT Token
    Server->>DB: Check Account Ownership
    DB-->>Server: Account Details
    Server->>Server: Validate Amount & Balance
    Server->>DB: Atomic Transaction
    Note over DB: 1. Create Transaction<br/>2. Update Balance<br/>3. Create Notification
    DB-->>Server: Transaction Result
    Server-->>Client: Success Response
```

### 4️⃣ Database Schema

**Key Models:**

```prisma
User {
  id: Int (PK)
  name: String
  email: String (Unique)
  password: String (Hashed)
  role: Enum (USER, ADMIN)
  bankAccounts: BankAccount[]
  transactions: Transaction[]
  notifications: Notification[]
}

BankAccount {
  id: Int (PK)
  bankName: String
  accountNo: String (Unique)
  type: Enum (SAVINGS, CURRENT)
  balance: Decimal
  userId: Int (FK)
  transactions: Transaction[]
}

Transaction {
  id: Int (PK)
  amount: Decimal
  type: Enum (CREDIT, DEBIT)
  category: Enum
  description: String
  timestamp: DateTime
  userId: Int (FK)
  accountId: Int (FK)
}

Notification {
  id: Int (PK)
  title: String
  message: String
  read: Boolean
  userId: Int (FK)
}
```

### 5️⃣ Error Handling

- **400 Bad Request** - Invalid input data
- **401 Unauthorized** - Missing or invalid token
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server-side errors

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database (or Neon account)
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/FinFusion.git
cd FinFusion
```

2. **Install server dependencies:**
```bash
cd server
npm install
```

3. **Install client dependencies:**
```bash
cd ../client
npm install
```

4. **Configure environment variables:**

Create `.env` file in the `server` directory:
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
JWT_SECRET="your-super-secret-jwt-key"
PORT=8080
```

5. **Setup database:**
```bash
cd server
npx prisma generate
npx prisma db push
npm run seed  # Optional: Populate with demo data
```

6. **Start the development servers:**

**Backend:**
```bash
cd server
npm run dev  # Runs on http://localhost:8080
```

**Frontend:**
```bash
cd client
npm start  # Runs on http://localhost:3000
```

---

## 📦 Available Scripts

### Server
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with demo data

### Client
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

---

## 🗄️ Database Seeding

The project includes a comprehensive seed script that populates the database with realistic demo data:

```bash
cd server
npm run seed
```

**What gets seeded:**
- 3 demo users (with different roles)
- 12 bank accounts (3 per user)
- 100+ transactions spanning 3 months
- Notifications for each user

**Demo Users:**
- Email: `aviral@example.com` | Password: `password123`
- Email: `priya@example.com` | Password: `password123`
- Email: `admin@finfusion.com` | Password: `password123`

---

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Bcrypt password hashing
- ✅ CORS protection
- ✅ Environment variable protection
- ✅ SQL injection protection (Prisma ORM)
- ✅ Authorization middleware for protected routes

---

## 📱 Frontend Features

### Pages
- **Home** - Landing page with feature showcase
- **Dashboard** - Overview of accounts and quick actions
- **Transactions** - Complete transaction history with filters
- **Insights** - Analytics and spending visualizations
- **Accounts** - Bank account management

### Components
- Responsive Sidebar navigation
- Protected routes with authentication
- Transaction modals for quick actions
- Bank account cards with visual indicators
- Charts and graphs for data visualization

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Aviral Mishra**

---

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
- Database by [Neon](https://neon.tech/)

---

## 📞 Support

For support, email aviral@example.com or create an issue in the repository.

---

**Made with ❤️ by Aviral Mishra**
