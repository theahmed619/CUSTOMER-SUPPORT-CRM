# 🎫 Customer Support Ticketing CRM System

A full-stack, Customer Support Ticketing CRM built with the MERN stack and styled with Tailwind CSS v4. Engineered for fast ticket triage, operational visibility, and audit-ready agent collaboration.

---

## ⚡ Key Features

- **Automated Ticket Ingestion**: Instant submission with auto-generated human-readable identifiers (`TKT-XXXXX`) defaulting to `Open` status.
- **Dynamic Search & Multi-State Filtering**: Server-driven regex search (Ticket ID, Customer Name, Subject) combined with category tabs (`All`, `Open`, `In Progress`, `Closed`).
- **Server-Side Pagination**: Efficient limit/offset data retrieval (`limit=5`) preventing client-side memory bloat and DOM latency[cite: 8, 9].
- **Internal Audit Notes**: Atomic embedded schema structure to log timestamped agent notes alongside ticket transitions[cite: 8, 9].
- **Sleek Enterprise Interface**: Built with modern Tailwind CSS v4 using Vite integration and Lucide icons[cite: 4, 9].
- **Node.js 22+ Compatibility**: Robust DNS resolver configuration preventing `_mongodb._tcp` SRV lookup timeouts[cite: 2].

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React, Axios[cite: 4, 9]
- **Backend**: Node.js (ES Module Syntax), Express.js, Mongoose[cite: 2]
- **Database**: MongoDB Atlas

---

## 📂 Project Structure

```text
├── client/                     # React + Vite Frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── ticketApi.js    # Centralized Axios API instances
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TicketTable.jsx
│   │   │   ├── CreateTicketModal.jsx
│   │   │   └── TicketDetailModal.jsx
│   │   ├── App.jsx             # Main dashboard hub
│   │   └── index.css           # Tailwind v4 import
│   └── vite.config.js
│
└── server/                     # Express.js Backend
    ├── config/
    │   └── db.js               # MongoDB connection logic
    ├── controllers/
    │   └── ticketController.js # CRUD & business logic
    ├── model/
    │   └── Ticket.js           # Mongoose schema definition
    ├── routes/
    │   └── ticketRoutes.js     # API route mappings
    ├── server.js               # Server entry point & DNS fix
    └── .env                    # Environment variables
