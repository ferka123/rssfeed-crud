import { getModelForClass, prop } from '@typegoose/typegoose';

class Post {
  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  image!: string;

  @prop({ required: true })
  content!: string;

  @prop({ required: true })
  url!: string;

  @prop({ default: () => new Date().toISOString() })
  date: string;

  @prop({ required: true })
  creator!: string;

  @prop({ type: () => [String], default: [] })
  tags: string[];
}

const postModel = getModelForClass(Post);

export default postModel;
