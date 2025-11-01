import { Router } from "express";
import { signupController, signinController, callback } from "../controllers/auth.controller";

const router: Router = Router();

router.post("/signup", signupController);
router.post("/signin", signinController);
router.get("/callback", callback);

export default router;