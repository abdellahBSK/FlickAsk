"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("../config/jwt.config");
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'No or invalid token provided' });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, jwt_config_1.jwtConfig.secret);
        req.userId = decoded.id;
        req.userEmail = decoded.email;
        req.userRole = decoded.role;
        next();
    }
    catch (error) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};
exports.authenticate = authenticate;
