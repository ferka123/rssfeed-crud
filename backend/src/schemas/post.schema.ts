import { object, string, TypeOf, preprocess, array, number, enum as zodEnum } from 'zod';

export const getPostsSchema = object({
  query: object({
    page: preprocess((n) => parseInt(string().parse(n), 10), number()),
    limit: preprocess((n) => parseInt(string().parse(n), 10), number()),
    search: string(),
    order: zodEnum(['asc', 'dsc']),
    sortby: zodEnum(['title', 'creator', 'date'])
  }).partial()
});

export const addUpdatePostSchema = object({
  body: object({
    title: string().min(3, { message: 'Must be 3 or more characters long' }),
    image: string(),
    content: string().min(3, { message: 'Must be 3 or more characters long' }),
    url: string().url({ message: 'Must be an URL' }),
    creator: string().min(3, { message: 'Must be 3 or more characters long' }),
    tags: array(string())
  })
});

export type GetPostsInput = TypeOf<typeof getPostsSchema>['query'];
export type AddUpdatePostInput = TypeOf<typeof addUpdatePostSchema>['body'];
