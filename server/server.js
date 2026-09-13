import "dotenv/config";// Sabse upar env variables load karega
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import ticketRoutes from "./routes/ticketRoutes.js";

const app = express();

import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connect
connectDB();

// Routes
app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.send("Support CRM API is up and running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
