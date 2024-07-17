import mongoose, { Schema } from 'mongoose';
import { IWallet } from './types';

const walletSchema = new Schema<IWallet>({
  amount: { type: Number, required: true },
  grossAmount: { type: Number, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Number, required: false, default: Date.now },
  updatedAt: { type: Number, required: false },
});

export const WalletModel = mongoose.model<IWallet>('Wallet', walletSchema);
