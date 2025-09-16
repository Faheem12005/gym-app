"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkoutPlan = exports.updateWorkoutPlan = exports.getWorkoutPlan = exports.getAllWorkoutPlansForUser = exports.createWorkoutPlan = void 0;
const prisma_1 = __importDefault(require("../../../libs/prisma"));
const createWorkoutPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }
        const count = yield prisma_1.default.workoutPlan.count({
            where: { userId }
        });
        const plan = yield prisma_1.default.workoutPlan.create({
            data: {
                userId: userId,
                name: `My Workout Plan ${count + 1}`,
                muscleGroups: [],
            }
        });
        res.status(201).json(plan);
        console.log("Workout plan created successfully:", plan);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ error: errorMessage });
    }
});
exports.createWorkoutPlan = createWorkoutPlan;
const getAllWorkoutPlansForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required.' });
        }
        const plans = yield prisma_1.default.workoutPlan.findMany({
            where: { userId },
            include: {
                workoutDays: {
                    include: { exercises: true }
                }
            }
        });
        return res.json(plans);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllWorkoutPlansForUser = getAllWorkoutPlansForUser;
const getWorkoutPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const plan = yield prisma_1.default.workoutPlan.findUnique({
            where: { id },
            include: {
                workoutDays: {
                    include: { exercises: true }
                }
            }
        });
        if (!plan)
            return res.status(404).json({ error: 'Workout plan not found.' });
        res.json(plan);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getWorkoutPlan = getWorkoutPlan;
const updateWorkoutPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const plan = yield prisma_1.default.workoutPlan.update({
            where: { id },
            data: { name },
        });
        res.json(plan);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateWorkoutPlan = updateWorkoutPlan;
const deleteWorkoutPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Cascade delete workoutDays and their exercises
        yield prisma_1.default.workoutDayExercise.deleteMany({
            where: {
                day: {
                    planId: id
                }
            }
        });
        yield prisma_1.default.workoutDay.deleteMany({ where: { planId: id } });
        yield prisma_1.default.workoutPlan.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteWorkoutPlan = deleteWorkoutPlan;
