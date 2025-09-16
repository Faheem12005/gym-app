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
exports.deleteWorkoutLog = exports.createWorkoutLog = void 0;
const prisma_1 = __importDefault(require("../../../libs/prisma"));
const zod_1 = require("zod");
const WorkoutLogSchema = zod_1.z.object({
    sessionId: zod_1.z.string(),
    exerciseId: zod_1.z.string(),
    repsPerSet: zod_1.z.array(zod_1.z.number().min(1)),
    weightPerSet: zod_1.z.array(zod_1.z.number().min(0)),
    noSets: zod_1.z.number().min(1),
});
const WorkoutLogSchemaArray = zod_1.z.array(WorkoutLogSchema);
const createWorkoutLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validated = WorkoutLogSchemaArray.parse(req.body);
        const log = yield prisma_1.default.workoutLog.createMany({
            data: validated.map(entry => ({
                userId: req.user.userId,
                exerciseId: entry.exerciseId,
                repsPerSet: entry.repsPerSet,
                weightPerSet: entry.weightPerSet,
                setsCompleted: entry.noSets,
                sessionId: entry.sessionId,
            })),
        });
        res.status(201).json(log);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({ error: error.issues });
        }
        res.status(500).json({ error: error.message });
    }
});
exports.createWorkoutLog = createWorkoutLog;
const deleteWorkoutLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma_1.default.workoutLog.delete({ where: { id } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteWorkoutLog = deleteWorkoutLog;
