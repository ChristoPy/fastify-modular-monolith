import mongoose from 'mongoose';
import fp from 'fastify-plugin'
import { FastifyRedisPluginOptions } from '@fastify/redis'

mongoose.connect(process.env.MONGO_URI as string);
const db = mongoose.connection.useDb(process.env.MONGO_DB as string);

/**
 * This plugin adds a mongoose client
 */
export default fp<FastifyRedisPluginOptions>(async (fastify, opts, done) => {
  db.on('error', () => {
    console.error.bind(console, 'MongoDB connection error')
    process.exit(1)
  });
  db.once('open', () => {});

  done()
});
