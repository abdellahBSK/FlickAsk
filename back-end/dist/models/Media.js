"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const mongoose_1 = require("mongoose");
const mediaSchema = new mongoose_1.Schema({
    url: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(http|https):\/\/[^ "]+$/.test(v);
            },
            message: 'URL must be a valid HTTP/HTTPS URL'
        }
    },
    type: {
        type: String,
        enum: ['video', 'audio', 'image'],
        required: true
    },
    uploadedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    },
    fileSize: {
        type: Number,
        min: 0
    },
    duration: {
        type: Number,
        min: 0
    },
    fileName: {
        type: String,
        required: true,
        trim: true
    },
    mimeType: {
        type: String,
        trim: true
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ['processing', 'ready', 'failed'],
        default: 'processing'
    },
    metadata: {
        width: Number,
        height: Number,
        format: String,
        bitrate: Number,
        thumbnail: String
    },
    altText: {
        type: String,
        trim: true
    }
});
// Indexes
mediaSchema.index({ type: 1, status: 1 });
mediaSchema.index({ createdAt: -1 });
// Methods
mediaSchema.methods.formatFileSize = function () {
    if (!this.fileSize)
        return 'Unknown';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = this.fileSize;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
};
mediaSchema.methods.getDuration = function () {
    if (!this.duration)
        return 'Unknown';
    const minutes = Math.floor(this.duration / 60);
    const seconds = Math.floor(this.duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
// Pre-save middleware to ensure proper status
mediaSchema.pre('save', function (next) {
    if (this.isNew) {
        this.status = 'processing';
    }
    next();
});
// Virtual for getting full media information
mediaSchema.virtual('info').get(function () {
    return {
        type: this.type,
        size: this.formatFileSize(),
        duration: this.type === 'video' || this.type === 'audio'
            ? this.getDuration()
            : null,
        dimensions: this.metadata?.width && this.metadata?.height
            ? `${this.metadata.width}x${this.metadata.height}`
            : null
    };
});
exports.Media = (0, mongoose_1.model)('Media', mediaSchema);
