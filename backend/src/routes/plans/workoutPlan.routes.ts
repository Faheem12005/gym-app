
import { Router } from "express";
import { requireAuth } from "../../middleware/auth/auth.middleware";
import { createWorkoutPlan, getWorkoutPlan, updateWorkoutPlan, deleteWorkoutPlan, getAllWorkoutPlansForUser } from "./workoutPlan.controller";
const router = Router();

router.use(requireAuth);
router.post("/create", createWorkoutPlan);
router.get("/:id", getWorkoutPlan);
router.get("/", getAllWorkoutPlansForUser);
router.put("/:id", updateWorkoutPlan);
router.delete("/:id", deleteWorkoutPlan);

export default router;

