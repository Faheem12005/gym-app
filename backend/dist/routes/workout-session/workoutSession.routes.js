"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth/auth.middleware");
const workoutSession_controller_1 = require("./workoutSession.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.requireAuth);
router.post('/create', workoutSession_controller_1.createWorkoutSession);
router.delete('/:id', workoutSession_controller_1.deleteWorkoutSession);
router.get('/exists', workoutSession_controller_1.checkIfWorkoutSessionExists);
router.get('/:id', workoutSession_controller_1.getWorkoutSessionById);
router.put('/:id', workoutSession_controller_1.updateWorkoutSession); // Reuse create for upsert
exports.default = router;
