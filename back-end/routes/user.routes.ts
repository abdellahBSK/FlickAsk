import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/user.controller';
// import { authenticate } from '../middlewares/auth.middleware';
import { AuthRequest } from '../types/express';

const router = Router();

// Handler wrapper for async route handlers
const asyncHandler = (
  fn: (req: AuthRequest, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req as AuthRequest, res, next)).catch(next);
  };
};

// Apply authentication middleware to all routes
// router.use(authenticate);

// Protected routes
router.get('/', asyncHandler(getAllUsers));
router.get('/:id', asyncHandler(getUserById));
router.patch('/:id', asyncHandler(updateUser));
router.delete('/:id', asyncHandler(deleteUser));

export default router;
