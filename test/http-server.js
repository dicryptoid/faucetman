/*eslint no-console: ["error", { allow: ["log", "error"] }] */
/**
 * @description Simple HTTP server for testing request
 */
const http = require('http');
const port = 4000; 	/** @todo: replace the port number with config value */

// create the basic http server instance with a simple request handler
http.createServer((request, response) => {
	// just log the request details
	console.log(`HTTP Server: ${request.method} Request received for URL: ${request.url}`);
	console.log(`HTTP Server: request headers as follows: ${request.headers}`);
	// and send some dummy response
	response.end('Faucetman http server OK 200!');
	// make http server instance listening on port defined
}).listen(port, (error) => {
	// error during initialization
	if (error) {
		return console.error(`HTTP Server: initialization failed with error ${error}`);
	}
	// initialization succeed 
	console.log(`HTTP Server: initialized and listening on port ${port}`);
});
