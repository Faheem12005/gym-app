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
exports.getWorkoutSessionsForUser = exports.getAggWorkoutMetricsForUser = void 0;
const prisma_1 = __importDefault(require("../../../libs/prisma"));
const date_fns_1 = require("date-fns");
const getAggWorkoutMetricsForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    console.log("Fetching aggregated metrics for user:", userId);
    try {
        const totalDuration = yield prisma_1.default.workoutSession.aggregate({
            _sum: {
                duration: true,
            },
            where: {
                userId: userId
            }
        });
        const totalVolume = yield prisma_1.default.workoutLog.aggregate({
            _sum: {
                volume: true,
                setsCompleted: true,
            },
            where: {
                userId: userId
            }
        });
        const userMetrics = {
            totalDuration: totalDuration._sum.duration || 0,
            totalVolume: totalVolume._sum.volume || 0,
            totalSets: totalVolume._sum.setsCompleted || 0,
        };
        console.log("Aggregated metrics:", userMetrics);
        res.status(200).json(userMetrics);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return res.status(500).json({ error: errorMessage });
    }
});
exports.getAggWorkoutMetricsForUser = getAggWorkoutMetricsForUser;
const getWorkoutSessionsForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { cursor } = req.query;
        let date;
        if (cursor) {
            // cursor = start of month previously fetched
            date = new Date(cursor);
            // move one month back
            date = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - 1, 1));
        }
        else {
            // initial load → current month
            const now = new Date();
            date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
        }
        const start = (0, date_fns_1.startOfMonth)(date);
        const end = (0, date_fns_1.endOfMonth)(date);
        const sessions = yield prisma_1.default.workoutSession.findMany({
            where: {
                userId: userId,
                endTime: {
                    gte: start,
                    lte: end,
                },
            },
            orderBy: { endTime: "desc" },
            include: {
                logs: {
                    include: {
                        exercise: true
                    }
                }
            }, // optional
        });
        res.json({
            month: `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}`,
            cursor: start.toISOString(), // return start of this month
            sessions,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getWorkoutSessionsForUser = getWorkoutSessionsForUser;
