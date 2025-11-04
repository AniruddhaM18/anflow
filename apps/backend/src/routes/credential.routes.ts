import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { createCredential } from "../controllers/credential.controller";

const router: Router = Router();

router.post("/credential", authMiddleware, createCredential);
router.delete("/credential/:id", authMiddleware, createCredential);

export default router;