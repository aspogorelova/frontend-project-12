import path from 'path';
import AutoLoad from '@fastify/autoload';
import fastifyStatic from '@fastify/static';

export default async function (fastify, opts) {
  // Регистрация статичных файлов
  fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), 'frontend', 'dist'), // Статические файлы расположены в frontend/dist
  });

  // Обработка ошибок 404 путем отправки index.html
  fastify.setNotFoundHandler((req, reply) => {
    reply.sendFile('index.html'); // Отправляем index.html в случае отсутствия маршрута
  });

  // Загружаем плагины
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'), // Плагины находятся в папке plugins относительно текущего файла
    options: Object.assign({}, opts),
  });

  // Загружаем роуты
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'), // Роуты находятся в папке routes относительно текущего файла
    options: Object.assign({}, opts),
  });
}