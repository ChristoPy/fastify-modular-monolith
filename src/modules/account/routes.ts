import core from "./core"
import { FastifyPluginAsyncJsonSchemaToTs } from "@fastify/type-provider-json-schema-to-ts";

const plugin: FastifyPluginAsyncJsonSchemaToTs = async function (fastify) {
  fastify.get(
    "/",
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' }
          },
          required: ['id']
        } as const
      }
    },
    async (request, reply) => {
      return core.get(fastify, { id: request.params.id })
    }
  );
};

export default plugin
