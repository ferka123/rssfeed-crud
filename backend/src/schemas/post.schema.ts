import { object, string, TypeOf, preprocess, number, enum as zodEnum } from 'zod';

export const getPostsSchema = object({
  query: object({
    page: preprocess((n) => parseInt(string().parse(n), 10), number()),
    limit: preprocess((n) => parseInt(string().parse(n), 10), number()),
    search: string(),
    sortby: zodEnum([
      'title-asc',
      'title-dsc',
      'creator-asc',
      'creator-dsc',
      'date-asc',
      'date-dsc'
    ])
  }).partial()
});

const postSchema = object({
  title: string().min(3, { message: 'Must be 3 or more characters long' }),
  image: string().url({ message: 'Must be an URL' }),
  content: string().min(3, { message: 'Must be 3 or more characters long' }),
  url: string().url({ message: 'Must be an URL' }),
  creator: string().min(3, { message: 'Must be 3 or more characters long' })
});

export const addPostSchema = object({
  body: postSchema
});

export const updatePostSchema = object({
  body: postSchema.partial()
});

export type GetPostsInput = TypeOf<typeof getPostsSchema>['query'];
export type AddPostInput = TypeOf<typeof addPostSchema>['body'];
export type UpdatePostInput = TypeOf<typeof updatePostSchema>['body'];
