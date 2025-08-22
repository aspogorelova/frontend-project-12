import path from 'path';
import AutoLoad from '@fastify/autoload';
import fastifyStatic from '@fastify/static';

export default async function (fastify, opts) {
  fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), 'frontend', 'dist'),
  });

  fastify.setNotFoundHandler((req, reply) => {
    reply.sendFile('index.html');
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  });
}