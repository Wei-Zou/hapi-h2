'use strict';

const Hapi = require("hapi");
const vision = require('vision');
const inert = require('inert');
const fs = require('fs');
const http2 = require('http2');

const { setupTemplates } = require('./templates/setup-templates');

const serverOptions = {
  key: fs.readFileSync('./certs/privateKey.pem'),
  cert: fs.readFileSync('./certs/cert.pem'),
  allowHTTP1: true,
};

const listener = http2.createSecureServer(serverOptions);

const server = Hapi.server({
  listener,
  port: 3001,
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
      return 'world';
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
