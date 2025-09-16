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
exports.loginUser = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const library_1 = require("@prisma/client/runtime/library");
const prisma_1 = __importDefault(require("../../libs/prisma"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, password, heightCm, weightKg } = req.body;
        if (!email || !password || !heightCm || !weightKg) {
            return res.status(400).json({ error: "Missing required fields." });
        }
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma_1.default.user.create({
            data: {
                email,
                passwordHash,
                heightLogs: { create: [{ heightCm }] },
                weightLogs: { create: [{ weightKg }] },
            },
            include: {
                heightLogs: true,
                weightLogs: true,
            },
        });
        res.status(201).json(user);
    }
    catch (error) {
        if (error instanceof library_1.PrismaClientKnownRequestError) {
            if (error.code === "P2002" &&
                Array.isArray((_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) &&
                error.meta.target.includes("email")) {
                return res.status(409).json({ error: "Email already in use." }); // 409 Conflict
            }
        }
        res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Missing email or password." });
        }
        const user = yield prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password." });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password." });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET);
        res.json({ user, token });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: (error instanceof Error ? error.message : "Unknown error") });
    }
});
exports.loginUser = loginUser;
