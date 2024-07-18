import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./src/config/dbConfig";
import userRoutes from "./src/routes/userRoutes";
import profileRoutes from "./src/routes/profileRoutes";
import jobRoutes from "./src/routes/jobRoutes";
import applicationRoutes from "./src/routes/applicationRoutes";
import reviewRoutes from "./src/routes/reviewRoutes";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

app.use(express.json());

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  cors({
    origin: "http://localhost:5173", // or true to reflect the request origin, as long as it's not '*'
    credentials: true, // allowing the frontend to send cookies or other credentials
  })
);
app.use(helmet()); // Adds some security best practices

// Use routes
app.use("/user", userRoutes);
app.use("/", profileRoutes);
app.use("/", jobRoutes);
app.use("/", applicationRoutes);
app.use("/", reviewRoutes);

// Global error-handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message });
});

// in order not to crash after errors
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Send error to global error handler or logging system
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Send error to global error handler or logging system
});

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app, server };
