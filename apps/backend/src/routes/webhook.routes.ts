import { Router } from "express";
import { getWorkflow } from "../controllers/workflow.controller";

const router: Router = Router();

router.get("/webhook/:workflowId", getWorkflow);

export default router;
