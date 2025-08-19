import express from "express";


const router = express.Router();

import { authMiddleware } from "../middleware/authMiddleware";
import { createApplication, listApplications, updateApplicationStatus } from "../controllers/applicationControllers";

router.post("/", authMiddleware(["tenant"]), createApplication);
router.put("/:id/status", authMiddleware(["manager"]), updateApplicationStatus);
router.get("/", authMiddleware(["manager", "tenant"]), listApplications);

export default router;
