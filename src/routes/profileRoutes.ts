import express from "express";
import { createProfileHandler } from "../controllers/profile";
import {
  authenticateJWT,
  ensureFreelancer,
} from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/profiles",
  authenticateJWT,
  ensureFreelancer,
  createProfileHandler
);
// router.get("/profiles", authenticateJWT, );
// router.put("/profiles", authenticateJWT, ensureFreelancer,   );
export default router;
