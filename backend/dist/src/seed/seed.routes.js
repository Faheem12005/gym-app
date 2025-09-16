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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../../generated/prisma");
const router = (0, express_1.Router)();
const prisma = new prisma_1.PrismaClient();
const seedExercises = [
    { name: 'Bench Press', description: 'Chest exercise', userDefined: false, muscleGroups: { set: [prisma_1.MuscleGroup.CHEST, prisma_1.MuscleGroup.TRICEPS, prisma_1.MuscleGroup.SHOULDERS] } },
    { name: 'Squat', description: 'Leg exercise', userDefined: false, muscleGroups: { set: [prisma_1.MuscleGroup.LEGS, prisma_1.MuscleGroup.GLUTES] } },
    { name: 'Deadlift', description: 'Back exercise', userDefined: false, muscleGroups: { set: [prisma_1.MuscleGroup.BACK, prisma_1.MuscleGroup.LEGS, prisma_1.MuscleGroup.GLUTES] } },
    { name: 'Overhead Press', description: 'Shoulder exercise', userDefined: false, muscleGroups: { set: [prisma_1.MuscleGroup.SHOULDERS, prisma_1.MuscleGroup.TRICEPS] } },
    { name: 'Barbell Row', description: 'Back exercise', userDefined: false, muscleGroups: { set: [prisma_1.MuscleGroup.BACK, prisma_1.MuscleGroup.BICEPS] } },
    { name: 'Pull Up', description: 'Back exercise', userDefined: false, muscleGroups: { set: [prisma_1.MuscleGroup.BACK, prisma_1.MuscleGroup.BICEPS] } },
    { name: 'Bicep Curl', description: 'Arm exercise', userDefined: false, muscleGroups: { set: [prisma_1.MuscleGroup.BICEPS] } },
    { name: 'Tricep Extension', description: 'Arm exercise', userDefined: false, muscleGroups: { set: [prisma_1.MuscleGroup.TRICEPS] } },
    { name: 'Lunge', description: 'Leg exercise', userDefined: false, muscleGroups: { set: [prisma_1.MuscleGroup.LEGS, prisma_1.MuscleGroup.GLUTES] } },
    { name: 'Plank', description: 'Core exercise', userDefined: false, muscleGroups: { set: [prisma_1.MuscleGroup.CORE] } }
];
router.post('/exercises', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.exercise.createMany({ data: seedExercises });
        res.status(201).json({ message: 'Seed exercises inserted.' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
