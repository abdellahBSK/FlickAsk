import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
  userRole?: string;
}

interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: 'No or invalid token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({ success: false, message: 'No or invalid token provided' });
      return;
    }

    // Verify token with secret and cast to your payload interface
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'YOUR_SECRET_KEY') as JwtPayload;

    if (decoded && decoded.id && decoded.role && decoded.email) {
      req.userId = decoded.id;
      req.userRole = decoded.role;
      req.userEmail = decoded.email;
      next();
    } else {
      res.status(401).json({ success: false, message: 'Invalid token payload' });
    }
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};
