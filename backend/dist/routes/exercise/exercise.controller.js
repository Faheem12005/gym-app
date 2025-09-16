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
exports.getExerciseById = exports.getAllExercises = void 0;
const prisma_1 = __importDefault(require("../../libs/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const exerciseUtils_1 = require("../../utils/exerciseUtils");
const getAllExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const exercises = yield prisma_1.default.exercise.findMany({
            where: {
                OR: [
                    { createdBy: null },
                    { createdById: userId },
                ]
            },
            orderBy: {
                name: 'asc',
            }
        });
        const grouped = (0, exerciseUtils_1.groupByFirstLetter)(exercises);
        res.status(200).json(grouped);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({ error: errorMessage });
    }
});
exports.getAllExercises = getAllExercises;
const getExerciseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Exercise id is required.' });
        }
        const exercise = yield prisma_1.default.exercise.findUnique({
            where: { id },
        });
        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found.' });
        }
        return res.json(exercise);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return res.status(500).json({ error: errorMessage });
    }
});
exports.getExerciseById = getExerciseById;
