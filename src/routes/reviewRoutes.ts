import express from "express";
import { authenticateJWT, ensureClient } from "../middleware/authMiddleware";
import { getReviewsHandler } from "../controllers/reviews";

const router = express.Router();

router.get("/profile/:id/reviews", authenticateJWT, getReviewsHandler);

// );
// router.post(
//   "/profile/:id/review",
//   authenticateJWT,
//   ensureClient,

// );

export default router;
