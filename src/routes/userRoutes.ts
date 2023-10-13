import express from "express";
import {loginHandler, registerHandler} from "../controllers/user"
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login",  loginHandler)

export default router;