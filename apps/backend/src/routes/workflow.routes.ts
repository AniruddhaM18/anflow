import { Router } from "express";
import { createWorkflow, getAllWorkflows, getWorkflow, updateWorkflow, deleteWorkflow } from "../controllers/workflow.controller";
import { authMiddleware } from "../middlewares/auth";

const router: Router = Router();

router.post("/workflow", authMiddleware, createWorkflow);
router.get("/workflow", authMiddleware, getAllWorkflows);
router.get("/workflow/:id", authMiddleware, getWorkflow);
router.put("/workflow/:id", authMiddleware, updateWorkflow);
router.delete("/workflow/:id", authMiddleware, deleteWorkflow);

export default router;