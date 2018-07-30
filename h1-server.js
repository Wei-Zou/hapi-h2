'use strict';

const Hapi = require("hapi");
const inert = require('inert');

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

const init = async () => {
  await server.register(inert);

  server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, h) => {
      return 'world/n';
    },
  });

  server.route({
    method: 'GET',
    path: '/tiles/{param*}',
    config: {
      handler: {
        directory: {
          path: './images',
        },
      },
    },
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
