//from Dr. Foust notes
const http = require('http');
const fs = require('fs');

const config = require('./config.js');
const logger = require('./logger.js');
const app = require('./app/app.js');
const db = require('./db.js');

// Create the server, as a parameter put the app.js
const server = http.createServer(app);

logger.verbose('Project directory = ' + config.projectDir);

//Connect to the db first
db.connect()
    .then(() =>
    {
    // Start the server
    server.listen(config.httpPort, () => {  // called once the server is running
        logger.info(`Server listening on port ${config.httpPort}...`);

    });
})
.catch(err => logger.error(err));

