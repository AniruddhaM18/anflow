import { Router } from "express";
import { createWebhook, deleteWebhook, getWebhook, webhookHandler } from "../controllers/webhook.controller";


const router: Router = Router();
router.post("/webhook/:workflowId", createWebhook);
router.get("/webhook/:id", getWebhook);
router.delete("/webhook/:id", deleteWebhook);

//public route
router.get("/webhook/handler/:id", webhookHandler);

export default router;
