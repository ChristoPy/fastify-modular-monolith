import fp from 'fastify-plugin'
import { ModuleOptions } from '../../types'
import routes from './routes'
import core from './core'

export default fp<ModuleOptions>(async (fastify, options) => {
  fastify.decorate('account', core)
  fastify.register(routes, { prefix: '/account' })
})

declare module 'fastify' {
  export interface FastifyInstance {
    account: typeof core
  }
}
