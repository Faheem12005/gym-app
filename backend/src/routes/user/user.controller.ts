import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import prisma from '../../../libs/prisma';

export const createUser = async (req: any, res: any) => {
    try {
        const { email, password, heightCm, weightKg } = req.body;
        if (!email || !password || !heightCm || !weightKg) {
            return res.status(400).json({ error: "Missing required fields." });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        // Create user and initial logs
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                heightLogs: {
                    create: [{ heightCm }]
                },
                weightLogs: {
                    create: [{ weightKg }]
                }
            },
            include: {
                heightLogs: true,
                weightLogs: true
            }
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error ? error.message : "Unknown error") });
    }
}

export const loginUser = async (req: any, res: any) => {
    try {
        console.log("Login attempt with body:", req.body);
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Missing email or password." });
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password." });
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash!);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password." });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ user, token });
        console.log("Login successful for user:", user.email);
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: (error instanceof Error ? error.message : "Unknown error") });
    }
}