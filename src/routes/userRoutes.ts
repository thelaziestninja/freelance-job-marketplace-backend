import express from "express";
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from "../controllers/user";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/logout", authenticateJWT, logoutHandler);

export default router;
