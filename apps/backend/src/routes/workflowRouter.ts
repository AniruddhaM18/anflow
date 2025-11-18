import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { createWorkflow, deleteWorkflow, getAllWorkflows, getWorkflow, updateWorkflow } from "../controller/worflowController.js";

const router: Router = Router();

router.post("/workflow/create", authMiddleware, createWorkflow);
router.get("/workflow/all", authMiddleware, getAllWorkflows);
router.put("/workflow/:id", authMiddleware, updateWorkflow);
router.get("/workflow/:id", authMiddleware, getWorkflow);
router.delete("/workflow/:id", authMiddleware, deleteWorkflow);

export default router