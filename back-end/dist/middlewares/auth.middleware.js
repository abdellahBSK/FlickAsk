"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'YOUR_SECRET_KEY');
        if (decoded && decoded.id && decoded.role && decoded.email) {
            req.userId = decoded.id;
            req.userRole = decoded.role;
            req.userEmail = decoded.email;
            next();
        }
        else {
            res.status(401).json({ success: false, message: 'Invalid token payload' });
        }
    }
    catch (err) {
        console.error('Authentication error:', err);
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};
exports.authenticate = authenticate;
