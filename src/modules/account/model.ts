import { Schema, model } from 'mongoose';
import { IUser } from './types';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, requried: true },
});

export const UserModel = model<IUser>('User', userSchema);
