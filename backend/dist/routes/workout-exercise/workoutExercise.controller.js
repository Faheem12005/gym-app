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
exports.updateWorkoutDayExercises = exports.addWorkoutDayExercises = void 0;
const prisma_1 = __importDefault(require("../../libs/prisma"));
const addWorkoutDayExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { workoutDayId, exercises } = req.body;
        if (!workoutDayId || !Array.isArray(exercises)) {
            return res.status(400).json({ error: 'Invalid request body.' });
        }
        // Step 2: Insert new ones
        const created = yield prisma_1.default.workoutDayExercise.createMany({
            data: exercises.map((ex, index) => {
                var _a, _b, _c, _d, _e;
                return ({
                    dayId: workoutDayId,
                    exerciseId: ex.exercise.id,
                    order: (_a = ex.order) !== null && _a !== void 0 ? _a : index, // fallback to index if not provided
                    sets: (_b = ex.sets) !== null && _b !== void 0 ? _b : 3,
                    reps: (_c = ex.reps) !== null && _c !== void 0 ? _c : 10,
                    weights: (_d = ex.weights) !== null && _d !== void 0 ? _d : 10,
                    restSeconds: (_e = ex.restSeconds) !== null && _e !== void 0 ? _e : 60,
                });
            }),
        });
        return res.status(201).json({ count: created.count });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return res.status(500).json({ error: errorMessage });
    }
});
exports.addWorkoutDayExercises = addWorkoutDayExercises;
const updateWorkoutDayExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { exercises } = req.body;
        if (!Array.isArray(exercises) || exercises.length === 0) {
            return res.status(400).json({ error: 'No exercises provided for update.' });
        }
        // Update each exercise in the array
        const updateResults = yield Promise.all(exercises.map((ex) => __awaiter(void 0, void 0, void 0, function* () {
            return prisma_1.default.workoutDayExercise.update({
                where: { id: ex.id },
                data: {
                    sets: ex.sets,
                    reps: ex.reps,
                    weights: ex.weights,
                    restSeconds: ex.restSeconds,
                    order: ex.order,
                    exerciseId: ex.exercise.id,
                    dayId: ex.dayId,
                },
            });
        })));
        return res.status(200).json({ updated: updateResults });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return res.status(500).json({ error: errorMessage });
    }
});
exports.updateWorkoutDayExercises = updateWorkoutDayExercises;
