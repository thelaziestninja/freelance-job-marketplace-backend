import express from "express";
import { authenticateJWT, ensureClient } from "../middleware/authMiddleware";
import { getReviewsHandler, postReviewHandler } from "../controllers/reviews";

const router = express.Router();

router.get("/profile/:id/reviews", authenticateJWT, getReviewsHandler);

router.post(
  "/profile/:id/review",
  authenticateJWT,
  ensureClient,
  postReviewHandler
);

export default router;
