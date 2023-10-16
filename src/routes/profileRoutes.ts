import express from "express";
import { createProfileHandler } from "../controllers/profile";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/profiles", authenticateJWT, createProfileHandler);

export default router;
