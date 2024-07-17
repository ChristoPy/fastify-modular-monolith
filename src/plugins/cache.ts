import fp from 'fastify-plugin'
import fastifyRedis, { FastifyRedisPluginOptions } from '@fastify/redis'

/**
 * This plugin adds a redis client to the fastify instance
 */
export default fp<FastifyRedisPluginOptions>(async (fastify, opts, done) => {
  await fastify.register(fastifyRedis, {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  });

  // Extend fastify.cache to include custom get method
  fastify.decorate('cache', {
    async get<T>(key: string) {
      const result = await fastify.redis.get(`alert-pix:${key}`)
      if (result === null) return null

      return JSON.parse(result) as T
    },
    async set(key: string, value: any, expiry?: number) {
      const args = expiry ? ['EX', expiry] : []
      // @ts-ignore
      return await fastify.redis.set(key, JSON.stringify(value), ...args)
    },
  });

  done()
});

// update fastify namespace to include redis
declare module 'fastify' {
  interface FastifyInstance {
    cache: {
      get<T>(key: string): Promise<T | null>
      set(key: string, value: any, expiry?: number): Promise<"OK" | null>
    }
  }
}
