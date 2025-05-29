import { Request } from 'express';
import { Multer } from 'multer';

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
  userRole?: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    session: SessionData;
  }
}


declare global {
  namespace Express {
    interface Request {
      userId?: string;
      file?: Multer.File;
    }
  }
}
