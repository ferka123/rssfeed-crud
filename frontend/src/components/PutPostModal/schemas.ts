import { z } from 'zod';

export const updatePostSchema = z.object({
  title: z.string().min(10),
  creator: z.string().min(5),
  content: z.string().min(20),
  url: z.string().url(),
  image: z.instanceof(FileList)
});

export const addPostSchema = updatePostSchema.refine((data) => data.image.length === 1, {
  path: ['image'],
  message: 'Please provide an image'
});

export type PostForm = z.TypeOf<typeof updatePostSchema>;
