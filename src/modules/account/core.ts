import { FastifyInstance } from "fastify";
import { UserModel } from "./model";
import { GetUserData, IPublicUser, IUser } from "./types";

async function get(fastify: FastifyInstance, { id }: GetUserData) {
  const { wallet } = await fastify.wallet.get(fastify, { owner: id })

  const cached = await fastify.cache.get<IPublicUser>(`user:${id}`)
  if (cached) return {
    account: cached,
    wallet,
  }

  const user = await UserModel.findById(id)
  const publicUser = toPublic(user!.toObject())

  await fastify.cache.set(`user:${id}`, publicUser)

  return {
    account: publicUser,
    wallet,
  }
}

function toPublic(user: IUser) {
  const publicUser: IPublicUser = {
    _id: user._id.toString(),
    email: user.email,
    name: user.name,
  }

  return publicUser
}

export default {
  get,
}
