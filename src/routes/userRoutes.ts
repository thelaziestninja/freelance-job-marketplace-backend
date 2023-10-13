import express from "express";
import {registerHandler} from "../controllers/user"

const router = express.Router();

router.post("/register", registerHandler);

export default router;