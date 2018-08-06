'use strict';

const Hapi = require("hapi");
const vision = require('vision');

const { setupTemplates } = require('./templates/setup-templates');

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

const init = async () => {
  await server.register(vision);
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
