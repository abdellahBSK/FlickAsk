"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// POST /api/auth/register
router.post('/register', (req, res, next) => {
    (0, auth_controller_1.registerUser)(req, res).catch(next);
});
// POST /api/auth/login
router.post('/login', (req, res, next) => {
    (0, auth_controller_1.loginUser)(req, res).catch(next);
});
router.post('/logout', (req, res, next) => {
    (0, auth_controller_1.logoutUser)(req, res).catch(next);
});
exports.default = router;
