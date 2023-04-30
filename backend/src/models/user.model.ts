import { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export enum UserRole {
  user = 'user',
  admin = 'admin'
}

export interface IUser {
  login: string;
  password: string;
  role: UserRole;
}

interface IUserMethods {
  verifyPassword(password: string): Promise<boolean>;
}

type TUserModel = Model<IUser, object, IUserMethods>;

const userSchema = new Schema<IUser, TUserModel, IUserMethods>({
  login: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: UserRole,
    default: UserRole.user
  }
});

userSchema.pre('save', async function onSave(next) {
  if (this.isNew) this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.method('verifyPassword', function verifyPassword(password: string) {
  return bcrypt.compare(password, this.password);
});

const UserModel = model<IUser, TUserModel>('User', userSchema);

export default UserModel;
