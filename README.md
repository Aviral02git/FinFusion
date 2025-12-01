### FinFusion:

**FinFusion** is a modern, all-in-one **personal finance management platform** that helps users track expenses, manage investments, and gain AI-powered insights to make smarter financial decisions.  

---




### Features: 

- **Expense Tracking** – Categorise and monitor your spending by day, week, or month.  
- **Investment Overview** – Manage your portfolio, including stocks, mutual funds, and crypto.  
- **AI-Powered Insights** – Get smart recommendations and financial analysis.  
- **Secure Authentication** – Protected routes and data using JWT authentication.  
- **Responsive UI** – Sleek and modern interface for all devices.  


---
### Tech Stack:

| Category            | Technology                |
| ------------------- | ------------------------- |
| **Frontend**        | React.js, Tailwind CSS    |
| **Backend**         | Node.js, Express.js       |
| **Database**        | Prisma ORM + MySQL        |
| **Authentication**  | JWT, bcrypt               |
| **Hosting**         | Render / Railway / Vercel |
| **Version Control** | Git & GitHub              |

## API Endpoints:

🔑 AUTHENTICATION
Register User
POST /api/auth/register
Login User
POST /api/auth/login
🏦 BANK ACCOUNTS:
(Requires Authentication)
Get All Bank Accounts:
GET /api/bank
Create Bank Account:
POST /api/bank/create
Delete Bank Account:
DELETE /api/bank/:id
💸 TRANSACTIONS:
Advanced filters, pagination, sorting
Get All Transactions:
GET /api/transactions
Supported filters:
| Field     | Description                 |
| --------- | --------------------------- |
| accountId | Filter by bank account      |
| type      | CREDIT / DEBIT              |
| category  | FOOD / SHOPPING / etc.      |
| search    | Search description/category |
| sortBy    | timestamp/amount/type   |
| sortOrder | asc / desc                  |
| startDate | ISO date                    |
| endDate   | ISO date                    |
| minAmount | Number                      |
| maxAmount | Number                      |
| page      | Pagination page             |
| limit     | Results per page            |

Create Transaction:
POST /api/transactions/create


