import { ObjectId } from 'mongoose'

export type IWallet = {
  _id: ObjectId
  amount: number
  grossAmount: number
  owner: ObjectId
  createdAt: number
  updatedAt: number
}

export type IPublicWallet = {
  amount: number
  grossAmount: number
}

export type BaseFilter = {
  id?: string
  owner?: string
}

export type AddFundsData = {
  id: string
  amount: number
  grossAmount: number
  fee: number
}
