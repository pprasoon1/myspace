import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    published: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
