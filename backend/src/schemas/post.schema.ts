import { object, string, TypeOf, preprocess, number, enum as zodEnum } from 'zod';

export const getPostsSchema = object({
  query: object({
    page: preprocess((n) => parseInt(string().parse(n), 10), number()),
    limit: preprocess((n) => parseInt(string().parse(n), 10), number()),
    search: string(),
    order: zodEnum(['asc', 'dsc']),
    sortby: zodEnum(['title', 'creator', 'date'])
  }).partial()
});

export type GetPostsInput = TypeOf<typeof getPostsSchema>['query'];
