import express from "express";
import {
  authenticateJWT,
  ensureClient,
  ensureFreelancer,
} from "../middleware/authMiddleware";

const router = express.Router();

// router.get(
//   "/job/:id/applications",
//   authenticateJWT,

// );
// router.post(
//   "/profile/:id/review",
//   authenticateJWT,
//   ensureClient,

// );

export default router;
