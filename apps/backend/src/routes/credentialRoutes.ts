import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { createCredential, deleteCredential } from "../controller/credentialController.js";
const router : Router = Router();

router.post("/credential/create", authMiddleware, createCredential);
router.delete("/credential/delete", authMiddleware, deleteCredential);

export default router