"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step = exports.QuestionType = void 0;
const mongoose_1 = require("mongoose");
var QuestionType;
(function (QuestionType) {
    QuestionType["TEXT"] = "TEXT";
    QuestionType["VIDEO"] = "VIDEO";
    QuestionType["AUDIO"] = "AUDIO";
    QuestionType["MULTIPLE_CHOICE"] = "MULTIPLE_CHOICE";
    QuestionType["YES_NO"] = "YES_NO";
})(QuestionType || (exports.QuestionType = QuestionType = {}));
const StepSchema = new mongoose_1.Schema({
    videoAskForm: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'VideoAskForm',
        required: [true, 'VideoAskForm reference is required'],
        index: true
    },
    order: {
        type: Number,
        required: [true, 'Step order is required'],
        min: [1, 'Order must be greater than 0']
    },
    questionText: {
        type: String,
        required: [true, 'Question text is required'],
        trim: true,
        maxlength: [500, 'Question text cannot be more than 500 characters']
    },
    questionType: {
        type: String,
        enum: Object.values(QuestionType),
        required: [true, 'Question type is required']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    isRequired: {
        type: Boolean,
        default: true
    },
    timeLimit: {
        type: Number,
        min: [0, 'Time limit cannot be negative'],
        max: [3600, 'Time limit cannot be more than 1 hour']
    },
    options: [{
            type: String,
            trim: true,
            maxlength: [200, 'Option text cannot be more than 200 characters']
        }],
    videoPrompt: {
        type: String,
        validate: {
            validator: function (v) {
                return !v || /^https?:\/\/.+/.test(v);
            },
            message: 'Video prompt must be a valid URL'
        }
    },
    settings: {
        maxDuration: {
            type: Number,
            min: [1, 'Max duration must be at least 1 second'],
            max: [600, 'Max duration cannot be more than 10 minutes']
        },
        allowRetry: {
            type: Boolean,
            default: true
        },
        showTimer: {
            type: Boolean,
            default: true
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// Virtual populate for answers
StepSchema.virtual('answers', {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'step'
});
// Middleware to validate options for multiple choice questions
StepSchema.pre('save', function (next) {
    if (this.questionType === QuestionType.MULTIPLE_CHOICE && (!this.options || this.options.length < 2)) {
        next(new Error('Multiple choice questions must have at least 2 options'));
    }
    next();
});
// Index for better query performance
StepSchema.index({ videoAskForm: 1, order: 1 });
exports.Step = (0, mongoose_1.model)('Step', StepSchema);
