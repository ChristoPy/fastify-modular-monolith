import fp from 'fastify-plugin'
import { ModuleOptions } from '../../types'
import routes from './routes'
import core from './core'

export default fp<ModuleOptions>(async (fastify, options) => {
  fastify.decorate('wallet', core)
  fastify.register(routes, { prefix: '/wallet' })
})

declare module 'fastify' {
  export interface FastifyInstance {
    wallet: typeof core
  }
}
