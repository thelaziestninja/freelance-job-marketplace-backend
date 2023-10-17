import express from "express";
import {
  createProfileHandler,
  getAllProfilesHandler,
  getProfileHandler,
  updateProfileHandler,
} from "../controllers/profile";
import {
  authenticateJWT,
  ensureFreelancer,
} from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/profile",
  authenticateJWT,
  ensureFreelancer,
  createProfileHandler
);
router.get("/profiles", authenticateJWT, getAllProfilesHandler);
router.get("/profile", authenticateJWT, ensureFreelancer, getProfileHandler);
router.put("/profile", authenticateJWT, ensureFreelancer, updateProfileHandler);

export default router;
