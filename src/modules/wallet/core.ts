import { FastifyInstance } from "fastify";
import { IPublicWallet, IWallet, AddFundsData, BaseFilter } from "./types";
import { WalletModel } from "./model";

async function get(fastify: FastifyInstance, filter: BaseFilter) {
  const cached = await fastify.cache.get<IPublicWallet>(`wallet:${filter.id}`)
  if (cached) return { wallet: cached }

  const wallet = await WalletModel.findOne({ filter })
  const publicWallet = toPublic(wallet!.toObject())

  await fastify.cache.set(`wallet:${wallet!._id.toString()}`, publicWallet)
  
  return { wallet: publicWallet }
}

async function addFunds(fastify: FastifyInstance, { id, grossAmount, fee }: AddFundsData) {
  const wallet = await WalletModel.findById(id)
  if (!wallet) return { error: true }

  const deductionAmount = Math.floor(grossAmount * fee);
  const remainingAmount = grossAmount - deductionAmount;

  wallet.grossAmount += grossAmount
  wallet.amount += remainingAmount

  await wallet.save()

  const publicWallet = toPublic(wallet.toObject())
  await fastify.cache.set(`wallet:${id}`, publicWallet)

  return { wallet: publicWallet }
}

async function deductFunds(fastify: FastifyInstance, { id, grossAmount, fee }: AddFundsData) {
  const wallet = await WalletModel.findById(id)
  if (!wallet) return { error: true }

  const deductionAmount = Math.floor(grossAmount * fee);
  const remainingAmount = grossAmount - deductionAmount;

  wallet.grossAmount -= grossAmount
  wallet.amount -= remainingAmount

  await wallet.save()

  const publicWallet = toPublic(wallet.toObject())
  await fastify.cache.set(`wallet:${id}`, publicWallet)

  return { wallet: publicWallet }
}

function toPublic(wallet: IWallet) {
  const publicWallet: IPublicWallet = {
    amount: wallet.amount,
    grossAmount: wallet.grossAmount,
  }

  return publicWallet
}

export default {
  get,
  addFunds,
  deductFunds,
}
