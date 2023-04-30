import { object, string, TypeOf } from 'zod';

export const loginSchema = object({
  body: object({
    login: string().min(5),
    password: string().min(8)
  })
});

export type LoginInput = TypeOf<typeof loginSchema>['body'];
