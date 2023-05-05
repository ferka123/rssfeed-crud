export enum UserRole {
  user = 'user',
  admin = 'admin'
}

export interface GetMeResponse {
  _id: string;
  role: UserRole;
  login: string;
}
