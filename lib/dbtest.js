const db = require('./db.js');
const logger = require('./logger.js');

db.connect()
    .then(async (mongoose) => {
        console.log('Connected to database!');
        //Close Connection
        mongoose.connection.close();
    })
    .catch(console.log);