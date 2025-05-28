import { Router, Request, Response, NextFunction } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser
} from '../controllers/auth.controller';

const router = Router();

// POST /api/auth/register
router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  registerUser(req, res).catch(next);
});

// POST /api/auth/login
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  loginUser(req, res).catch(next);
});


router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
  logoutUser(req, res).catch(next);
});


export default router;
