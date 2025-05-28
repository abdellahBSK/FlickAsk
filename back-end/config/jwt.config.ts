import dotenv from 'dotenv';
dotenv.config();

import { SignOptions } from 'jsonwebtoken';

export interface JWTConfig {
  secret: string;
  expiresIn: SignOptions['expiresIn'];
  refreshSecret: string;
  refreshExpiresIn: SignOptions['expiresIn'];
}

// Helper function to handle expiration values
function getExpiresIn(value: string | undefined, defaultValue: string): SignOptions['expiresIn'] {
  const expiration = value || defaultValue;
  return /^\d+$/.test(expiration) ? parseInt(expiration, 10) : expiration as any;
}

// Create and export the config
export const jwtConfig: JWTConfig = {
  secret: process.env.JWT_SECRET || 'your-256-bit-secret',
  expiresIn: getExpiresIn(process.env.JWT_EXPIRES_IN, '1d'),
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-256-bit-refresh-secret',
  refreshExpiresIn: getExpiresIn(process.env.JWT_REFRESH_EXPIRES_IN, '7d')
};