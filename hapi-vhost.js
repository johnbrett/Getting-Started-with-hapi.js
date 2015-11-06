var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({port: 8000});

server.route({ path: '/test/', method: 'get', handler: function (request, reply) { reply('sample' ) } });
server.route({ path: '/test/', vhost: 'play.dev', method: 'get', handler: function (req, rep) { rep('one') } });
server.route({ path: '/test/', vhost: 'two.example.com', method: 'get', handler: function (req, rep) { rep('two') } });

server.start(function(){ console.log('server started', server.info) });
