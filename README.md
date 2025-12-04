### FinFusion:
A modern full-stack personal finance manager built with React, Node.js, Express, and Prisma. Track spending, manage multiple bank accounts, and visualise financial insights — all in one place.

### Features: 
1) Multi-Bank Account Management

2) Transaction Tracking with filters & sorting

3) Analytics Dashboard (spending, categories, trends)

4) Smart Notifications

5) Secure Auth (JWT + bcrypt)

6) Responsive UI with Tailwind CSS

7) Modern Design using Lucide Icons & Recharts

---
### Tech Stack:

| Category            | Technology                |
| ------------------- | ------------------------- |
| **Frontend**        | React.js, Tailwind CSS    |
| **Backend**         | Node.js, Express.js       |
| **Database**        | Prisma ORM,PostgreSQL(Neon)    |
| **Authentication**  | JWT, bcrypt               |
| **Hosting**         | Render / Neon / Vercel |
| **Version Control** | Git & GitHub              |

### Project Structure:

 FinFusion/
├── client/          # React frontend
│   ├── components/
│   ├── pages/
│   └── services/
└── server/          # Node backend
    ├── prisma/
    ├── controllers/
    ├── routes/
    └── middlewares/

## API Endpoints:
 Auth:

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register user |
| POST   | `/api/auth/login`    | Login user    |

 Bank Accounts:

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | `/api/bank`        | Get user accounts |
| POST   | `/api/bank/create` | Create account    |
| DELETE | `/api/bank/:id`    | Delete account    |

 Transactions:

| Method | Endpoint                   | Description          |
| ------ | -------------------------- | -------------------- |
| GET    | `/api/transactions`        | Get all transactions |
| POST   | `/api/transactions/create` | Create transaction   |

### Backend Architecture Documented:
1) Request Flow Diagram:
   
  Client request → Express server
  Authentication check
  JWT verification
  Route handler
  Controller logic
  Prisma ORM interaction
  PostgreSQL database
  JSON response
  
2) Authentication Flow:
   Detailed explanation of:
     Registration process with bcrypt hashing
     Login with JWT generation
     Protected route authentication
     Token verification middleware
   
4) Transaction Creation Flow:
   Sequence diagram showing:
    Client-server communication
    JWT verification
    Account ownership validation
    Atomic database transaction (create transaction + update balance + create notification)

5) Database Schema:
   Documented all Prisma models:
   User - Authentication and profile
   BankAccount - Multi-account management
   Transaction - Financial records
   Notification - User alerts

 Analytics:

Summary • Category Spending • Monthly Trends • Net Worth

 Scripts:
Server: npm run dev, npm start, npm run seed
Client: npm start, npm run build

 Author:
Aviral Mishra


