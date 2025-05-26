import { Schema, model, Document, Types } from 'mongoose';

export interface IVideo extends Document {
  videoAskForm: Types.ObjectId;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration: number;
  fileSize: number;
  format: string;
  resolution?: string;
  status: 'uploading' | 'processing' | 'ready' | 'failed';
  processingProgress?: number;
  metadata: {
    originalName: string;
    mimeType: string;
    encoding: string;
    dimensions?: {
      width: number;
      height: number;
    };
  };
  privacy: 'public' | 'private' | 'unlisted';
  createdAt: Date;
  updatedAt: Date;
  processedAt?: Date;
}

const VideoSchema = new Schema<IVideo>({
  videoAskForm: { 
    type: Schema.Types.ObjectId, 
    ref: 'VideoAskForm', 
    required: [true, 'VideoAskForm reference is required'],
    index: true
  },
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: { 
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  videoUrl: { 
    type: String, 
    required: [true, 'Video URL is required'],
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Video URL must be valid'
    }
  },
  thumbnailUrl: {
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Thumbnail URL must be valid'
    }
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [0, 'Duration cannot be negative']
  },
  fileSize: {
    type: Number,
    required: [true, 'File size is required'],
    min: [0, 'File size cannot be negative']
  },
  format: {
    type: String,
    required: [true, 'Format is required'],
    trim: true
  },
  resolution: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['uploading', 'processing', 'ready', 'failed'],
    default: 'uploading',
    required: true
  },
  processingProgress: {
    type: Number,
    min: 0,
    max: 100
  },
  metadata: {
    originalName: {
      type: String,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    },
    encoding: {
      type: String,
      required: true
    },
    dimensions: {
      width: Number,
      height: Number
    }
  },
  privacy: {
    type: String,
    enum: ['public', 'private', 'unlisted'],
    default: 'private',
    required: true
  },
  processedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
VideoSchema.index({ videoAskForm: 1, createdAt: -1 });
VideoSchema.index({ status: 1 });
VideoSchema.index({ privacy: 1 });

// Virtual for formatted duration
VideoSchema.virtual('formattedDuration').get(function() {
  const minutes = Math.floor(this.duration / 60);
  const seconds = Math.floor(this.duration % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Virtual for formatted file size
VideoSchema.virtual('formattedFileSize').get(function() {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  let size = this.fileSize;
  let i = 0;
  while (size >= 1024 && i < sizes.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(2)} ${sizes[i]}`;
});

// Middleware to set processedAt when status changes to ready
VideoSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'ready' && !this.processedAt) {
    this.processedAt = new Date();
  }
  next();
});

export const Video = model<IVideo>('Video', VideoSchema);
