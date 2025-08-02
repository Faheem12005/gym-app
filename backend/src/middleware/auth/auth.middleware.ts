import jwt from 'jsonwebtoken';

export const requireAuth = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1]; // 'Bearer token'

  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
