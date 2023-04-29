import { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
  login: string;
  password: string;
  role: string;
}

interface IUserMethods {
  verifyPassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, object, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  login: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

userSchema.pre('save', async function onSave(next) {
  if (this.isNew) this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.method('verifyPassword', function verifyPassword(password: string) {
  return bcrypt.compare(password, this.password);
});

const userModel = model<IUser, UserModel>('User', userSchema);

export default userModel;
