import express from "express";
import {
  authenticateJWT,
  ensureClient,
  ensureFreelancer,
} from "../middleware/authMiddleware";
import {
  applyForJobHandler,
  getApplicationsForJobHandler,
} from "../controllers/applications";

const router = express.Router();

router.get(
  "/job/:id/applications",
  authenticateJWT,
  ensureClient,
  getApplicationsForJobHandler
);
router.post(
  "/job/:id/apply",
  authenticateJWT,
  ensureFreelancer,
  applyForJobHandler
);

export default router;
