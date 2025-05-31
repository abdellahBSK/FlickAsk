"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Helper function to handle expiration values
function getExpiresIn(value, defaultValue) {
    const expiration = value || defaultValue;
    return /^\d+$/.test(expiration) ? parseInt(expiration, 10) : expiration;
}
// Create and export the config
exports.jwtConfig = {
    secret: process.env.JWT_SECRET || 'your-256-bit-secret',
    expiresIn: getExpiresIn(process.env.JWT_EXPIRES_IN, '1d'),
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-256-bit-refresh-secret',
    refreshExpiresIn: getExpiresIn(process.env.JWT_REFRESH_EXPIRES_IN, '7d')
};
