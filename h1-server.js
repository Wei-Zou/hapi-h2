'use strict';

const Hapi = require("hapi");
const vision = require('vision');
const inert = require('inert');

const { setupTemplates } = require('./templates/setup-templates');

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

const init = async () => {
  await server.register(vision);
  await server.register(inert);
  setupTemplates(server);

  server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, h) => {
      return 'world/n';
    },
  });

  server.route({
    method: 'GET',
    path: '/scripts/{file}',
    config: {
      handler: async (request, h) => {
        return h.file(`./public/scripts/${request.params.file}`);
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/images/{file}',
    config: {
      handler: async (request, h) => {
        return h.file(`./public/images/${request.params.file}`);
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/tiles',
    config: {
      handler: async (request, h) => {
        return h.view('index');
      },
    },
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
