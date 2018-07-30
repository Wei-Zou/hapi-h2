'use strict';

const Hapi = require("hapi");
const fs = require('fs');
const http2 = require('http2');

const serverOptions = {
  key: fs.readFileSync('./certs/privateKey.pem'),
  cert: fs.readFileSync('./certs/cert.pem'),
  allowHTTP1: true,
};

const listener = http2.createSecureServer(serverOptions);

const server = Hapi.server({
  listener,
  port: 3000,
  host: 'localhost',
});

server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, h) => {
    return 'world\n';
  },
});

const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
