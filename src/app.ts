import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/dbConfig";

// Import your routes
import userRoutes from "./routes/userRoutes";
import profileRoutes from "./routes/profileRoutes";
// import jobRoutes from './routes/jobRoutes';
// import applicationRoutes from './routes/applicationRoutes';
// import reviewRoutes from './routes/reviewRoutes';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Adds some security best practices

// Use routes
app.use("/user", userRoutes);
app.use("/", profileRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/applications', applicationRoutes);
// app.use('/api/reviews', reviewRoutes);

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
