"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoAskForm = void 0;
const mongoose_1 = require("mongoose");
const VideoAskFormSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Owner is required'],
        index: true
    },
    thumbnail: {
        type: String
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft',
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    settings: {
        allowAnonymous: {
            type: Boolean,
            default: false
        },
        requireEmail: {
            type: Boolean,
            default: true
        },
        notifyOnSubmission: {
            type: Boolean,
            default: true
        }
    },
    tags: [{
            type: String,
            trim: true
        }],
    publishedAt: {
        type: Date
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// Virtual populate for steps
VideoAskFormSchema.virtual('steps', {
    ref: 'Step',
    localField: '_id',
    foreignField: 'videoAskForm'
});
// Index for better query performance
VideoAskFormSchema.index({ owner: 1, status: 1, createdAt: -1 });
VideoAskFormSchema.index({ tags: 1 });
// Middleware to set publishedAt when status changes to published
VideoAskFormSchema.pre('save', function (next) {
    if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    next();
});
exports.VideoAskForm = (0, mongoose_1.model)('VideoAskForm', VideoAskFormSchema);
