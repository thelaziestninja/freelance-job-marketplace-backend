import express from "express";
import {
  authenticateJWT,
  ensureClient,
  ensureFreelancer,
} from "../middleware/authMiddleware";
import { applyForJobHandler } from "../controllers/applications";

const router = express.Router();

// router.get("/job/:id/applications", authenticateJWT, ensureClient, );
router.post(
  "/job/:id/apply",
  authenticateJWT,
  ensureFreelancer,
  applyForJobHandler
);

export default router;
