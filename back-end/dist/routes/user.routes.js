"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Handler wrapper for async route handlers
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
// Apply authentication middleware to all routes
// router.use(authenticate);
// Protected user routes
router.get('/', auth_middleware_1.authenticate, asyncHandler(user_controller_1.getAllUsers));
router.get('/:id', auth_middleware_1.authenticate, asyncHandler(user_controller_1.getUserById));
router.patch('/:id', auth_middleware_1.authenticate, asyncHandler(user_controller_1.updateUser));
router.delete('/:id', auth_middleware_1.authenticate, asyncHandler(user_controller_1.deleteUser));
exports.default = router;
