"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Answer = void 0;
const mongoose_1 = require("mongoose");
const Step_1 = require("./Step");
const AnswerSchema = new mongoose_1.Schema({
    step: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Step',
        required: [true, 'Step reference is required'],
        index: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required'],
        index: true
    },
    answerText: {
        type: String,
        trim: true,
        maxlength: [5000, 'Answer text cannot be more than 5000 characters']
    },
    videoUrl: {
        type: String,
        validate: {
            validator: function (v) {
                return !v || /^https?:\/\/.+/.test(v);
            },
            message: 'Video URL must be valid'
        }
    },
    audioUrl: {
        type: String,
        validate: {
            validator: function (v) {
                return !v || /^https?:\/\/.+/.test(v);
            },
            message: 'Audio URL must be valid'
        }
    },
    selectedOptions: [{
            type: String,
            trim: true
        }],
    duration: {
        type: Number,
        min: [0, 'Duration cannot be negative']
    },
    metadata: {
        browser: String,
        platform: String,
        ipAddress: String
    },
    status: {
        type: String,
        enum: ['draft', 'submitted', 'processing', 'failed'],
        default: 'draft',
        required: true
    },
    processingProgress: {
        type: Number,
        min: 0,
        max: 100
    },
    submittedAt: {
        type: Date
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// Compound index for efficient querying
AnswerSchema.index({ step: 1, user: 1, createdAt: -1 });
AnswerSchema.index({ status: 1, createdAt: -1 });
// Middleware to validate answer based on question type
AnswerSchema.pre('save', async function (next) {
    try {
        const step = await (0, mongoose_1.model)('Step').findById(this.step);
        if (!step) {
            return next(new Error('Referenced step not found'));
        }
        switch (step.questionType) {
            case Step_1.QuestionType.TEXT:
                if (!this.answerText) {
                    return next(new Error('Text answer is required for text questions'));
                }
                break;
            case Step_1.QuestionType.VIDEO:
                if (!this.videoUrl) {
                    return next(new Error('Video URL is required for video questions'));
                }
                break;
            case Step_1.QuestionType.AUDIO:
                if (!this.audioUrl) {
                    return next(new Error('Audio URL is required for audio questions'));
                }
                break;
            case Step_1.QuestionType.MULTIPLE_CHOICE:
                if (!this.selectedOptions || this.selectedOptions.length === 0) {
                    return next(new Error('Selected options are required for multiple choice questions'));
                }
                break;
            case Step_1.QuestionType.YES_NO:
                if (!this.answerText || !['yes', 'no'].includes(this.answerText.toLowerCase())) {
                    return next(new Error('Valid yes/no answer is required'));
                }
                break;
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
// Middleware to set submittedAt when status changes to submitted
AnswerSchema.pre('save', function (next) {
    if (this.isModified('status') && this.status === 'submitted' && !this.submittedAt) {
        this.submittedAt = new Date();
    }
    next();
});
exports.Answer = (0, mongoose_1.model)('Answer', AnswerSchema);
