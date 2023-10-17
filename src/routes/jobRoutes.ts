import express from "express";
import { authenticateJWT, ensureClient } from "../middleware/authMiddleware";
import {
  createJobHandler,
  getAllJobsHandler,
  getJobsByClientHandler,
  updateJobHandler,
} from "../controllers/job";

const router = express.Router();

router.get("/jobs", authenticateJWT, getAllJobsHandler);
router.get("/my-jobs", authenticateJWT, ensureClient, getJobsByClientHandler);
router.post("/job", authenticateJWT, ensureClient, createJobHandler);
router.put("/job/:id", authenticateJWT, ensureClient, updateJobHandler);
// router.delete("/job", authenticateJWT, ensureClient, deleteJobHandler);

export default router;