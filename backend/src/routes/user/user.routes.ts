import { Router } from "express";
import { createUser, loginUser } from "./user.controller";
import { requireAuth } from "../../middleware/auth/auth.middleware";
const router = Router();

router.post("/create", createUser);
router.post("/login", loginUser);

router.use(requireAuth);
export default router;