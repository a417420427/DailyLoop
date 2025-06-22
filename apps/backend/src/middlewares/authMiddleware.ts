import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: number };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token missing" });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || "your_jwt_secret";
    const payload = jwt.verify(token, secret) as { userId: number };
    req.user = { id: payload.userId };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
