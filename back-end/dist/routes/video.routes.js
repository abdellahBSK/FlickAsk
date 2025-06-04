"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const videoAskForm_controller_1 = require("../controllers/videoAskForm.controller");
const upload_1 = require("../middlewares/upload");
const router = (0, express_1.Router)();
// Async wrapper
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
// Apply authentication if needed
// router.use(authenticate);
router.post('/upload', upload_1.upload, asyncHandler(videoAskForm_controller_1.createVideoAskForm));
router.get('/', asyncHandler(videoAskForm_controller_1.getVideoAskForms));
router.get('/:id', asyncHandler(videoAskForm_controller_1.getVideoAskFormById));
router.patch('/:id', upload_1.upload, asyncHandler(videoAskForm_controller_1.updateVideoAskForm));
router.delete('/:id', asyncHandler(videoAskForm_controller_1.deleteVideoAskForm));
exports.default = router;
