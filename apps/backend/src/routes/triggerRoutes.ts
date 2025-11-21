import { Router } from "express";
import { createTrigger, getAllTriggers } from "../controller/triggerController.js";

const router : Router = Router();

router.post("/trigger/", createTrigger);
router.get("/trigger/", getAllTriggers);

export default router
