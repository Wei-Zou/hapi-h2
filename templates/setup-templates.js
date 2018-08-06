'use strict';

const handlebars = require('handlebars');

module.exports.setupTemplates = (server) => {
  server.views({
    engines: {
      html: {
        module: handlebars,
        compileMode: 'sync',
      },
    },
    path: __dirname,
    compileMode: 'async',
  });
};
