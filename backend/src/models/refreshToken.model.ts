import { Schema, model, Types } from 'mongoose';
import config from '../config';

interface IRefreshTokenModel {
  token: string;
  user: Types.ObjectId;
}

const refreshTokenSchema = new Schema<IRefreshTokenModel>(
  {
    token: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

refreshTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: config.refreshExp / 1000 });

const RefreshTokenModel = model<IRefreshTokenModel>('RefreshToken', refreshTokenSchema);

export default RefreshTokenModel;
