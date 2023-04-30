import { Schema, model } from 'mongoose';

interface IPost {
  title: string;
  image: string;
  content: string;
  url: string;
  date?: string;
  creator: string;
  tags?: string[];
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  content: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: String, default: new Date().toISOString() },
  tags: {
    type: [String],
    default: []
  }
});

const PostModel = model<IPost>('Post', postSchema);

export default PostModel;
