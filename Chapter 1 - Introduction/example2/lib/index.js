'use strict';

const Hapi = require('hapi'); 									          // [1]

const server = new Hapi.Server(); 								        // [2]

server.connection({ port: 1337, host: '127.0.0.1' }); 	// [3]

server.route({ 													                // [4]
    method: 'GET', 												              // [4]
    path: '/', 													                // [4]
    handler: (request, reply) => { 							        // [4]
                                                        // [4]
        return reply('Hello World\n'); 						      // [4]
    } 															                    // [4]
}); 														                    		// [4]

server.start((err) => { 						            				// [5]
                                                        // [5]
    console.log(`Server running at ${server.info.uri}`);// [5]
});
