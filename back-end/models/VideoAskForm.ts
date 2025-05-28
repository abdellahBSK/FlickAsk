import { Schema, model, Document, Types } from 'mongoose';

export interface IVideoAskForm extends Document {
  title: string;
  videoUrl: string;
  description?: string;
  owner: Types.ObjectId;
  thumbnail?: string;
  status: 'draft' | 'published' | 'archived';
  isPublic: boolean;
  settings: {
    allowAnonymous: boolean;
    requireEmail: boolean;
    notifyOnSubmission: boolean;
  };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

const VideoAskFormSchema = new Schema<IVideoAskForm>({
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
    type: Schema.Types.ObjectId, 
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
VideoAskFormSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

export const VideoAskForm = model<IVideoAskForm>('VideoAskForm', VideoAskFormSchema);
