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
exports.updateWorkoutSession = exports.getWorkoutSessionById = exports.checkIfWorkoutSessionExists = exports.deleteWorkoutSession = exports.createWorkoutSession = void 0;
const prisma_1 = __importDefault(require("../../../libs/prisma"));
const zod_1 = require("zod");
const WorkoutSessionSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    workoutDayId: zod_1.z.string(),
    notes: zod_1.z.string().max(500).optional(),
});
const createWorkoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validated = WorkoutSessionSchema.parse(req.body);
        const session = yield prisma_1.default.workoutSession.create({
            data: {
                userId: validated.userId,
                workoutDayId: validated.workoutDayId,
            }
        });
        res.status(201).json(session);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: error.issues });
        }
        res.status(500).json({ error: error.message });
    }
});
exports.createWorkoutSession = createWorkoutSession;
const deleteWorkoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma_1.default.workoutSession.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteWorkoutSession = deleteWorkoutSession;
const checkIfWorkoutSessionExists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, workoutDayId } = req.query;
        if (!userId || !workoutDayId) {
            return res.status(400).json({ error: 'userId and workoutDayId are required.' });
        }
        if (typeof userId !== "string" || typeof workoutDayId !== "string") {
            return res.status(400).json({ error: "userId and workoutDayId must be strings" });
        }
        const session = yield prisma_1.default.workoutSession.findFirst({
            where: {
                userId,
                workoutDayId
            },
            orderBy: { startTime: 'desc' },
        });
        if (session) {
            console.log("Found workout session:", session);
            return res.status(200).json({ exists: true, session });
        }
        else {
            return res.status(200).json({ exists: false });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.checkIfWorkoutSessionExists = checkIfWorkoutSessionExists;
const getWorkoutSessionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Workout session id is required.' });
        }
        const session = yield prisma_1.default.workoutSession.findUnique({
            where: { id },
            include: {
                logs: {
                    include: {
                        exercise: true,
                    }
                }
            }
        });
        if (!session) {
            return res.status(404).json({ error: 'Workout session not found.' });
        }
        res.status(200).json(session);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getWorkoutSessionById = getWorkoutSessionById;
const updateWorkoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Get the existing session so we can read its startTime
        const existing = yield prisma_1.default.workoutSession.findUnique({
            where: { id },
            select: { startTime: true },
        });
        if (!(existing === null || existing === void 0 ? void 0 : existing.startTime)) {
            return res.status(400).json({ error: "Session startTime not found" });
        }
        const endTime = new Date();
        const durationMs = endTime.getTime() - existing.startTime.getTime();
        const durationMinutes = Math.floor(durationMs / 1000 / 60); // store in minutes
        const session = yield prisma_1.default.workoutSession.update({
            where: { id },
            data: {
                endTime,
                duration: durationMinutes,
            },
        });
        res.status(200).json(session);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: error.issues });
        }
        res.status(500).json({ error: error.message });
    }
});
exports.updateWorkoutSession = updateWorkoutSession;
