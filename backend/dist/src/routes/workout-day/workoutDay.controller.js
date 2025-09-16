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
exports.deleteWorkoutDay = exports.updateWorkoutDay = exports.getWorkoutDay = exports.createWorkoutDay = void 0;
const prisma_1 = __importDefault(require("../../../libs/prisma"));
const createWorkoutDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { planId, dayOfWeek, exercises } = req.body;
        if (!planId || dayOfWeek === undefined || !Array.isArray(exercises)) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }
        const workoutDay = yield prisma_1.default.workoutDay.create({
            data: Object.assign(Object.assign({}, req.body), { exercises: {
                    create: req.body.exercises.map((ex) => (Object.assign(Object.assign({}, ex), { exercise: { connect: { id: ex.id } } })))
                } }),
            include: { exercises: true }
        });
        res.status(201).json(workoutDay);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createWorkoutDay = createWorkoutDay;
const getWorkoutDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const workoutDay = yield prisma_1.default.workoutDay.findUnique({
            where: { id },
            include: {
                exercises: {
                    include: {
                        exercise: true,
                        day: true
                    }
                }
            }
        });
        if (!workoutDay)
            return res.status(404).json({ error: 'Workout day not found.' });
        res.json(workoutDay);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getWorkoutDay = getWorkoutDay;
const updateWorkoutDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { dayOfWeek } = req.body;
        const workoutDay = yield prisma_1.default.workoutDay.update({
            where: { id },
            data: {
                dayOfWeek,
                // For exercises, you may want to handle update logic more granularly
            }
        });
        res.json(workoutDay);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateWorkoutDay = updateWorkoutDay;
const deleteWorkoutDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma_1.default.workoutDay.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteWorkoutDay = deleteWorkoutDay;
