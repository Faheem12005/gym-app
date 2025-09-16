import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import prisma from '../../libs/prisma';

export const createUser = async (req: any, res: any) => {
  try {
    const { email, password, heightCm, weightKg } = req.body;
    if (!email || !password || !heightCm || !weightKg) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
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
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (
        error.code === "P2002" &&
        Array.isArray(error.meta?.target) &&
        error.meta.target.includes("email")
      ) {
        return res.status(409).json({ error: "Email already in use." }); // 409 Conflict
      }
    }
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
};

export const loginUser = async (req: any, res: any) => {
    try {
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
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET! );
        res.json({ user, token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: (error instanceof Error ? error.message : "Unknown error") });
    }
}