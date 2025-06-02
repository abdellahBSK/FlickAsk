import { Router, Response, NextFunction, RequestHandler } from 'express'
import {
  createVideoAskForm,
  getVideoAskForms,
  getVideoAskFormById,
  updateVideoAskForm,
  deleteVideoAskForm
} from '../controllers/videoAskForm.controller'
import { upload } from '../middlewares/upload'
import { AuthRequest } from '../types/express';

const router = Router()

// Async wrapper
const asyncHandler = (
  fn: (req: AuthRequest, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req as AuthRequest, res, next)).catch(next)
  }
}

// Apply authentication if needed
// router.use(authenticate);



router.post('/upload', upload, asyncHandler(createVideoAskForm));

router.get('/', asyncHandler(getVideoAskForms));
router.get('/:id', asyncHandler(getVideoAskFormById));
router.patch('/:id', upload, asyncHandler(updateVideoAskForm));
router.delete('/:id', asyncHandler(deleteVideoAskForm));

export default router
